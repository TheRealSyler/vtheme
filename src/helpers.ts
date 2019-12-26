import Merge from 'deepmerge';

class ThemeBaseHelper<T extends Object> {
  options: T;
  constructor(defaults: T, options: Partial<T>) {
    this.options = Merge(defaults, options);
  }
}

export interface ThemeScrollbarColors {
  /**
   * Scrollbar track color in Css color format, `#35a` etc.
   */
  track: string;
  /**
   * Scrollbar thumb color in Css color format, `#35a` etc.
   */
  thumb: string;
  /**
   * Scrollbar thumb hover color in Css color format, `#35a` etc.
   */
  thumbHover: string;
}
export interface ThemeScrollbarCss {
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  width: string | number;
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  height: string | number;
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  radius: string | number;
}
export class ThemeScrollbar extends ThemeBaseHelper<ThemeScrollbarColors> {
  width: string;
  height: string;
  radius: string;
  constructor(options?: Partial<ThemeScrollbarColors>, cssOptions?: Partial<ThemeScrollbarCss>) {
    options = options || {};
    super(
      {
        thumb: '#333',
        thumbHover: '#555',
        track: '#222'
      },
      options
    );
    cssOptions = cssOptions || {};
    this.width = ToCssUnit(cssOptions.width || 10);
    this.height = ToCssUnit(cssOptions.height || 10);
    this.radius = ToCssUnit(cssOptions.radius || 12);
  }
}

function ToCssUnit(input: number | string): string {
  if (typeof input === 'string') {
    return input;
  } else {
    return `${input}px`;
  }
}
