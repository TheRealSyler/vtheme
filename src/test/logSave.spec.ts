import JestStoreLog from 'jest-store-log';
import { Theme } from '../theme';
import { clearTheme } from './clear';

test('Log: Save', () => {
  const log = new JestStoreLog();

  new Theme(
    {
      test: {},
    },
    'test',
    { log: { save: true } }
  );

  expect(log.logs[0]).toEqual('%cSaved (no themes marked as canBeModified)');
  clearTheme();
  log.logs = [];
  new Theme(
    {
      Test: { canBeModified: true },
      a: {},
    },
    'Test',
    { log: { save: true } }
  );
  expect(log.logs[0]).toEqual('%cSaved: %cTest %c(theme)');
  clearTheme();
  log.logs = [];
  new Theme(
    {
      Test: { canBeModified: true },
      a: { canBeModified: true },
    },
    'Test',
    { log: { save: true } }
  );
  expect(log.logs[0]).toEqual('%cSaved: %cTest, a %c(themes)');
  log.TestEnd();
});
