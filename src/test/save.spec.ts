import { vTheme } from '../index';
import { clearTheme } from './clear';

test('Save', () => {
  const theme = new vTheme(
    {
      test: {
        colors: {},
        canBeModified: true,
      },
    },
    'test'
  );

  //@ts-ignore
  const key = theme._localStorageKey;

  expect(JSON.parse(localStorage.__STORE__[key])).toStrictEqual({
    currentTheme: 'test',
    customThemes: {
      test: {
        colors: {},
        canBeModified: true,
      },
    },
  });

  theme.setProperty('canBeModified', false as true, 'test');
  theme.Save();

  expect(JSON.parse(localStorage.__STORE__[key])).toStrictEqual({
    currentTheme: 'test',
    customThemes: {},
  });
  clearTheme(false);
  new vTheme({ test: { canBeModified: true } }, 'test').Save();

  expect(JSON.parse(localStorage.__STORE__[key])).toStrictEqual({
    currentTheme: 'test',
    customThemes: { test: { canBeModified: true } },
  });

  clearTheme(false);
  const t = new vTheme({ test: { canBeModified: true } }, 'test');
  expect(t.get()).toStrictEqual({ canBeModified: true });
});
