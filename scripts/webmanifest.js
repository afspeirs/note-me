import { readFile, writeFile } from 'fs';

readFile('./dist/manifest.webmanifest', 'utf8', (err, data) => {
  const webmanifest = JSON.parse(data);
  const branchName = process.env.HEAD || 'local';
  const imageBranch = ['local', 'develop', 'next'].includes(branchName) ? `_${branchName}` : '';

  if (branchName && branchName !== 'main') {
    webmanifest.name += ` (${branchName})`;
  }

  if (imageBranch !== '') {
    webmanifest.icons[0].src = `/icon-maskable-512x512${imageBranch}.png`;
  }

  const webmanifestApple = JSON.parse(JSON.stringify(webmanifest));
  webmanifestApple.icons = [
    {
      src: `/icon-apple-512x512${imageBranch}.png`,
      sizes: '512x512',
      type: 'image/png',
    },
  ];

  writeFile('./dist/manifest.webmanifest', JSON.stringify(webmanifest, null, 2), (error) => {
    if (error) console.log('An error has occurred ', error); // eslint-disable-line no-console
  });
  writeFile('./dist/manifest-apple.webmanifest', JSON.stringify(webmanifestApple, null, 2), (error) => {
    if (error) console.log('An error has occurred ', error); // eslint-disable-line no-console
  });
});
