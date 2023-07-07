import fs from 'fs';

fs.readFile('./dist/manifest.webmanifest', 'utf8', (err, data) => {
  const webmanifest = JSON.parse(data);
  const branchName = process.env.HEAD;

  console.log(process.env);

  if (branchName) {
    webmanifest.name += ` (${branchName})`;
  }

  console.log(webmanifest);

  fs.writeFile('./dist/manifest.webmanifest', JSON.stringify(webmanifest, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error); // eslint-disable-line no-console
    }
  });
});
