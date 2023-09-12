const { argv } = require('node:process');

function main() {
  const [execPath, filePath, ...args] = argv;

  if (args.length < 1) {
    console.error('Please provide a URL');
    process.exit(1);
  }

  if (args.length > 1) {
    console.error(`1 argument expected ${args.length} provided`);
    process.exit(1);
  }

  const baseUrl = args[0];
  console.log(`Crawler starting at ${baseUrl}...`);
}

main();
