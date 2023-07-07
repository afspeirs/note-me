import fs from 'fs';

fs.readFile('./dist/manifest.webmanifest', 'utf8', (err, data) => {
  const webmanifest = JSON.parse(data);
  const branchName = process.env.HEAD;

  if (branchName && branchName !== 'main') {
    webmanifest.name += ` (${branchName})`;
  }

  fs.writeFile('./dist/manifest.webmanifest', JSON.stringify(webmanifest, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error); // eslint-disable-line no-console
    }
  });
});
