import JestStoreLog from 'jest-store-log';
import { vTheme } from '../theme';

test('Set', () => {
  const log = new JestStoreLog();

  const theme = new vTheme(
    {
      test: {
        colors: {
          bg: '#fff',
        },
        canBeModified: true,
      },
    },
    'test',
    { log: { set: true } }
  );

  expect(log.logs[0]).toEqual(undefined);

  theme.setSubProperty('colors', 'bg', '#aaa');

  expect(log.logs[0]).toEqual('%cSet: %ctest %c(theme) %c> %ccolors %c> %cbg %cto %c#aaa');
  log.logs = [];
  theme.setProperty('colors', { bg: '#000' });

  expect(log.logs[0]).toEqual('%cSet: %ctest %c(theme) %c> %ccolors %cto %c[object Object]');

  log.logs = [];

  theme.set({ colors: { bg: 'red' }, canBeModified: true });

  expect(log.logs[0]).toEqual('%cSet: %ctest %c(theme) %cto %c[object Object]');

  log.TestEnd();
});
