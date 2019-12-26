import Merge from 'deepmerge';
import { ThemeScrollbar } from './helpers';
import {
  UpdateThemeOptions,
  defaultOptions,
  HandleColorsUpdate,
  HandleFontUpdate,
  HandleScrollbar
} from './update';

import { ThemeLogMutation, ThemeCannotBeModifiedWarning, ConsoleLog, LogInit } from './console';
import {
  ClassProperty,
  ClassSelector,
  convertClassSelector,
  convertClassProperty
} from './classes';

/** Internal */
const ThemeDataStorageName = 't-theme-data';

/** Internal */
class ThemeData {
  constructor(public customThemes: { [theme: string]: ITheme }, public currentTheme: string) {}
}

/**Theme Template Interface */
export interface ITheme {
  name: string;
  /** If true the theme will be saved when the `Save` Method gets called.  */
  canBeModified: boolean;
  /** Theme Colors */
  colors: {
    [key: string]: string;
  };
  /** Theme Fonts (font-family in css) */
  fonts: {
    [key: string]: string;
  };
  /**Sets the body tag styles. */
  defaults?: {
    /** Default Text Color, Note the Color has to be in the theme colors. */
    color: string;
    /** Default Background Color, Note the Color has to be in the theme colors. */
    background: string;
    /** Default Font Family, Note the font has to be in the theme fonts. */
    font: string;
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
    Mutations?: boolean;
    ThemeUpdates?: boolean;
    ThemeSaves?: boolean;
    Init?: boolean;
  };
}

type IThemes<T> = { [key: string]: T };

export default class ThemeManager<Theme extends ITheme, Themes extends IThemes<Theme>> {
  private _currentTheme: keyof Themes = '';
  private _themes: Themes;
  private _debug: ThemeOptions['debug'] = {
    ignoreCannotBeModified: false
  };

  private _log = {
    Mutation: false,
    Update: false,
    Save: false
  };

  constructor(themes: Themes, defaultTheme: keyof Themes, options?: ThemeOptions) {
    this._themes = themes;

    this._currentTheme = defaultTheme;
    if (options) {
      if (options.debug) {
        this._debug = Object.assign(this._debug, options.debug);
      }
      if (options.Log) {
        if (options.Log.Mutations !== undefined) {
          this._log.Mutation = options.Log.Mutations;
        }
        if (options.Log.ThemeUpdates !== undefined) {
          this._log.Update = options.Log.ThemeUpdates;
        }
        if (options.Log.ThemeSaves !== undefined) {
          this._log.Save = options.Log.ThemeSaves;
        }
      }
    }
    this._getThemeFromLocalStorage();
    this.Update(true);
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

        if (this._log.Mutation) {
          ThemeLogMutation({ property: 'ALL', value, theme: themeKey });
        }
      } else {
        ThemeCannotBeModifiedWarning(themeKey);
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
          ThemeLogMutation({ property, value, theme: themeKey });
        }
      } else {
        ThemeCannotBeModifiedWarning(themeKey);
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
          ThemeLogMutation({ property, value, theme: themeKey });
        }
      } else {
        ThemeCannotBeModifiedWarning(themeKey);
      }
    },
    /**Key Get Theme Name (key) */
    key: () => this._currentTheme
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
      ThemeLogMutation({ property: 'currentTheme', value: theme });
    }
  }

  /**
   * Updates the Dom with the current theme based on the given options.
   * only updates the colors if no options are provided.
   */
  public Update(options: UpdateThemeOptions | boolean = defaultOptions) {
    const all = typeof options === 'boolean' ? options : false;
    if (typeof options === 'boolean') {
      options = {};
    }
    if (all || options.updateColors) {
      HandleColorsUpdate(this);
    }
    if (all || options.updateFonts) {
      HandleFontUpdate(this);
    }
    if (all || options.updateScrollbar) {
      HandleScrollbar(this.Themes.getProperty('scrollBar'));
    }
    if (this._log.Update) {
      let op = '';
      if (!all) {
        for (const key in options) {
          if (options.hasOwnProperty(key)) {
            if (options[key]) {
              op += key.replace('update', ' ');
            }
          }
        }
        ConsoleLog('Updated', op, this._currentTheme);
      } else {
        ConsoleLog('Updated', ' All', this._currentTheme);
      }
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
      ConsoleLog('Saved', saved);
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
