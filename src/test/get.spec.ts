import JestStoreLog from 'jest-store-log';
import { vTheme } from '../theme';

test('Get', () => {
  const log = new JestStoreLog();

  const theme = new vTheme(
    {
      Test: {
        colors: {
          bg: '#fff',
        },
        canBeModified: true,
      },
    },
    'Test',
    { log: { get: true } }
  );

  expect(log.logs[0]).toEqual(undefined);

  expect(theme.getSubProp('colors', 'bg')).toEqual('#fff');

  expect(log.logs[0]).toEqual('%cGet: %cTest %c(theme) %c> %ccolors %c> %cbg');
  log.logs = [];
  expect(theme.getProperty('colors')).toStrictEqual({ bg: '#fff' });

  expect(log.logs[0]).toEqual('%cGet: %cTest %c(theme) %c> %ccolors');

  log.logs = [];

  expect(theme.get()).toStrictEqual({
    colors: {
      bg: '#fff',
    },
    canBeModified: true,
  });

  expect(log.logs[0]).toEqual('%cGet: %cTest %c(theme)');

  theme['_log'].get = false;

  log.logs = [];
  theme.getSubProp('colors', 'bg');
  expect(log.logs[0]).toEqual(undefined);
  theme.getProperty('colors');
  expect(log.logs[0]).toEqual(undefined);
  theme.get();
  expect(log.logs[0]).toEqual(undefined);

  theme['_log'].get = true;

  expect(theme.themes()).toStrictEqual(['Test']);
  expect(theme.currentTheme()).toStrictEqual('Test');

  log.TestEnd();
});
