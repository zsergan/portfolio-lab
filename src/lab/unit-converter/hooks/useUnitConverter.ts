import { useState } from 'react';

import { convertSelection, formatConvertedValue, getUnitLabels, parseAmount } from '../utils/converter/converter';
import type { ConverterSelection, Unit, UnitCategory } from '../utils/converter/converter';

// Each entry's from/to is typed against its own category's Unit<C>
// (rather than a single Record<UnitCategory, ...> keyed generically), so
// a cross-category typo here — e.g. temperature defaulting to 'gram' — is
// a compile error instead of a silent mismatch.
const DEFAULTS: {
  length: { value: string; from: Unit<'length'>; to: Unit<'length'> };
  weight: { value: string; from: Unit<'weight'>; to: Unit<'weight'> };
  temperature: { value: string; from: Unit<'temperature'>; to: Unit<'temperature'> };
  data: { value: string; from: Unit<'data'>; to: Unit<'data'> };
} = {
  length: { value: '1000', from: 'meter', to: 'kilometer' },
  weight: { value: '1', from: 'kilogram', to: 'pound' },
  temperature: { value: '0', from: 'celsius', to: 'fahrenheit' },
  data: { value: '1', from: 'megabyte', to: 'mebibyte' },
};

interface UseUnitConverterResult {
  category: UnitCategory;
  from: Unit<UnitCategory>;
  to: Unit<UnitCategory>;
  unitOptions: { value: Unit<UnitCategory>; label: string }[];
  value: string;
  result: string;
  error: string | null;
  setCategory: (next: UnitCategory) => void;
  setValue: (next: string) => void;
  setFrom: (next: Unit<UnitCategory>) => void;
  setTo: (next: Unit<UnitCategory>) => void;
  swap: () => void;
  reset: () => void;
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

  // The FROM field is a plain text input (not a browser-validated
  // <input type="number">), so both emptiness and garbage text ("abc")
  // have to be checked here rather than relying on .value sanitization.
  const parsed = parseAmount(value);
  const isValid = value.trim() !== '' && Number.isFinite(parsed);

  const result = isValid ? formatConvertedValue(convertSelection(selection, parsed)) : '—';
  const error = isValid ? null : 'Enter a number to convert.';

  function setCategory(next: UnitCategory) {
    switch (next) {
      case 'length':
        setSelection({ category: 'length', from: DEFAULTS.length.from, to: DEFAULTS.length.to });
        setValue(DEFAULTS.length.value);
        break;
      case 'weight':
        setSelection({ category: 'weight', from: DEFAULTS.weight.from, to: DEFAULTS.weight.to });
        setValue(DEFAULTS.weight.value);
        break;
      case 'temperature':
        setSelection({ category: 'temperature', from: DEFAULTS.temperature.from, to: DEFAULTS.temperature.to });
        setValue(DEFAULTS.temperature.value);
        break;
      case 'data':
        setSelection({ category: 'data', from: DEFAULTS.data.from, to: DEFAULTS.data.to });
        setValue(DEFAULTS.data.value);
        break;
    }
  }

  function setFrom(next: Unit<UnitCategory>) {
    setSelection({ ...selection, from: next } as ConverterSelection);
  }

  function setTo(next: Unit<UnitCategory>) {
    setSelection({ ...selection, to: next } as ConverterSelection);
  }

  // Swaps only From/To — the Converted value is always derived, so there's
  // nothing to carry over the way the old Amount/Converted swap had to.
  function swap() {
    setSelection({ ...selection, from: selection.to, to: selection.from } as ConverterSelection);
  }

  function reset() {
    setCategory(selection.category);
  }

  return {
    category: selection.category,
    from: selection.from,
    to: selection.to,
    unitOptions,
    value,
    result,
    error,
    setCategory,
    setValue,
    setFrom,
    setTo,
    swap,
    reset,
  };
}
