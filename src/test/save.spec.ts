import { Theme } from '../index';

test('Save', () => {
  const theme = new Theme(
    {
      test: {
        colors: {},
        canBeModified: true,
      },
      awd: {
        colors: {},
        canBeModified: false,
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

  theme.Themes.setProperty('canBeModified', false, 'test');
  theme.Save();

  expect(JSON.parse(localStorage.__STORE__[key])).toStrictEqual({
    currentTheme: 'test',
    customThemes: {},
  });
});
