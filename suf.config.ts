import { ConfigFile } from 'suf-cli';

const config: ConfigFile = {
  badges: {
    name: 'vtheme',
    github: 'TheRealSyler',
    repo: 'vtheme',
    out: 'README.md',
    badges: [
      'npmV npm ?color=green',
      'min bundle',
      'install package',
      'githubLastCommit github',
      'codecov codecov',
      'circleci circleci',
    ],
  },
  tsDoc: {
    title: 'Docs',
    dir: 'dist',
    out: 'README.md',
    include: ['theme', 'extraFunctions', 'interfaces'],
  },
  license: {
    name: 'Leonard Grosoli',
    type: 'mit',
    year: '2019',
    out: 'README.md',
    file: 'LICENSE',
  },
};

export default config;
