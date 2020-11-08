import { genCssColors } from '../genCss/colors';
import { vTheme } from '../index';

test('Update', () => {
  const theme = new vTheme(
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
  theme.setSubProperty('colors', 'test', '#fff');
  expect(colorSheet?.textContent).toEqual(genCssColors({ test: 'awd' }));
  theme.Update();
  expect(colorSheet?.textContent).toEqual(genCssColors({ test: '#fff' }));
});
