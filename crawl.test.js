const { normalizeURL } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('normalizeURL - strip protocol', () => {
  const input = 'https://blog.leon.ninja/path';
  const actual = normalizeURL(input);
  const expected = 'blog.leon.ninja/path';

  expect(actual).toEqual(expected);
});

test('normalizeURL - remove trailing slash', () => {
  const input = 'https://blog.leon.ninja/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.leon.ninja/path';

  expect(actual).toEqual(expected);
});

test('normalizeURL - ignore case', () => {
  const input = 'https://Blog.LEON.ninja/path';
  const actual = normalizeURL(input);
  const expected = 'blog.leon.ninja/path';

  expect(actual).toEqual(expected);
});

test('normalizeURL - strip http', () => {
  const input = 'http://blog.leon.ninja/path';
  const actual = normalizeURL(input);
  const expected = 'blog.leon.ninja/path';

  expect(actual).toEqual(expected);
});
