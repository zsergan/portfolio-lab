import { useState } from 'react';

import { convertSelection, convertSelectionReverse, getUnitLabels } from '../converter';
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

// Which of the two number fields the user is actively typing into. Its raw
// text is kept verbatim (so e.g. "1." isn't reformatted away mid-keystroke);
// the other field's text is always derived fresh from it via
// convertSelection/convertSelectionReverse.
type Driver = 'amount' | 'result';

interface UseUnitConverterResult {
  category: UnitCategory;
  from: Unit<UnitCategory>;
  to: Unit<UnitCategory>;
  unitOptions: { value: Unit<UnitCategory>; label: string }[];
  amount: string;
  result: string;
  amountError: string | null;
  resultError: string | null;
  setCategory: (next: UnitCategory) => void;
  setAmount: (next: string) => void;
  setResult: (next: string) => void;
  setFrom: (next: Unit<UnitCategory>) => void;
  setTo: (next: Unit<UnitCategory>) => void;
  swap: () => void;
}

function formatNumber(value: number): string {
  return String(Math.round(value * 10000) / 10000);
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
  const [driver, setDriver] = useState<Driver>('amount');
  const [amountRaw, setAmountRaw] = useState(DEFAULTS.length.value);
  const [resultRaw, setResultRaw] = useState('');

  const unitLabels = getUnitLabels(selection.category);
  const unitOptions = Object.entries(unitLabels).map(([unit, label]) => ({ value: unit, label })) as {
    value: Unit<UnitCategory>;
    label: string;
  }[];

  // A native <input type="number">'s .value is sanitized by the browser to
  // always be either "" or a valid floating-point number string, so
  // Number(driverRaw) can never be NaN here — only emptiness needs checking
  // (verified empirically: neither typing nor programmatically setting a
  // non-numeric string ever leaves a non-empty, non-numeric .value). This
  // holds for whichever field is currently the driver, since both Amount
  // and Converted are the same kind of number input.
  const driverRaw = driver === 'amount' ? amountRaw : resultRaw;
  const isValidNumber = driverRaw.trim() !== '';
  const numericValue = Number(driverRaw);

  const amount =
    driver === 'amount'
      ? amountRaw
      : isValidNumber
        ? formatNumber(convertSelectionReverse(selection, numericValue))
        : '';
  const result =
    driver === 'result' ? resultRaw : isValidNumber ? formatNumber(convertSelection(selection, numericValue)) : '';

  const amountError = driver === 'amount' && !isValidNumber ? 'Enter a number to convert.' : null;
  const resultError = driver === 'result' && !isValidNumber ? 'Enter a number to convert.' : null;

  function setCategory(next: UnitCategory) {
    switch (next) {
      case 'length':
        setSelection({ category: 'length', from: DEFAULTS.length.from, to: DEFAULTS.length.to });
        setAmountRaw(DEFAULTS.length.value);
        break;
      case 'weight':
        setSelection({ category: 'weight', from: DEFAULTS.weight.from, to: DEFAULTS.weight.to });
        setAmountRaw(DEFAULTS.weight.value);
        break;
      case 'temperature':
        setSelection({ category: 'temperature', from: DEFAULTS.temperature.from, to: DEFAULTS.temperature.to });
        setAmountRaw(DEFAULTS.temperature.value);
        break;
    }
    setDriver('amount');
  }

  function setAmount(next: string) {
    setDriver('amount');
    setAmountRaw(next);
  }

  function setResult(next: string) {
    setDriver('result');
    setResultRaw(next);
  }

  function setFrom(next: Unit<UnitCategory>) {
    setSelection({ ...selection, from: next } as ConverterSelection);
  }

  function setTo(next: Unit<UnitCategory>) {
    setSelection({ ...selection, to: next } as ConverterSelection);
  }

  // Swaps From/To *and* the two currently displayed values together: the
  // old Converted value becomes the new Amount verbatim (no recomputation
  // needed — flipping both the units and which number sits in which slot
  // is its own inverse), and the new Converted value falls out of the
  // normal amount-drives-result derivation above.
  function swap() {
    setSelection({ ...selection, from: selection.to, to: selection.from } as ConverterSelection);
    setAmountRaw(result);
    setDriver('amount');
  }

  return {
    category: selection.category,
    from: selection.from,
    to: selection.to,
    unitOptions,
    amount,
    result,
    amountError,
    resultError,
    setCategory,
    setAmount,
    setResult,
    setFrom,
    setTo,
    swap,
  };
}
