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

console.log(normalizeURL('https://blog.leon.ninja//'));

module.exports = {
  normalizeURL,
};
