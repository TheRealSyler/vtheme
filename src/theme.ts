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
  LogGet,
  LogGetProp,
  LogGetSubProp,
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

export class vTheme<Themes extends IThemes, Theme extends Themes[keyof Themes]> {
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
    get: false,
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
      /* istanbul ignore else */
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

  /**Gets a theme. */
  get(theme?: keyof Themes) {
    const _theme = this._themeKey(theme);
    if (this._log.all || this._log.get) {
      LogGet(_theme);
    }
    return this._themes[_theme];
  }

  /**Gets a property of a theme. */
  getProperty<T extends keyof Themes[keyof Themes]>(property: T, theme?: keyof Themes) {
    const _theme = this._themeKey(theme);
    if (this._log.all || this._log.get) {
      LogGetProp(_theme, property);
    }
    return this._themes[_theme][property];
  }

  /**Gets a property of a property of a theme */
  getSubProp<
    T extends Theme,
    K extends keyof Pick<T, 'colors' | 'fonts' | 'data'>,
    J extends keyof T[K]
  >(property: K, key: J, theme?: keyof Themes) {
    const _theme = this._themeKey(theme);
    if (this._log.all || this._log.get) {
      LogGetSubProp(_theme, property, key);
    }
    return this._themes[_theme][property][key];
  }

  /**Sets a theme. */
  set(value: Theme & ITheme, theme?: keyof Themes) {
    const themeKey = this._themeKey(theme);

    if (
      this._themes[themeKey].canBeModified /* istanbul ignore next */ ||
      this._debug?.ignoreCannotBeModified
    ) {
      this._themes[themeKey] = value;
      if (this._log.all || this._log.set) {
        LogSetTheme(themeKey as string, value);
      }
    } else {
      LogCannotBeModifiedWarning(themeKey);
    }
  }
  /**Sets a property of a theme. */
  setProperty<T extends Theme, K extends keyof T>(property: K, value: T[K], theme?: keyof Themes) {
    const themeKey = this._themeKey(theme);
    if (
      this._themes[themeKey].canBeModified /* istanbul ignore next */ ||
      this._debug?.ignoreCannotBeModified
    ) {
      this._themes[themeKey][property as any] = value; // TODO remove as any if possible

      if (this._log.all || this._log.set) {
        LogSetProp(property as string, themeKey, value);
      }
    } else {
      LogCannotBeModifiedWarning(themeKey);
    }
  }
  /**Sets a property of a property of a theme. */
  setSubProperty<
    T extends Theme,
    K extends keyof Pick<T, 'colors' | 'fonts' | 'data'>,
    J extends keyof T[K]
  >(property: K, key: J, value: T[K][J], theme?: keyof Themes) {
    const themeKey = this._themeKey(theme);
    if (
      this._themes[themeKey].canBeModified /* istanbul ignore next */ ||
      this._debug?.ignoreCannotBeModified
    ) {
      this._themes[themeKey][property][key] = value;

      if (this._log.all || this._log.set) {
        LogSetSubProp(property, themeKey, key, value);
      }
    } else {
      LogCannotBeModifiedWarning(themeKey);
    }
  }
  /**current theme name (key) */
  currentTheme() {
    return this._currentTheme;
  }
  /**theme names (keys)*/
  themes() {
    return Object.keys(this._themes) as (keyof Themes)[];
  }

  /**get color class name. */
  color(color: keyof Theme['colors'], property: ClassProperty, selector?: ClassSelector) {
    if (property !== 'color' && selector?.startsWith('placeholder')) {
      LogWarning(
        `The ${selector} selector should only be used with the color property.`,
        '[Class.color]:'
      );
    }
    return `vtheme-${convertClassSelector(selector)}${convertClassProperty(property)}${color}`;
  }
  /**Get font class name. */
  font(font: keyof Theme['fonts']) {
    return `vtheme-font-${font}`;
  }

  /**Sets the Current Theme. */
  public SetCurrentTheme(theme: keyof Themes) {
    this._currentTheme = theme;
    if (this._log.set || this._log.all) {
      LogSetCurrentTheme(theme);
    }
  }

  /** Updates the css classes with the current theme. */
  public Update() {
    const restoreLog = this._disableLog('get');
    this._styleSheets.color.textContent = genCssColors(this.getProperty('colors'));
    this._styleSheets.font.textContent = genCssFonts(this.getProperty('fonts'));
    this._styleSheets.scrollbar.textContent = genScrollbarCss(this.getProperty('scrollBar'));
    restoreLog();
    if (this._log.update || this._log.all) {
      LogUpdate(this._currentTheme as string);
    }
  }

  /** Saves the Themes to local Storage. */
  public Save() {
    const ThemesToSave: { [name: string]: ITheme } = {};
    let saved: string[] = [];
    for (const key in this._themes) {
      /* istanbul ignore else */
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
        const restoreLog = this._disableLog('set');
        for (const key in this._themes) {
          /* istanbul ignore else */
          if (Object.prototype.hasOwnProperty.call(this._themes, key)) {
            const Theme = this._themes[key];
            if (Theme.canBeModified && Data.customThemes[key]) {
              this.set(Merge(Theme, Data.customThemes[key]) as Theme, key);
            }
          }
        }
        restoreLog();
      } else {
        this.Save();
      }
    }
  }

  private _disableLog(key: keyof typeof vTheme['prototype']['_log']) {
    const all = this._log.all;
    const logKey = this._log[key];
    this._log.all = false;
    this._log[key] = false;
    return () => {
      this._log.all = all;
      this._log[key] = logKey;
    };
  }
}
