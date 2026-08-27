export interface JsonStats {
  keyCount: number;
  depth: number;
}

// Iterative, not recursive — JSON.parse happily accepts arrays/objects
// nested tens of thousands of levels deep, but a recursive walk of the
// same structure blows V8's call stack around ~1-3k levels, which would
// turn perfectly valid (if pathological) JSON into a false "invalid JSON"
// once the RangeError got caught by the parse try/catch. An explicit
// stack lives on the heap instead, so depth is limited by memory, not by
// call-stack frames.
//
// Arrays and objects both add a level of depth, but only object entries
// count as "keys" — an array's indices aren't keys, so a long flat array
// of primitives has plenty of elements but contributes nothing to keyCount.
export function computeJsonStats(root: unknown): JsonStats {
  let keyCount = 0;
  let depth = 0;

  const stack: { value: unknown; depth: number }[] = [{ value: root, depth: 0 }];

  while (stack.length > 0) {
    const { value, depth: currentDepth } = stack.pop()!;

    if (Array.isArray(value)) {
      const childDepth = currentDepth + 1;
      depth = Math.max(depth, childDepth);
      for (const item of value) stack.push({ value: item, depth: childDepth });
      continue;
    }

    if (value !== null && typeof value === 'object') {
      const childDepth = currentDepth + 1;
      depth = Math.max(depth, childDepth);
      const entries = Object.entries(value as Record<string, unknown>);
      keyCount += entries.length;
      for (const [, entryValue] of entries) stack.push({ value: entryValue, depth: childDepth });
    }
  }

  return { keyCount, depth };
}
