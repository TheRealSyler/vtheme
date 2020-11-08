import { ITheme } from '../interfaces';

export function genCssColors(colors: ITheme['colors']) {
  if (!colors) return '';
  let content = '';
  for (const key in colors) {
    /* istanbul ignore else */
    if (colors.hasOwnProperty(key)) {
      const color = colors[key];

      content += `.vtheme-bg-${key},
.vtheme-h-bg-${key}:hover,
.vtheme-f-bg-${key}:focus,
.vtheme-a-bg-${key}:active,
.vtheme-af-bg-${key}::after,
.vtheme-bf-bg-${key}::before {
  background-color: ${color};
}
.vtheme-c-${key},
.vtheme-h-c-${key}:hover,
.vtheme-f-c-${key}:focus,
.vtheme-a-c-${key}:active,
.vtheme-p-c-${key}::placeholder,
.vtheme-p-h-c-${key}:hover::placeholder,
.vtheme-p-f-c-${key}:focus::placeholder,
.vtheme-af-c-${key}::after,
.vtheme-bf-c-${key}::before {
  color: ${color};
}
.vtheme-f-${key},
.vtheme-h-f-${key}:hover,
.vtheme-a-f-${key}:active,
.vtheme-f-f-${key}:focus,
.vtheme-af-f-${key}::after,
.vtheme-bf-f-${key}::before {
  fill: ${color};
}
.vtheme-b-${key},
.vtheme-h-b-${key}:hover,
.vtheme-f-b-${key}:focus,
.vtheme-a-b-${key}:active,
.vtheme-af-b-${key}::after,
.vtheme-bf-b-${key}::before {
  border-color: ${color};
}
`;
    }
  }
  return content;
}
