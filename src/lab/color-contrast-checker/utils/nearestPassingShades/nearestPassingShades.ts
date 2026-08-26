import { getContrastRatio, hexToRgb, toLinear } from '../contrastRatio/contrastRatio';

type Rgb = [number, number, number];
type Oklch = { l: number; c: number; h: number };

export interface NearestPassingShades {
  shades: string[];
  /** false when even the extreme (black or white) can't reach `target` against this background */
  allPass: boolean;
}

// Inverse of contrastRatio's toLinear, so the two round-trip consistently.
const GAMMA_THRESHOLD = 0.03928 / 12.92;

function fromLinear(channel: number): number {
  const c = Math.max(0, Math.min(1, channel));
  return c <= GAMMA_THRESHOLD ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
}

function rgbToHex([r, g, b]: Rgb): string {
  const toHex = (c: number) => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Björn Ottosson's OKLab conversion matrices (also what CSS Color 4 and
// culori use) — linear sRGB -> LMS -> OKLab, then OKLab's a/b to polar C/H.
function rgbToOklch([r, g, b]: Rgb): Oklch {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  const l_ = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m_ = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s_ = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  return { l, c: Math.hypot(a, b2), h: Math.atan2(b2, a) };
}

// The inverse of rgbToOklch, before gamma-encoding — components may still
// fall outside [0, 1] here, which callers use to detect out-of-gamut colors.
function oklchToLinearRgb({ l, c, h }: Oklch): Rgb {
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const lCubed = l_ ** 3;
  const mCubed = m_ ** 3;
  const sCubed = s_ ** 3;

  return [
    4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed,
    -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed,
    -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed,
  ];
}

const GAMUT_EPSILON = 1e-4;

function isInGamut([r, g, b]: Rgb): boolean {
  return (
    r >= -GAMUT_EPSILON &&
    r <= 1 + GAMUT_EPSILON &&
    g >= -GAMUT_EPSILON &&
    g <= 1 + GAMUT_EPSILON &&
    b >= -GAMUT_EPSILON &&
    b <= 1 + GAMUT_EPSILON
  );
}

// Reduces chroma (holding lightness and hue fixed) until the color falls
// back in the sRGB gamut, rather than letting rgbToHex's final per-channel
// clamp do it implicitly — that clamp shifts hue for saturated colors (a
// blue walked toward white can drift ~55° toward cyan), which would defeat
// the whole point of walking in OKLCH to keep hue recognisable. Chroma 0
// (fully desaturated) is always in gamut for any lightness, so the search
// always has a valid upper bound to converge toward.
function oklchToRgb(oklch: Oklch): Rgb {
  let linear = oklchToLinearRgb(oklch);

  if (!isInGamut(linear)) {
    let lo = 0;
    let hi = oklch.c;
    linear = oklchToLinearRgb({ ...oklch, c: 0 });

    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2;
      const candidate = oklchToLinearRgb({ ...oklch, c: mid });
      if (isInGamut(candidate)) {
        linear = candidate;
        lo = mid;
      } else {
        hi = mid;
      }
    }
  }

  const [lr, lg, lb] = linear;
  return [fromLinear(lr) * 255, fromLinear(lg) * 255, fromLinear(lb) * 255];
}

const LIGHTNESS_STEP = 0.005;
const MAX_STEPS = 250;

// Walks the foreground's OKLCH lightness toward whichever extreme (black or
// white) contrasts more with the background, until the pair reaches `target`
// (AAA-normal by default — the strictest of the four WCAG checks, so
// passing it passes all four). Returns that shade plus 4 more evenly spaced
// between it and the extreme, so every shade returned also passes — unless
// even the extreme can't reach `target` (some backgrounds sit at a
// luminance where neither black nor white gets there), in which case
// `allPass` is false and the 5 shades instead spread from the original
// foreground toward the extreme, as the closest attempt available.
export function findNearestPassingShades(foreground: string, background: string, target = 7): NearestPassingShades {
  const direction = getContrastRatio('#000000', background) >= getContrastRatio('#ffffff', background) ? -1 : 1;
  const extreme = direction === -1 ? 0 : 1;

  const { l, c, h } = rgbToOklch(hexToRgb(foreground));

  let nearestL = l;
  let allPass = false;

  for (let step = 0; step <= MAX_STEPS; step++) {
    const candidate = Math.max(0, Math.min(1, l + direction * step * LIGHTNESS_STEP));
    nearestL = candidate;

    const hex = rgbToHex(oklchToRgb({ l: candidate, c, h }));
    if (getContrastRatio(hex, background) >= target) {
      allPass = true;
      break;
    }
    if (candidate === extreme) break;
  }

  const spreadStart = allPass ? nearestL : l;
  const shades = Array.from({ length: 5 }, (_, index) => {
    const shadeL = spreadStart + ((extreme - spreadStart) * index) / 4;
    return rgbToHex(oklchToRgb({ l: shadeL, c, h }));
  });

  return { shades, allPass };
}
