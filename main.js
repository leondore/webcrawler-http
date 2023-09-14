const { argv, exit } = require('node:process');
const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {
  const [, , ...args] = argv;

  if (args.length < 1) {
    console.error('Please provide a URL');
    exit(1);
  }

  if (args.length > 1) {
    console.error(`1 argument expected ${args.length} provided`);
    exit(1);
  }

  const baseUrl = args[0];
  console.log(`Crawler starting at ${baseUrl}...`);

  const pages = await crawlPage(baseUrl, baseUrl, {});
  printReport(pages);
}

main();
