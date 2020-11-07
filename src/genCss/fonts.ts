import { ITheme } from '../interfaces';

export function genCssFonts(fonts: ITheme['fonts']) {
  if (!fonts) return '';
  let content = '';
  for (const key in fonts) {
    if (fonts.hasOwnProperty(key)) {
      const font = fonts[key];
      content += `.vtheme-font-${key} {
  font-family: ${font};
}
`;
    }
  }
  return content;
}
