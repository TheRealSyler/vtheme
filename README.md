## S.Theme

<span id="BADGE_GENERATION_MARKER_0"></span>
[![npmV](https://img.shields.io/npm/v/s.theme?color=green)](https://www.npmjs.com/package/s.theme) [![min](https://img.shields.io/bundlephobia/min/s.theme)](https://bundlephobia.com/result?p=s.theme) [![install](https://badgen.net/packagephobia/install/s.theme)](https://packagephobia.now.sh/result?p=s.theme) [![githubLastCommit](https://img.shields.io/github/last-commit/TheRealSyler/s.theme)](https://github.com/TheRealSyler/s.theme)
<span id="BADGE_GENERATION_MARKER_1"></span>

<span id="DOC_GENERATION_MARKER_0"></span>

# Docs

- **[index](#index)**

  - [ITheme](#itheme)
  - [ThemeOptions](#themeoptions)
  - [ThemeManager](#thememanager)

### index

##### ITheme

```typescript
/**Theme Template Interface */
interface ITheme {
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
```

##### ThemeOptions

```typescript
/**Theme Installation Options. */
interface ThemeOptions {
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
```

##### ThemeManager

```typescript
class ThemeManager<Theme extends ITheme, Themes extends IThemes<Theme>> {
    private _currentTheme;
    private _themes;
    private _debug;
    private _log;
    constructor(themes: Themes, defaultTheme: keyof Themes, options?: ThemeOptions);
    /**Change/Get any Theme */
    Themes: {
        /**Gets a theme. */
        get: (theme?: keyof Themes | undefined) => Themes[keyof Themes];
        /**Gets a property of a theme. */
        getProperty: <T extends keyof Theme>(property: T, theme?: keyof Themes | undefined) => Theme[T];
        /**Gets a property of a property of a theme */
        getSubProp: <T_1 extends Theme, K extends "data" | "colors" | "fonts" | "defaults", J extends keyof T_1[K]>(property: K, key: J, theme?: keyof Themes | undefined) => any;
        /**Sets a theme. */
        set: (value: Theme, theme?: keyof Themes | undefined) => void;
        /**Sets a property of a theme. */
        setProperty: <T_2 extends Theme, K_1 extends keyof T_2>(property: K_1, value: T_2[K_1], theme?: keyof Themes | undefined) => void;
        /**Sets a property of a property of a theme. */
        setSubProperty: <T_3 extends Theme, K_2 extends "data" | "colors" | "fonts" | "defaults", J_1 extends keyof T_3[K_2]>(property: K_2, key: J_1, value: T_3[K_2][J_1], theme?: keyof Themes | undefined) => void;
        /**Key Get Theme Name (key) */
        key: () => keyof Themes;
    };
    /**Utility for assigning classes */
    Class: {
        colors: (color: keyof Theme["colors"], property: ClassProperty, selector?: "hover" | "active" | "after" | "before" | "focus" | "placeholder" | "placeholder-hover" | "placeholder-focus" | undefined) => string;
        fonts: (font: keyof Theme["fonts"]) => string;
    };
    /**Sets the Current Theme. */
    SetTheme(theme: keyof Themes): void;
    /**
     * Updates the Dom with the current theme based on the given options.
     * only updates the colors if no options are provided.
     */
    Update(options?: UpdateThemeOptions | boolean): void;
    /** Saves the Themes to local Storage. */
    Save(): void;
    private _getThemeKey;
    private _getThemeFromLocalStorage;
}
```

_Generated with_ **[suf-cli](https://www.npmjs.com/package/suf-cli)**
<span id="DOC_GENERATION_MARKER_1"></span>

<span id="LICENSE_GENERATION_MARKER_0"></span>
Copyright (c) 2019 Leonard Grosoli Licensed under the MIT license.
<span id="LICENSE_GENERATION_MARKER_1"></span>
