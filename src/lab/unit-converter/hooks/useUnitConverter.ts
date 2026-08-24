import { useState } from 'react';

import { convertSelection, getUnitLabels } from '../converter';
import type { ConverterSelection, Unit, UnitCategory } from '../converter';

// Each entry's from/to is typed against its own category's Unit<C>
// (rather than a single Record<UnitCategory, ...> keyed generically), so
// a cross-category typo here — e.g. temperature defaulting to 'gram' — is
// a compile error instead of a silent mismatch.
const DEFAULTS: {
  length: { value: string; from: Unit<'length'>; to: Unit<'length'> };
  weight: { value: string; from: Unit<'weight'>; to: Unit<'weight'> };
  temperature: { value: string; from: Unit<'temperature'>; to: Unit<'temperature'> };
} = {
  length: { value: '1000', from: 'meter', to: 'kilometer' },
  weight: { value: '1', from: 'kilogram', to: 'pound' },
  temperature: { value: '0', from: 'celsius', to: 'fahrenheit' },
};

interface ConversionResult {
  value: number;
  label: string;
}

interface UseUnitConverterResult {
  category: UnitCategory;
  value: string;
  from: Unit<UnitCategory>;
  to: Unit<UnitCategory>;
  unitOptions: { value: Unit<UnitCategory>; label: string }[];
  // A single nullable object (rather than a separate `result: number | null`
  // plus `resultLabel: string`) so the two are never out of sync by
  // construction — narrowing `result` away from null also gives access to
  // its label, instead of relying on a second, independently-typed flag.
  result: ConversionResult | null;
  setCategory: (next: UnitCategory) => void;
  setValue: (next: string) => void;
  setFrom: (next: Unit<UnitCategory>) => void;
  setTo: (next: Unit<UnitCategory>) => void;
  swap: () => void;
}

// Unlike useJsonFormat (a pure derivation: the page owns `input`, the hook
// only useMemo's a transform of it), this hook owns its state directly —
// closer to useCopyToClipboard's shape. category/from/to have a
// correlation invariant (see ConverterSelection in converter.ts) that has
// to live somewhere; keeping it here, rather than in the page, is the
// whole point of the extraction — pushing it back out to page-owned
// useState calls would just relocate the discriminated-union/switch/cast
// machinery into UnitConverterPage.tsx instead of hiding it.
export function useUnitConverter(): UseUnitConverterResult {
  // A single discriminated-union state (rather than separate category/
  // from/to useState calls) so TypeScript narrows from/to together with
  // category — three independent hooks can't express that correlation, no
  // matter how convert() itself is typed. See convertSelection in
  // converter.ts.
  const [selection, setSelection] = useState<ConverterSelection>({
    category: 'length',
    from: DEFAULTS.length.from,
    to: DEFAULTS.length.to,
  });
  const [value, setValue] = useState(DEFAULTS.length.value);

  const unitLabels = getUnitLabels(selection.category);
  const unitOptions = Object.entries(unitLabels).map(([unit, label]) => ({ value: unit, label })) as {
    value: Unit<UnitCategory>;
    label: string;
  }[];

  // A native <input type="number">'s .value is sanitized by the browser to
  // always be either "" or a valid floating-point number string, so
  // Number(value) can never be NaN here — only emptiness needs checking
  // (verified empirically: neither typing nor programmatically setting a
  // non-numeric string ever leaves a non-empty, non-numeric .value).
  const numericValue = Number(value);
  const isValidNumber = value.trim() !== '';
  const result: ConversionResult | null = isValidNumber
    ? { value: Math.round(convertSelection(selection, numericValue) * 10000) / 10000, label: unitLabels[selection.to] }
    : null;

  function setCategory(next: UnitCategory) {
    switch (next) {
      case 'length':
        setSelection({ category: 'length', from: DEFAULTS.length.from, to: DEFAULTS.length.to });
        setValue(DEFAULTS.length.value);
        return;
      case 'weight':
        setSelection({ category: 'weight', from: DEFAULTS.weight.from, to: DEFAULTS.weight.to });
        setValue(DEFAULTS.weight.value);
        return;
      case 'temperature':
        setSelection({ category: 'temperature', from: DEFAULTS.temperature.from, to: DEFAULTS.temperature.to });
        setValue(DEFAULTS.temperature.value);
        return;
    }
  }

  function setFrom(next: Unit<UnitCategory>) {
    setSelection({ ...selection, from: next } as ConverterSelection);
  }

  function setTo(next: Unit<UnitCategory>) {
    setSelection({ ...selection, to: next } as ConverterSelection);
  }

  function swap() {
    setSelection({ ...selection, from: selection.to, to: selection.from } as ConverterSelection);
  }

  return {
    category: selection.category,
    value,
    from: selection.from,
    to: selection.to,
    unitOptions,
    result,
    setCategory,
    setValue,
    setFrom,
    setTo,
    swap,
  };
}
