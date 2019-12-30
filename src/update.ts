import ThemeManager, { ITheme } from '.';

const ColorThemeStyleTagName = 't-style-tag-color';
const ScrollBarThemeStyleTagName = 't-style-tag-scrollbar';
const FontThemeStyleTagName = 't-style-tag-font';

export interface UpdateThemeOptions {
  updateFonts?: boolean;
  updateColors?: boolean;
  updateScrollbar?: boolean;
}
export const defaultOptions: UpdateThemeOptions = {
  updateColors: true,
  updateFonts: false,
  updateScrollbar: false
};

// ## ANCHOR Color
export function HandleColorsUpdate<T extends ITheme>(TM: ThemeManager<T, any>) {
  let colorThemeElement = document.getElementById(ColorThemeStyleTagName);
  if (colorThemeElement === null) {
    const styleEl = document.createElement('style');
    styleEl.id = ColorThemeStyleTagName;
    document.head.appendChild(styleEl);
    colorThemeElement = styleEl;
  }

  const themeColors = TM.Themes.getProperty('colors');
  const themeDefaults = TM.Themes.getProperty('defaults');
  const themeFonts = TM.Themes.getProperty('fonts');
  let colorStyleContent = '';
  if (themeDefaults) {
    const font =
      themeFonts && themeDefaults.font ? `\n  font-family: ${themeFonts[themeDefaults.font]};` : '';
    const bg =
      themeColors && themeDefaults.background
        ? `\n  background: ${themeColors[themeDefaults.background]};`
        : '';
    const color =
      themeColors && themeDefaults.color ? `\n  color: ${themeColors[themeDefaults.color]};` : '';
    if (font || bg || color) {
      colorStyleContent += `
${themeDefaults.selectors.join(', ')} {${font}${bg}${color}
}
`;
    }
  }
  for (const key in themeColors) {
    if (themeColors.hasOwnProperty(key)) {
      const color = themeColors[key];

      colorStyleContent += `.t-bg-${key},
.t-h-bg-${key}:hover,
.t-f-bg-${key}:focus,
.t-a-bg-${key}:active,
.t-af-bg-${key}::after,
.t-bf-bg-${key}::before {
  background-color: ${color};
}
t-c-${key},
.t-h-c-${key}:hover,
.t-f-c-${key}:focus,
.t-a-c-${key}:active,
.t-p-c-${key}::placeholder,
.t-p-h-c-${key}:hover::placeholder,
.t-p-f-c-${key}:focus::placeholder,
.t-af-c-${key}::after,
.t-bf-c-${key}::before {
  color: ${color};
}
.t-f-${key},
.t-h-f-${key}:hover,
.t-a-f-${key}:active,
.t-f-f-${key}:focus,
.t-af-f-${key}::after,
.t-bf-f-${key}::before {
  fill: ${color};
}
.t-b-${key},
.t-h-b-${key}:hover,
.t-f-b-${key}:focus,
.t-a-b-${key}:active,
.t-af-b-${key}::after,
.t-bf-b-${key}::before {
  border-color: ${color};
}
`;
    }

    colorThemeElement.textContent = colorStyleContent;
  }
}

// ## ANCHOR Scrollbar
export function HandleScrollbar(scrollBar: ITheme['scrollBar']) {
  if (scrollBar !== undefined) {
    let scrollbarThemeElement = document.getElementById(ScrollBarThemeStyleTagName);
    if (scrollbarThemeElement === null) {
      const styleEl = document.createElement('style');
      styleEl.id = ScrollBarThemeStyleTagName;
      document.head.appendChild(styleEl);
      scrollbarThemeElement = styleEl;
    }
    const content = `
body::-webkit-scrollbar, div::-webkit-scrollbar {
  width: ${scrollBar.width};
  height: ${scrollBar.height};
}
body::-webkit-scrollbar-track, div::-webkit-scrollbar-track {
  background: ${scrollBar.options.track};
}
body::-webkit-scrollbar-thumb, div::-webkit-scrollbar-thumb {
  background: ${scrollBar.options.thumb};
  border-radius: ${scrollBar.radius};
}
body::-webkit-scrollbar-thumb:hover, div::-webkit-scrollbar-thumb:hover {
  background: ${scrollBar.options.thumbHover};
}
`;
    scrollbarThemeElement.textContent = content;
  }
}

// ## ANCHOR Font
export function HandleFontUpdate<T extends ITheme>(theme: ThemeManager<T, any>) {
  let fontThemeElement = document.getElementById(FontThemeStyleTagName);
  if (fontThemeElement === null) {
    const styleEl = document.createElement('style');
    styleEl.id = FontThemeStyleTagName;
    document.head.appendChild(styleEl);
    fontThemeElement = styleEl;
  }

  const fonts = theme.Themes.getProperty('fonts');
  let fontStyleContent = '';
  for (const key in fonts) {
    if (fonts.hasOwnProperty(key)) {
      const font = fonts[key];
      fontStyleContent += `.t-font-${key} {
    font-family: ${font} !important;
  }`;
    }
  }
  fontThemeElement.textContent = fontStyleContent;
}
