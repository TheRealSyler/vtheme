import JestStoreLog from 'jest-store-log';
import { Theme } from '../theme';

test('Log: All', () => {
  const log = new JestStoreLog();

  const theme = new Theme(
    {
      Test: {},
    },
    'Test',
    { log: { all: true } }
  );

  expect(log.logs[0]).toEqual('%cvTheme Initialized!');

  expect(log.logs[2]).toEqual('%cSaved (no themes marked as canBeModified)');
  theme.Update();
  expect(log.logs[4]).toEqual('%cUpdated using: %cTest %c(theme)');
  log.logs = [];
  theme.Themes.set({});
  expect(log.logs[0]).toBe('%cTest %c(theme) %ccannot be modified!');
  log.logs = [];
  theme.SetCurrentTheme('Test');
  expect(log.logs[0]).toBe('%cSet: %ccurrent theme %cto %cTest %c(theme)');
  log.TestEnd();
});

test('Log: Multiple instances warning', () => {
  const log = new JestStoreLog();
  new Theme(
    {
      test: {},
    },
    'test'
  );

  expect(log.logs[0]).toEqual('%cPlease use only one vtheme instance!');

  log.TestEnd();
});
