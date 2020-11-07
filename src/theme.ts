import Merge from 'deepmerge';
import { ITheme, ThemeOptions } from './interfaces';

import {
  LogCannotBeModifiedWarning,
  LogInit,
  LogSetTheme,
  LogUpdate,
  LogSave,
  LogWarning,
  LogSetCurrentTheme,
  LogSetProp,
  LogSetSubProp,
} from './console';
import {
  ClassProperty,
  ClassSelector,
  convertClassSelector,
  convertClassProperty,
} from './classes';
import { genScrollbarCss } from './genCss/scrollbar';
import { genCssColors } from './genCss/colors';
import { genCssFonts } from './genCss/fonts';

/** Internal */
class ThemeData {
  constructor(public customThemes: { [theme: string]: ITheme }, public currentTheme: string) {}
}

type IThemes = { [key: string]: ITheme };

export class Theme<Themes extends IThemes, Theme extends Themes[keyof Themes]> {
  private _currentTheme: keyof Themes = '';
  private _themes: Themes;
  private _debug: ThemeOptions['debug'] = {
    ignoreCannotBeModified: false,
  };

  private _styleSheets = {
    color: document.createElement('style'),
    font: document.createElement('style'),
    scrollbar: document.createElement('style'),
  };

  private _log: NonNullable<ThemeOptions['log']> = {
    all: false,
    init: false,
    set: false,
    update: false,
    save: false,
  };

  private _localStorageKey = 'vtheme-local-data';

  constructor(themes: Themes, defaultTheme: keyof Themes, options?: ThemeOptions) {
    this._themes = themes;

    this._currentTheme = defaultTheme;
    if (options) {
      if (options.debug) this._debug = { ...this._debug, ...options.debug };
      if (options.log) this._log = { ...this._log, ...options.log };
    }
    let multipleInstanceError = false;
    // init styleSheets
    for (const key in this._styleSheets) {
      if (Object.prototype.hasOwnProperty.call(this._styleSheets, key)) {
        const element = this._styleSheets[key];
        const id = `vtheme-stylesheet-${key}`;
        const existingElement = document.getElementById(id);
        if (!existingElement) {
          document.head.appendChild(element);
          element.id = id;
        } else {
          if (!multipleInstanceError) {
            LogWarning('Please use only one vtheme instance!');
            multipleInstanceError = true;
          }

          this._styleSheets[key] = existingElement;
        }
      }
    }

    if (this._log.init || this._log.all) {
      LogInit();
    }

    this._getThemeFromLocalStorage();
    this.Update();
  }

  /**Get/Set any Theme */
  public Themes = {
    /**Gets a theme. */
    get: (theme?: keyof Themes) => this._themes[this._themeKey(theme)],
    /**Gets a property of a theme. */
    getProperty: <T extends keyof Themes[keyof Themes]>(property: T, theme?: keyof Themes) =>
      this._themes[this._themeKey(theme)][property],
    /**Gets a property of a property of a theme */
    getSubProp: <
      T extends Theme,
      K extends keyof Pick<T, 'colors' | 'fonts' | 'data'>,
      J extends keyof T[K]
    >(
      property: K,
      key: J,
      theme?: keyof Themes
    ) => {
      return this._themes[this._themeKey(theme)][property][key];
    },
    /**Sets a theme. */
    set: (value: Theme & ITheme, theme?: keyof Themes) => {
      const themeKey = this._themeKey(theme);
      if (this._themes[themeKey].canBeModified || this._debug?.ignoreCannotBeModified) {
        this._themes[themeKey] = value;
        if (this._log.set || this._log.all) {
          LogSetTheme(themeKey as string, value);
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
      const themeKey = this._themeKey(theme);
      if (this._themes[themeKey].canBeModified || this._debug?.ignoreCannotBeModified) {
        this._themes[themeKey][property as any] = value; // TODO remove as any if possible

        if (this._log.set || this._log.all) {
          LogSetProp(property as string, themeKey, value);
        }
      } else {
        LogCannotBeModifiedWarning(themeKey);
      }
    },
    /**Sets a property of a property of a theme. */
    setSubProperty: <
      T extends Theme,
      K extends keyof Pick<T, 'colors' | 'fonts' | 'data'>,
      J extends keyof T[K]
    >(
      property: K,
      key: J,
      value: T[K][J],
      theme?: keyof Themes
    ) => {
      const themeKey = this._themeKey(theme);
      if (this._themes[themeKey].canBeModified || this._debug?.ignoreCannotBeModified) {
        this._themes[themeKey][property][key] = value;

        if (this._log.set || this._log.all) {
          LogSetSubProp(property, themeKey, key, value);
        }
      } else {
        LogCannotBeModifiedWarning(themeKey);
      }
    },
    /**current theme name (key) */
    key: () => this._currentTheme,
    /**theme names (keys)*/
    keys: () => Object.keys(this._themes) as (keyof Themes)[],
  };

  /**Get color or font class name*/
  public Class = {
    color: (color: keyof Theme['colors'], property: ClassProperty, selector?: ClassSelector) => {
      if (property !== 'color' && selector?.startsWith('placeholder')) {
        LogWarning(
          `The ${selector} selector should only be used with the color property.`,
          '[Class.color]:'
        );
      }
      return `vtheme-${convertClassSelector(selector)}${convertClassProperty(property)}${color}`;
    },
    font: (font: keyof Theme['fonts']) => `vtheme-font-${font}`,
  };

  /**Sets the Current Theme. */
  public SetCurrentTheme(theme: keyof Themes) {
    this._currentTheme = theme;
    if (this._log.set || this._log.all) {
      LogSetCurrentTheme(theme);
    }
  }

  /** Updates the css classes with the current theme. */
  public Update() {
    this._styleSheets.color.textContent = genCssColors(this.Themes.getProperty('colors'));
    this._styleSheets.font.textContent = genCssFonts(this.Themes.getProperty('fonts'));
    this._styleSheets.scrollbar.textContent = genScrollbarCss(this.Themes.getProperty('scrollBar'));

    if (this._log.update || this._log.all) {
      LogUpdate(this._currentTheme as string);
    }
  }

  /** Saves the Themes to local Storage. */
  public Save() {
    const ThemesToSave: { [name: string]: ITheme } = {};
    let saved: string[] = [];
    for (const key in this._themes) {
      if (this._themes.hasOwnProperty(key)) {
        const Theme = this._themes[key];
        if (Theme.canBeModified) {
          ThemesToSave[key] = Theme;
          saved.push(key);
        }
      }
    }
    if (this._log.save || this._log.all) {
      LogSave(saved);
    }

    window.localStorage.setItem(
      this._localStorageKey,
      JSON.stringify(new ThemeData(ThemesToSave, this._currentTheme as string))
    );
  }

  private _themeKey(key: keyof Themes | undefined) {
    return key ? key : this._currentTheme;
  }

  private _getThemeFromLocalStorage() {
    const themeData = window.localStorage.getItem(this._localStorageKey);
    if (themeData === null) {
      this.Save();
    } else {
      const Data: ThemeData = JSON.parse(themeData);
      if (this._themes[Data.currentTheme]) {
        this.SetCurrentTheme(Data.currentTheme);

        for (const key in this._themes) {
          if (Object.prototype.hasOwnProperty.call(this._themes, key)) {
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
