## S.Theme

<span id="BADGE_GENERATION_MARKER_0"></span>
[![npmV](https://img.shields.io/npm/v/s.theme?color=green)](https://www.npmjs.com/package/s.theme) [![min](https://img.shields.io/bundlephobia/min/s.theme)](https://bundlephobia.com/result?p=s.theme) [![install](https://badgen.net/packagephobia/install/s.theme)](https://packagephobia.now.sh/result?p=s.theme) [![githubLastCommit](https://img.shields.io/github/last-commit/TheRealSyler/s.theme)](https://github.com/TheRealSyler/s.theme)
<span id="BADGE_GENERATION_MARKER_1"></span>

<span id="DOC_GENERATION_MARKER_0"></span>

# Docs

- **[extraFunctions](#extrafunctions)**

  - [ThemeTransitionOptions](#themetransitionoptions)
  - [ThemeTransition](#themetransition)

- **[helpers](#helpers)**

  - [ThemeScrollbarColors](#themescrollbarcolors)
  - [ThemeScrollbarCss](#themescrollbarcss)
  - [ThemeScrollbar](#themescrollbar)

- **[theme](#theme)**

  - [ITheme](#itheme)
  - [ThemeOptions](#themeoptions)
  - [Theme](#theme)

### extraFunctions

##### ThemeTransitionOptions

```typescript
type ThemeTransitionOptions = {
    removeAfter?: number;
    loops?: number;
    drawInterval?: number;
    maxSmallShapes?: number;
    maxLargeShapes?: number;
    minSmallShapes?: number;
    minLargeShapes?: number;
    noiseOpacity?: number;
    noiseMaxBrightness?: number;
    minShapesOpacity?: number;
    maxShapesOpacity?: number;
}
```

##### ThemeTransition

```typescript
function ThemeTransition(options?: ThemeTransitionOptions): void;
```

### helpers

##### ThemeScrollbarColors

```typescript
interface ThemeScrollbarColors {
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
```

##### ThemeScrollbarCss

```typescript
interface ThemeScrollbarCss {
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
```

##### ThemeScrollbar

```typescript
class ThemeScrollbar extends ThemeBaseHelper<ThemeScrollbarColors> {
    width: string;
    height: string;
    radius: string;
    constructor(options?: Partial<ThemeScrollbarColors>, cssOptions?: Partial<ThemeScrollbarCss>);
}
```

### theme

##### ITheme

```typescript
/**Theme Template Interface */
interface ITheme {
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
```

##### ThemeOptions

```typescript
/**Theme Installation Options. */
interface ThemeOptions {
    debug?: {
        ignoreCannotBeModified?: boolean;
    };
    localStorageKey?: string;
    log?: {
        change?: boolean;
        update?: boolean;
        save?: boolean;
        init?: boolean;
        setTheme?: boolean;
    };
}
```

##### Theme

```typescript
class Theme<Themes extends IThemes<ITheme>, Theme extends Themes[keyof Themes]> {
    private _currentTheme;
    private _themes;
    private _debug;
    private _styleSheets;
    private _log;
    private localStorageKey;
    constructor(themes: Themes, defaultTheme: keyof Themes, options?: ThemeOptions);
    /**Change/Get any Theme */
    Themes: {
        /**Gets a theme. */
        get: (theme?: keyof Themes | undefined) => Themes[keyof Themes];
        /**Gets a property of a theme. */
        getProperty: <T extends keyof Themes[keyof Themes]>(property: T, theme?: keyof Themes | undefined) => Themes[keyof Themes][T];
        /**Gets a property of a property of a theme */
        getSubProp: <T_1 extends Theme, K extends "data" | "colors" | "fonts" | "defaults", J extends keyof T_1[K]>(property: K, key: J, theme?: keyof Themes | undefined) => any;
        /**Sets a theme. */
        set: (value: Theme, theme?: keyof Themes | undefined) => void;
        /**Sets a property of a theme. */
        setProperty: <T_2 extends Theme, K_1 extends keyof T_2>(property: K_1, value: T_2[K_1], theme?: keyof Themes | undefined) => void;
        /**Sets a property of a property of a theme. */
        setSubProperty: <T_3 extends Theme, K_2 extends "data" | "colors" | "fonts" | "defaults", J_1 extends keyof T_3[K_2]>(property: K_2, key: J_1, value: T_3[K_2][J_1], theme?: keyof Themes | undefined) => void;
        /**current theme name (key) */
        key: () => keyof Themes;
        /**theme names (keys)*/
        keys: () => (keyof Themes)[];
    };
    /**Get color or font class name*/
    Class: {
        color: (color: keyof Theme['colors'], property: ClassProperty, selector?: "hover" | "active" | "after" | "before" | "focus" | "placeholder" | "placeholder-hover" | "placeholder-focus" | undefined) => string;
        font: (font: keyof Theme['fonts']) => string;
    };
    /**Sets the Current Theme. */
    SetTheme(theme: keyof Themes): void;
    /** Updates the css classes with the current theme. */
    Update(): void;
    private updateColors;
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
