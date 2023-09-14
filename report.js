function printReport(pages) {
  console.log('report starting...');

  const pagesList = Object.entries(pages).map(([url, count]) => {
    return { count, url };
  });

  pagesList.sort((a, b) => {
    if (a.count === b.count) {
      return 0;
    }

    return a.count < b.count ? 1 : -1;
  });

  for (const page of pagesList) {
    console.log(`Found ${page.count} internal link(s) to ${page.url}`);
  }
}

module.exports = { printReport };
