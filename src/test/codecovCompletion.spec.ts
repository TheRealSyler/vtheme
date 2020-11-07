import { genCssColors } from '../genCss/colors';
import { genCssFonts } from '../genCss/fonts';

test('codecovCompletion', () => {
  class a {
    test() {}
  }

  expect(genCssColors(new a() as any)).toEqual('');
  expect(genCssFonts(new a() as any)).toEqual('');
});
