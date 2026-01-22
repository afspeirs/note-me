function isDryRun() {
  return process.argv.includes('--dry-run');
}

const configProduction = [
  ['@semantic-release/npm', { npmPublish: false }],
  [
    '@semantic-release/git',
    {
      assets: ['package.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    },
  ],
];

module.exports = {
  branches: [
    'main',
    { name: 'develop', prerelease: 'develop' },
    { name: 'next', prerelease: 'next' },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd: './scripts/release-update-version.sh ${nextRelease.version}',
      },
    ],
    ...isDryRun() ? [] : configProduction,
  ],
};
