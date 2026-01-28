const branchNames = [
  'local',
  'develop',
  'next',
];

export function getWebmanifest(manifest: string) {
  const webmanifest = JSON.parse(manifest);
  const branchName = process?.env?.HEAD || 'local';
  const imageBranch = branchNames.includes(branchName) ? `_${branchName}` : '';

  if (branchName && branchName !== 'main') {
    webmanifest.name += ` (${branchName})`;
  }

  if (imageBranch !== '') {
    webmanifest.icons[0].src = `/icon-maskable-512x512${imageBranch}.png`;
  }

  return JSON.stringify(webmanifest, null, 2);
}
