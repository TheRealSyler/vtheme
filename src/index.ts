import Merge from 'deepmerge';
import { ThemeScrollbar } from './helpers';
import { HandleColorsUpdate, HandleFontUpdate, HandleScrollbar } from './update';

import {
  LogMutation,
  LogCannotBeModifiedWarning,
  LogInit,
  LogSetTheme,
  LogUpdate,
  LogSave
} from './console';
import {
  ClassProperty,
  ClassSelector,
  convertClassSelector,
  convertClassProperty
} from './classes';

/** Internal */
const ThemeDataStorageName = 's.theme-data';

/** Internal */
class ThemeData {
  constructor(public customThemes: { [theme: string]: ITheme }, public currentTheme: string) {}
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
  /**Sets the body tag styles. */
  defaults?: {
    selectors: string[];
    /** Default Text Color */
    color?: string;
    /** Default Background Color. */
    background?: string;
    /** Default Font Family. */
    font?: string;
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
  Log?: {
    Mutation?: boolean;
    Update?: boolean;
    Save?: boolean;
    Init?: boolean;
    SetTheme?: boolean;
  };
}

type IThemes<T> = { [key: string]: T };

export class ThemeManager<Theme extends ITheme, Themes extends IThemes<Theme>> {
  private _currentTheme: keyof Themes = '';
  private _themes: Themes;
  private _debug: ThemeOptions['debug'] = {
    ignoreCannotBeModified: false
  };

  private _log = {
    Mutation: false,
    Update: false,
    Save: false,
    SetTheme: false
  };

  constructor(themes: Themes, defaultTheme: keyof Themes, options?: ThemeOptions) {
    this._themes = themes;

    this._currentTheme = defaultTheme;
    if (options) {
      if (options.debug) {
        this._debug = Object.assign(this._debug, options.debug);
      }
      if (options.Log) {
        if (options.Log.Mutation !== undefined) {
          this._log.Mutation = options.Log.Mutation;
        }
        if (options.Log.Update !== undefined) {
          this._log.Update = options.Log.Update;
        }
        if (options.Log.Save !== undefined) {
          this._log.Save = options.Log.Save;
        }
        if (options.Log.SetTheme !== undefined) {
          this._log.SetTheme = options.Log.SetTheme;
        }
      }
    }
    this._getThemeFromLocalStorage();
    this.Update();
    if (options?.Log?.Init) {
      LogInit();
    }
  }

  /**Change/Get any Theme */
  public Themes = {
    /**Gets a theme. */
    get: (theme?: keyof Themes) => this._themes[this._getThemeKey(theme)],
    /**Gets a property of a theme. */
    getProperty: <T extends keyof Theme>(property: T, theme?: keyof Themes): Theme[T] =>
      this._themes[this._getThemeKey(theme)][property],
    /**Gets a property of a property of a theme */
    getSubProp: <
      T extends Theme,
      K extends keyof Pick<T, 'colors' | 'fonts' | 'data' | 'defaults'>,
      J extends keyof T[K]
    >(
      property: K,
      key: J,
      theme?: keyof Themes
    ) => this._themes[this._getThemeKey(theme)][property as any][key], // TODO remove as any if possible
    /**Sets a theme. */
    set: (value: Theme, theme?: keyof Themes) => {
      const themeKey = this._getThemeKey(theme);
      if (this._themes[themeKey].canBeModified || this._debug?.ignoreCannotBeModified) {
        this._themes[themeKey] = value as any;
        if (this._log.SetTheme) {
          LogSetTheme(themeKey as string);
        }
      } else {
        LogCannotBeModifiedWarning(themeKey);
      }
    },
    /**Sets a property of a theme. */
    setProperty: <T extends Theme, K extends keyof T>(
      property: K,
      value: T[K],
      theme?: keyof Themes
    ) => {
      const themeKey = this._getThemeKey(theme);
      if (this._themes[themeKey].canBeModified || this._debug?.ignoreCannotBeModified) {
        this._themes[themeKey][property as any] = value; // TODO remove as any if possible

        if (this._log.Mutation) {
          LogMutation({ property, value, theme: themeKey });
        }
      } else {
        LogCannotBeModifiedWarning(themeKey);
      }
    },
    /**Sets a property of a property of a theme. */
    setSubProperty: <
      T extends Theme,
      K extends keyof Pick<T, 'colors' | 'fonts' | 'data' | 'defaults'>,
      J extends keyof T[K]
    >(
      property: K,
      key: J,
      value: T[K][J],
      theme?: keyof Themes
    ) => {
      const themeKey = this._getThemeKey(theme);
      if (this._themes[themeKey].canBeModified || this._debug?.ignoreCannotBeModified) {
        this._themes[themeKey][property as any][key] = value; // TODO remove as any if possible

        if (this._log.Mutation) {
          LogMutation({ property, value, theme: themeKey });
        }
      } else {
        LogCannotBeModifiedWarning(themeKey);
      }
    },
    /**current theme name (key) */
    key: () => this._currentTheme,
    /**theme names (keys)*/
    keys: () => Object.keys(this._themes) as (keyof Themes)[]
  };

  /**Utility for assigning classes */
  Class = {
    colors: (color: keyof Theme['colors'], property: ClassProperty, selector?: ClassSelector) =>
      `t-${convertClassSelector(selector)}${convertClassProperty(property)}${color}`,
    fonts: (font: keyof Theme['fonts']) => `t-font-${font}`
  };

  /**Sets the Current Theme. */
  public SetTheme(theme: keyof Themes) {
    this._currentTheme = theme;
    if (this._log.Mutation) {
      LogMutation({ property: 'currentTheme', value: theme });
    }
  }

  /** Updates the css classes with the current theme. */
  public Update() {
    if (this.Themes.getProperty('colors')) {
      HandleColorsUpdate(this);
    }
    if (this.Themes.getProperty('fonts')) {
      HandleFontUpdate(this);
    }
    const scrollBar = this.Themes.getProperty('scrollBar');
    if (scrollBar) {
      HandleScrollbar(scrollBar);
    }
    if (this._log.Update) {
      LogUpdate(this._currentTheme as string);
    }
  }

  /** Saves the Themes to local Storage. */
  public Save() {
    const ThemesToSave: { [name: string]: ITheme } = {};
    let saved = '';
    for (const key in this._themes) {
      if (this._themes.hasOwnProperty(key)) {
        const Theme = this._themes[key];
        if (Theme.canBeModified) {
          ThemesToSave[key] = Theme;
          saved += ` ${key}`;
        }
      }
    }
    if (this._log.Save) {
      LogSave(saved);
    }

    window.localStorage.setItem(
      ThemeDataStorageName,
      JSON.stringify(new ThemeData(ThemesToSave, this._currentTheme as string))
    );
  }

  private _getThemeKey(key: keyof Themes | undefined) {
    return key ? key : this._currentTheme;
  }

  private _getThemeFromLocalStorage() {
    const SavedThemeData = window.localStorage.getItem(ThemeDataStorageName);
    if (SavedThemeData === null) {
      this.Save();
    } else {
      const Data: ThemeData = JSON.parse(SavedThemeData);
      if (this._themes[Data.currentTheme]) {
        this.SetTheme(Data.currentTheme);
        for (const key in this._themes) {
          if (this._themes.hasOwnProperty(key)) {
            const Theme = this._themes[key];
            if (Theme.canBeModified) {
              this.Themes.set(Merge(Theme, Data.customThemes[key]) as Theme, key);
            }
          }
        }
      } else {
        this.Save();
      }
    }
  }
}

export * from './helpers';
export default ThemeManager;
