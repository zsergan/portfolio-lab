export type UnitCategory = 'length' | 'weight' | 'temperature';

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

export const unitsByCategory = {
  length: lengthUnits,
  weight: weightUnits,
  temperature: temperatureUnits,
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
};

// The spread above assumes unit keys are unique across categories — verify
// that holds so a future colliding key (e.g. two categories both adding an
// "ounce") fails loudly at load time instead of one silently overwriting
// the other's toBase/fromBase in allUnits.
const expectedUnitCount =
  Object.keys(lengthUnits).length + Object.keys(weightUnits).length + Object.keys(temperatureUnits).length;
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
  // The three branches look identical — do not collapse them into a single
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
  }
}

// Mirrors convertSelection with `from`/`to` swapped, for the Unit Converter
// tool's editable "Converted" field: typing a value there needs to derive
// the Amount field by converting back from `to` to `from`. Same per-case
// narrowing requirement as convertSelection above.
export function convertSelectionReverse(selection: ConverterSelection, value: number): number {
  switch (selection.category) {
    case 'length':
      return convert(value, selection.to, selection.from);
    case 'weight':
      return convert(value, selection.to, selection.from);
    case 'temperature':
      return convert(value, selection.to, selection.from);
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
