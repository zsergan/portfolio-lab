export type UnitCategory = 'length' | 'weight' | 'temperature' | 'data';

interface UnitConfig {
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

// Each unit converts to/from its category's base unit rather than
// carrying a single multiplicative factor — length/weight are linear
// (toBase: (v) => v * 1000), but temperature isn't (°F needs a scale
// *and* an offset), so a bare "factor" can't represent all three.
const lengthUnits = {
  meter: { label: 'Meters', toBase: (v: number) => v, fromBase: (v: number) => v },
  kilometer: { label: 'Kilometers', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
  mile: { label: 'Miles', toBase: (v: number) => v * 1609.344, fromBase: (v: number) => v / 1609.344 },
  foot: { label: 'Feet', toBase: (v: number) => v * 0.3048, fromBase: (v: number) => v / 0.3048 },
  inch: { label: 'Inches', toBase: (v: number) => v * 0.0254, fromBase: (v: number) => v / 0.0254 },
} satisfies Record<string, UnitConfig>;

const weightUnits = {
  gram: { label: 'Grams', toBase: (v: number) => v, fromBase: (v: number) => v },
  kilogram: { label: 'Kilograms', toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
  pound: { label: 'Pounds', toBase: (v: number) => v * 453.592, fromBase: (v: number) => v / 453.592 },
  ounce: { label: 'Ounces', toBase: (v: number) => v * 28.3495, fromBase: (v: number) => v / 28.3495 },
} satisfies Record<string, UnitConfig>;

const temperatureUnits = {
  celsius: { label: 'Celsius', toBase: (v: number) => v, fromBase: (v: number) => v },
  fahrenheit: {
    label: 'Fahrenheit',
    toBase: (v: number) => ((v - 32) * 5) / 9,
    fromBase: (v: number) => (v * 9) / 5 + 32,
  },
  kelvin: { label: 'Kelvin', toBase: (v: number) => v - 273.15, fromBase: (v: number) => v + 273.15 },
} satisfies Record<string, UnitConfig>;

// Decimal (SI, powers of 1000) and binary (IEC, powers of 1024) units side
// by side on purpose — 1 megabyte isn't 1 mebibyte, and that's the whole
// point of this category existing rather than a single Bytes/KB/MB scale.
const dataUnits = {
  byte: { label: 'Bytes', toBase: (v: number) => v, fromBase: (v: number) => v },
  kilobyte: { label: 'Kilobytes', toBase: (v: number) => v * 1e3, fromBase: (v: number) => v / 1e3 },
  kibibyte: { label: 'Kibibytes', toBase: (v: number) => v * 1024, fromBase: (v: number) => v / 1024 },
  megabyte: { label: 'Megabytes', toBase: (v: number) => v * 1e6, fromBase: (v: number) => v / 1e6 },
  mebibyte: { label: 'Mebibytes', toBase: (v: number) => v * 1024 ** 2, fromBase: (v: number) => v / 1024 ** 2 },
  gigabyte: { label: 'Gigabytes', toBase: (v: number) => v * 1e9, fromBase: (v: number) => v / 1e9 },
  gibibyte: { label: 'Gibibytes', toBase: (v: number) => v * 1024 ** 3, fromBase: (v: number) => v / 1024 ** 3 },
} satisfies Record<string, UnitConfig>;

export const unitsByCategory = {
  length: lengthUnits,
  weight: weightUnits,
  temperature: temperatureUnits,
  data: dataUnits,
} satisfies Record<UnitCategory, Record<string, UnitConfig>>;

// The `C extends UnitCategory ? ... : never` form (rather than a plain
// `keyof (typeof unitsByCategory)[C]`) makes this distribute over C: for
// the union UnitCategory itself, `keyof (A | B)` would otherwise collapse
// to the *intersection* of A and B's keys (never, since no unit name is
// shared across categories) instead of the union of each category's units.
export type Unit<C extends UnitCategory> = C extends UnitCategory ? keyof (typeof unitsByCategory)[C] : never;

type AnyUnit = Unit<UnitCategory>;

// Maps a specific unit literal back to its category, distributing the
// same way — this is what actually lets `convert` reject cross-category
// pairs. A naive `convert<C extends UnitCategory>(value, from: Unit<C>,
// to: Unit<C>)` (the shape the roadmap hint suggests) does NOT do this:
// TypeScript infers C separately for `from` and `to` and unions the
// candidates, so `convert(5, 'meter', 'gram')` type-checks (C gets
// inferred as `'length' | 'weight'`, under which both are valid units) —
// verified empirically while building this. Deriving `to`'s type from
// the *inferred literal type of `from`* instead of a second independent
// inference site is the actual fix.
type CategoryOf<U extends AnyUnit> = {
  [C in UnitCategory]: U extends Unit<C> ? C : never;
}[UnitCategory];

const allUnits: Record<AnyUnit, UnitConfig> = {
  ...lengthUnits,
  ...weightUnits,
  ...temperatureUnits,
  ...dataUnits,
};

// The spread above assumes unit keys are unique across categories — verify
// that holds so a future colliding key (e.g. two categories both adding an
// "ounce") fails loudly at load time instead of one silently overwriting
// the other's toBase/fromBase in allUnits.
const expectedUnitCount =
  Object.keys(lengthUnits).length +
  Object.keys(weightUnits).length +
  Object.keys(temperatureUnits).length +
  Object.keys(dataUnits).length;
if (Object.keys(allUnits).length !== expectedUnitCount) {
  throw new Error('converter.ts: duplicate unit key across categories in allUnits');
}

export function convert<F extends AnyUnit>(value: number, from: F, to: Unit<CategoryOf<F>>): number {
  const base = allUnits[from].toBase(value);
  return allUnits[to].fromBase(base);
}

// `convert`'s CategoryOf<F> constraint only protects call sites that pass
// literal-inferred arguments — it can't help a caller holding two already-
// widened `Unit<UnitCategory>` values (e.g. from independent useState
// calls), since CategoryOf of the full union recombines to the full
// UnitCategory union. ConverterSelection ties from/to to their category at
// the *state* level via a discriminated union, and convertSelection's
// switch narrows all three fields together before calling convert, so the
// protection actually reaches the one real call site instead of only
// holding in isolated, literal-argument unit tests.
export type ConverterSelection = {
  [C in UnitCategory]: { category: C; from: Unit<C>; to: Unit<C> };
}[UnitCategory];

export function convertSelection(selection: ConverterSelection, value: number): number {
  // The four branches look identical — do not collapse them into a single
  // `return convert(value, selection.from, selection.to)` outside the
  // switch. Only the per-case narrowing gives `selection.from`/`.to` a
  // single, matching Unit<C>; outside the switch they widen back to the
  // full union and CategoryOf<F> stops rejecting cross-category pairs.
  switch (selection.category) {
    case 'length':
      return convert(value, selection.from, selection.to);
    case 'weight':
      return convert(value, selection.from, selection.to);
    case 'temperature':
      return convert(value, selection.from, selection.to);
    case 'data':
      return convert(value, selection.from, selection.to);
  }
}

export function getUnitLabels<C extends UnitCategory>(category: C): Record<Unit<C>, string> {
  const units = unitsByCategory[category] as Record<Unit<C>, UnitConfig>;
  const labels = {} as Record<Unit<C>, string>;
  for (const key in units) {
    labels[key as Unit<C>] = units[key as Unit<C>].label;
  }
  return labels;
}

// Precision scales down as the magnitude grows (an 8-decimal length
// conversion is noise once the value's in the thousands), and grouping
// makes a converted byte count actually readable. Non-finite (e.g. from
// an invalid input slipping through) renders as an em dash rather than
// "NaN" or "Infinity".
export function formatConvertedValue(value: number): string {
  if (!Number.isFinite(value)) return '—';

  const abs = Math.abs(value);
  const maximumFractionDigits = abs === 0 ? 0 : abs < 0.001 ? 8 : abs < 1 ? 4 : abs < 1000 ? 3 : 2;

  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value);
}

// Accepts the same input a person would naturally type: surrounding
// whitespace, thousands separated by spaces, and a comma as the decimal
// separator (in addition to a plain dot) — the FROM field is a plain text
// input now, not a browser-validated <input type="number">, so parsing is
// on us.
export function parseAmount(raw: string): number {
  return Number(raw.trim().replace(/\s/g, '').replace(',', '.'));
}
