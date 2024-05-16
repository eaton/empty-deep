# EmptyDeep

Removes empty values from arrays and deeply nested objects, with configurable "emptiness" criteria. Completely empty input values (`[]`, `''`, etc.) are returned as `undefined`.

## Installation

`npm install -s empty-deep`

## Usage

```ts
import { emptyDeep } from 'empty-deep';

console.log(emptyDeep({}));                 // undefined
console.log(emptyDeep({ key: undefined })); // undefined
console.log(emptyDeep(null));               // undefined
console.log(emptyDeep([1, 2, []]));         // [1, 2]

const myObject = {
  title: null,
  subject: '',
  body: 'Todat at lunch...',
  meta: {
    tags: ['tag1', 'tag2', ''],
  },
  authors: [{}]
}

console.log(emptyDeep(myObject));

/**
 * output:
 * 
 * {
 *   body: 'Today at lunch...',
 *   meta: ['tag1', 'tag2']
 * }
 */
```
