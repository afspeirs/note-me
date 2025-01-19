export function getWebmanifest(manifest: string, apple = false) {
  const webmanifest = JSON.parse(manifest);
  const branchName = process?.env?.HEAD || 'local';
  const imageBranch = ['local', 'develop', 'next'].includes(branchName) ? `_${branchName}` : '';

  if (branchName && branchName !== 'main') {
    webmanifest.name += ` (${branchName})`;
  }

  if (imageBranch !== '') {
    webmanifest.icons[0].src = `/icon-maskable-512x512${imageBranch}.png`;
  }

  if (apple) {
    webmanifest.icons = [
      {
        src: `/icon-apple-512x512${imageBranch}.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ];
  }

  return JSON.stringify(webmanifest, null, 2);
}
