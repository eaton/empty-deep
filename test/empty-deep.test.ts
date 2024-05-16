import { emptyDeep } from '../src/index.js';
import test from 'ava';

const emptyValues = {
  undefined: undefined,
  null: null,
  string: '',
  array: [],
  whitespace: ' \t\n ',
  object: {},
  set: new Set<string>(),
  map: new Map<string, string>(),
  buffer: Buffer.from(''),
}

test('simple values', t => {
  t.deepEqual(emptyDeep(emptyValues, { all: true }), undefined);
})

test('array filtering', t => {
  const input = ['a', 'b', ''];
  const expected = ['a', 'b'];
  t.deepEqual(emptyDeep(input, { all: true }), expected);
});

test('nested array filtering', t => {
  const input = [1, 2, ['a', 'b', ''], [], {}];
  const expected = [1, 2, ['a', 'b']];
  t.deepEqual(emptyDeep(input, { all: true }), expected);
});

test('set filtering', t => {
  const input = new Set(['first', '']);
  const expected = new Set(['first']);
  t.deepEqual(emptyDeep(input, { all: true }), expected);
});

test('map filtering', t => {
  const input = new Map([[1, 'one'], [2, '']]);
  const expected = new Map([[1, 'one']])
  t.deepEqual(emptyDeep(input, { all: true }), expected);
});

test('undefined object values', t => {
  const input = { key: undefined };
  const expected = undefined;
  t.deepEqual(emptyDeep(input, { all: true }), expected);
});


test('nested objects', t => {
  const input = {
    fullNumber: 1,
    fullArray: [1, 2, []],
    fullSet: new Set(['first', '']),
    fullMap: new Map([[1, 'one'], [2, '']]),
    nested: emptyValues,
    ...emptyValues
  };
  
  const expected = {
    fullArray: [1, 2],
    fullNumber: 1,
    fullSet: new Set(['first']),
    fullMap: new Map([[1, 'one']])
  };

  t.deepEqual(emptyDeep(input, { all: true }), expected);
});
