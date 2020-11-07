import { genCssColors } from '../genCss/colors';
import { Theme } from '../index';

test('Update', () => {
  const theme = new Theme(
    {
      test: {
        colors: {
          test: 'awd',
        },
        canBeModified: true,
      },
    },
    'test'
  );

  const colorSheet = document.getElementById('vtheme-stylesheet-color');
  expect(colorSheet?.textContent).toEqual(genCssColors({ test: 'awd' }));
  theme.Themes.setSubProperty('colors', 'test', '#fff');
  expect(colorSheet?.textContent).toEqual(genCssColors({ test: 'awd' }));
  theme.Update();
  expect(colorSheet?.textContent).toEqual(genCssColors({ test: '#fff' }));
});
