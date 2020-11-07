import { genCssColors } from '../genCss/colors';
import { genCssFonts } from '../genCss/fonts';
import { genScrollbarCss } from '../genCss/scrollbar';
import { Theme } from '../index';
import { clearTheme } from './clear';

test('stylesheets: DOM', () => {
  new Theme(
    {
      test: {},
    },
    'test'
  );
  expect(document.getElementById('vtheme-stylesheet-scrollbar')).toBeInTheDocument();
  expect(document.getElementById('vtheme-stylesheet-color')).toBeInTheDocument();
  expect(document.getElementById('vtheme-stylesheet-font')).toBeInTheDocument();
});

test('stylesheets: CSS', () => {
  clearTheme();

  new Theme(
    {
      test: {
        fonts: {
          test: 'Roboto',
        },
        scrollBar: {
          radius: 5,
          height: '4px',
          width: '230rem',
        },
        colors: {
          bg: 'red',
        },
      },
    },
    'test'
  );

  const scrollbarSheet = document.getElementById('vtheme-stylesheet-scrollbar');
  const colorSheet = document.getElementById('vtheme-stylesheet-color');
  const fontsSheet = document.getElementById('vtheme-stylesheet-font');

  expect(scrollbarSheet?.textContent).toEqual(
    genScrollbarCss({ radius: 5, height: '4px', width: '230rem' })
  );
  expect(colorSheet?.textContent).toEqual(genCssColors({ bg: 'red' }));
  expect(fontsSheet?.textContent).toEqual(genCssFonts({ test: 'Roboto' }));
});
