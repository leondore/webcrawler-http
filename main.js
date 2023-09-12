const { argv, exit } = require('node:process');
const { crawlPage } = require('./crawl.js');

function main() {
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

  crawlPage(baseUrl);
}

main();
