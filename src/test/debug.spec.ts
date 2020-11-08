import JestStoreLog from 'jest-store-log';
import { vTheme } from '../index';
import { clearTheme } from './clear';

test('Debug: ignoreCannotBeModified', () => {
  const theme = new vTheme(
    {
      test: {
        colors: { a: '#fff' },
        canBeModified: false,
      },
    },
    'test',
    { debug: { ignoreCannotBeModified: true } }
  );

  const log = new JestStoreLog();

  theme.set({ canBeModified: false, colors: { a: '#000' } });
  theme.setProperty('canBeModified', false);
  theme.setSubProperty('colors', 'a', '#aaa');

  expect(log.logs).toStrictEqual([]);
  clearTheme(false);
  const vtheme = new vTheme(
    {
      test: {
        colors: { a: '#fff' },
      },
    },
    'test'
  );

  vtheme.set({ colors: { a: '#000' } });
  vtheme.setProperty('colors', { a: '#123' });
  vtheme.setSubProperty('colors', 'a', '#aaa');

  expect(log.logs.length).toEqual(12);
});
