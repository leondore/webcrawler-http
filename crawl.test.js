const { normalizeURL, getURLsFromHTML } = require('./crawl');
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

test('getURLsFromHTML - finds an anchor tag', () => {
  const inputHTML = `
    <html>
      <body>
        <a href="https://blog.leon.ninja/link">link</a>
      </body>
    </html>
  `;
  const inputUrl = 'https://blog.leon.ninja';

  const actual = getURLsFromHTML(inputHTML, inputUrl);
  const expected = ['https://blog.leon.ninja/link'];

  expect(actual).toEqual(expected);
});

test('getURLsFromHTML - converts relative URLs to absolute', () => {
  const inputHTML = `
    <html>
      <body>
        <a href="/link">link</a>
      </body>
    </html>
  `;
  const inputUrl = 'https://blog.leon.ninja';

  const actual = getURLsFromHTML(inputHTML, inputUrl);
  const expected = ['https://blog.leon.ninja/link'];

  expect(actual).toEqual(expected);
});

test('getURLsFromHTML - finds all anchor tags', () => {
  const inputHTML = `
    <html>
      <body>
        <header>
          <a href="/">logo</a>
          <nav>
            <a href="/about">about</a>
            <a href="/contact">contact</a>
          </nav>
        </header>
        <main>
          <article>
            <h1>hello world</h1>
            <p>lorem ipsum</p>
            <a href="/post-1">blog</a>
          </article>
        </main>
        <footer>
          <a href="http://blog.leon.ninja/privacy">privacy</a>
          <a href="blog.leon.ninja/terms">terms</a>
          <a href="http://blog.leon.ninja/">home</a>
        </footer>
      </body>
    </html>
  `;
  const inputUrl = 'https://blog.leon.ninja';

  const actual = getURLsFromHTML(inputHTML, inputUrl);
  const expected = [
    'https://blog.leon.ninja/',
    'https://blog.leon.ninja/about',
    'https://blog.leon.ninja/contact',
    'https://blog.leon.ninja/post-1',
    'http://blog.leon.ninja/privacy',
    'https://blog.leon.ninja/terms',
    'http://blog.leon.ninja/',
  ];

  expect(actual).toEqual(expected);
});

test('getURLsFromHTML - detects invalid URLs', () => {
  const inputHTML = `
    <html>
      <body>
        <a href="invalid">link</a>
      </body>
    </html>
  `;
  const inputUrl = 'https://blog.leon.ninja';

  const actual = getURLsFromHTML(inputHTML, inputUrl);
  const expected = [];

  expect(actual).toEqual(expected);
});
