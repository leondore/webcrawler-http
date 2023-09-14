const { JSDOM } = require('jsdom');

function isSameDomain(baseUrl, currentUrl) {
  try {
    const baseUrlObj = new URL(baseUrl);
    const urlObj = new URL(currentUrl);

    if (baseUrlObj.host !== urlObj.host) {
      return false;
    }

    return true;
  } catch (e) {
    return true;
  }
}

async function crawlPage(baseUrl, currentUrl, pages) {
  if (!isSameDomain(baseUrl, currentUrl)) {
    return pages;
  }

  const url = normalizeURL(currentUrl);

  if (pages[url] > 0) {
    pages[url]++;
    return pages;
  }

  pages[url] = url === baseUrl ? 0 : 1;

  console.log(`actively crawling: ${url}`);

  try {
    const response = await fetch(`https://${url}`);

    if (response.status > 399) {
      throw new Error(response.status);
    }

    if (!response.headers.get('content-type').includes('text/html')) {
      throw new Error('Content-Type is not text/html');
    }

    const htmlBody = await response.text();

    const pagesList = getURLsFromHTML(htmlBody, baseUrl);
    while (pagesList.length) {
      pages = await crawlPage(baseUrl, pagesList.shift(), pages);
    }
  } catch (e) {
    console.log(`Crawl error: ${e.message}, in ${baseUrl}`);
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const baseUrlObj = new URL(baseURL);

  const anchorList = dom.window.document.querySelectorAll('a');
  for (let anchor of anchorList) {
    let url = anchor.href;

    if (url.startsWith('/')) {
      url = `${baseURL}${url}`;
    }

    if (!url.startsWith('http') && !url.startsWith('https')) {
      if (url.includes(baseUrlObj.host)) {
        url = `${baseUrlObj.protocol}//${url}`;
      }
    }

    try {
      const urlObj = new URL(url);
      urls.push(urlObj.href);
    } catch (e) {
      console.error(`Invalid URL: ${url}`);
    }
  }

  return urls;
}

function normalizeURL(urlString) {
  try {
    const urlObj = new URL(urlString);

    let path = urlObj.pathname;
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    const url = `${urlObj.host}${path}`;
    return url;
  } catch (e) {
    return 'Please enter a valid URL';
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
