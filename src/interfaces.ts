export interface ThemeScrollbar {
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  width?: string | number;
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  height?: string | number;
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  radius?: string | number;
  /**
   * Scrollbar track color in Css color format, `#35a` etc.
   */
  track?: string;
  /**
   * Scrollbar thumb color in Css color format, `#35a` etc.
   */
  thumb?: string;
  /**
   * Scrollbar thumb hover color in Css color format, `#35a` etc.
   */
  thumbHover?: string;
}

/**Theme Template Interface */
export interface ITheme {
  name?: string;
  /** If true the theme will be saved when the `Save` Method gets called.*/
  canBeModified?: boolean;
  /** Theme Colors */
  colors?: {
    [key: string]: string;
  };
  /** Theme Fonts (font-family in css) */
  fonts?: {
    [key: string]: string;
  };
  /** can be used to store additional data. */
  data?: {
    [key: string]: any;
  };
  scrollBar?: ThemeScrollbar;
}

/**Theme Installation Options. */
export interface ThemeOptions {
  debug?: {
    ignoreCannotBeModified?: boolean;
  };
  log?: {
    /**Log all events*/
    all?: boolean;
    set?: boolean;
    update?: boolean;
    save?: boolean;
    init?: boolean;
  };
}
