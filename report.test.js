const { formatSortPages } = require('./report');
const { test, expect } = require('@jest/globals');

test('formatSortPages - sort multiple pages', () => {
  const input = {
    'blog.leon.ninja/path': 4,
    'blog.leon.ninja': 6,
    'blog.leon.ninja/blog-1': 1,
    'blog.leon.ninja/blog-3': 7,
    'blog.leon.ninja/blog-2': 3,
  };
  const actual = formatSortPages(input);
  const expected = [
    { count: 7, url: 'blog.leon.ninja/blog-3' },
    { count: 6, url: 'blog.leon.ninja' },
    { count: 4, url: 'blog.leon.ninja/path' },
    { count: 3, url: 'blog.leon.ninja/blog-2' },
    { count: 1, url: 'blog.leon.ninja/blog-1' },
  ];

  expect(actual).toEqual(expected);
});
