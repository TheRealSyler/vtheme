import { genCssColors } from '../genCss/colors';
import { genCssFonts } from '../genCss/fonts';
import { genScrollbarCss } from '../genCss/scrollbar';

test('GenCSS: Colors', () => {
  const css = genCssColors({ test: '#fff', a: '#344' });

  expect(typeof css === 'string').toBe(true);
});

test('GenCSS: Fonts', () => {
  const css = genCssFonts({ test: 'Roboto', a: 'sans-serif' });

  expect(css).toEqual(`.vtheme-font-test {
  font-family: Roboto;
}
.vtheme-font-a {
  font-family: sans-serif;
}
`);
});
test('GenCSS: Scrollbar', () => {
  const height = genScrollbarCss({ height: 20 });

  expect(height).toEqual(`*::-webkit-scrollbar {
  height: 20px;
}
`);
  const width = genScrollbarCss({ width: 20 });

  expect(width).toEqual(`*::-webkit-scrollbar {
  width: 20px;
}
`);
  const heightAndWidth = genScrollbarCss({ height: '60rem', width: 20 });

  expect(heightAndWidth).toEqual(`*::-webkit-scrollbar {
  width: 20px;
  height: 60rem;
}
`);

  const thumb = genScrollbarCss({ thumb: '#fff' });

  expect(thumb).toEqual(`*::-webkit-scrollbar-thumb {
  background-color: #fff;
}
`);
  const radius = genScrollbarCss({ radius: 20 });

  expect(radius).toEqual(`*::-webkit-scrollbar-thumb {
  border-radius: 20px;
}
`);
  const thumbAndRadius = genScrollbarCss({ thumb: '#fff', radius: 20 });

  expect(thumbAndRadius).toEqual(`*::-webkit-scrollbar-thumb {
  background-color: #fff;
  border-radius: 20px;
}
`);
  const thumbAndTrack = genScrollbarCss({ thumb: '#fff', track: '#000' });

  expect(thumbAndTrack).toEqual(`* {
  scrollbar-color: #fff #000;
}
*::-webkit-scrollbar-track {
  background-color: #000;
}
*::-webkit-scrollbar-thumb {
  background-color: #fff;
}
`);
  const thumbHover = genScrollbarCss({ thumbHover: '#eee' });

  expect(thumbHover).toEqual(`*::-webkit-scrollbar-thumb:hover {
  background-color: #eee;
}
`);
});
