import fs from 'fs';

fs.readFile('./dist/manifest.webmanifest', 'utf8', (err, data) => {
  const webmanifest = JSON.parse(data);

  console.log(process.env);

  if (process.env.BRANCH) {
    webmanifest.name += ` (${process.env.BRANCH})`;
  }

  console.log(webmanifest);
});
