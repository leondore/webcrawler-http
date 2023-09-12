const { JSDOM } = require('jsdom');

async function crawlPage(baseUrl) {
  try {
    const response = await fetch(baseUrl);

    if (response.status > 399) {
      throw new Error(response.status);
    }

    if (!response.headers.get('content-type').includes('text/html')) {
      throw new Error('Content-Type is not text/html');
    }

    const htmlBody = await response.text();
    console.log(htmlBody);
  } catch (e) {
    console.log(`Crawl error: ${e.message}, in ${baseUrl}`);
  }
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
