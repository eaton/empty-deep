import type { EmptyOptions } from "emptier";
import { isEmpty } from "emptier";
import { traverse } from 'object-traversal';
export type { EmptyOptions } from 'emptier';

/**
 * Recursively walks an object's properties or an array's elements, removing any
 * that fit the supplied emptiness criteria.
 */
export function emptyDeep<T>(input: unknown, options?: EmptyOptions): Partial<T> | undefined {
  if (isEmpty(input, options)) {
    return undefined;
  }

  if (Array.isArray(input)) {
    return emptyShallow(input.map(i => emptyDeep(i, options)), options)?.filter(i => !isEmpty(i, options)) as T | undefined;
  } else if (input instanceof Set) {
    return emptyShallow(new Set([...input].filter(v => emptyDeep(v, options))), options) as T | undefined;
  } else if (input instanceof Map) {
    return emptyShallow(new Map([...input].filter(e => emptyDeep(e[1], options))), options) as T | undefined;
  } else if (typeof input === 'object' && input !== null) {
    traverse(input, (context) => {
      if (context.parent === null || context.key === null) return;
      const val = emptyDeep(context.value, options);
      if (isEmpty(val, options)) {
        delete context.parent[context.key];
      } else {
        context.parent[context.key] = val;
      }
    });
  }

  return emptyShallow(input, options) as T | undefined;
}

/**
 * Returns `undefined` if the input matches the supplied emptinees criteria,
 * or an unmodified copy of the input if it does not.
 */
function emptyShallow<T>(input: T, options: EmptyOptions = {}): T | undefined {
  return isEmpty(input, options) ? undefined : input;
}
