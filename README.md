## S.Theme

<span id="BADGE_GENERATION_MARKER_0"></span>
[![npmV](https://img.shields.io/npm/v/vtheme?color=green)](https://www.npmjs.com/package/vtheme) [![min](https://img.shields.io/bundlephobia/min/vtheme)](https://bundlephobia.com/result?p=vtheme) [![install](https://badgen.net/packagephobia/install/vtheme)](https://packagephobia.now.sh/result?p=vtheme) [![githubLastCommit](https://img.shields.io/github/last-commit/TheRealSyler/vtheme)](https://github.com/TheRealSyler/vtheme)
<span id="BADGE_GENERATION_MARKER_1"></span>

<span id="DOC_GENERATION_MARKER_0"></span>

# Docs

- **[extraFunctions](#extrafunctions)**

  - [ThemeTransitionOptions](#themetransitionoptions)
  - [ThemeTransition](#themetransition)

- **[interfaces](#interfaces)**

  - [ThemeScrollbar](#themescrollbar)
  - [ITheme](#itheme)
  - [ThemeOptions](#themeoptions)

- **[theme](#theme)**

  - [vTheme](#vtheme)

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

### interfaces

##### ThemeScrollbar

```typescript
interface ThemeScrollbar {
    /**
     * Scrollbar width in Css unit format, `1px` | `1rem` etc.
     * (chrome based only)
     */
    width?: string | number;
    /**
     * Scrollbar width in Css unit format, `1px` | `1rem` etc.
     * (chrome based only)
     */
    height?: string | number;
    /**
     * Scrollbar width in Css unit format, `1px` | `1rem` etc.
     * (chrome based only)
     */
    radius?: string | number;
    /**
     * Scrollbar track color in Css color format, `#35a` etc.
     *
     * (chrome, *firefox) *thumb and track properties need to be set.
     */
    track?: string;
    /**
     * Scrollbar thumb color in Css color format, `#35a` etc.
     *
     * (chrome, *firefox) *thumb and track properties need to be set.
     */
    thumb?: string;
    /**
     * Scrollbar thumb hover color in Css color format, `#35a` etc.
     * (chrome based only)
     */
    thumbHover?: string;
}
```

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
    log?: {
        /**Log all events*/
        all?: boolean;
        set?: boolean;
        get?: boolean;
        update?: boolean;
        save?: boolean;
        init?: boolean;
    };
}
```

### theme

##### vTheme

```typescript
class vTheme<Themes extends IThemes, Theme extends Themes[keyof Themes]> {
    private _currentTheme;
    private _themes;
    private _debug;
    private _styleSheets;
    private _log;
    private _localStorageKey;
    constructor(themes: Themes, defaultTheme: keyof Themes, options?: ThemeOptions);
    /**Gets a theme. */
    get(theme?: keyof Themes): Themes[keyof Themes];
    /**Gets a property of a theme. */
    getProperty<T extends keyof Themes[keyof Themes]>(property: T, theme?: keyof Themes): Themes[keyof Themes][T];
    /**Gets a property of a property of a theme */
    getSubProp<T extends Theme, K extends keyof Pick<T, 'colors' | 'fonts' | 'data'>, J extends keyof T[K]>(property: K, key: J, theme?: keyof Themes): Themes[keyof Themes][K][J];
    /**Sets a theme. */
    set(value: Theme & ITheme, theme?: keyof Themes): void;
    /**Sets a property of a theme. */
    setProperty<T extends Theme, K extends keyof T>(property: K, value: T[K], theme?: keyof Themes): void;
    /**Sets a property of a property of a theme. */
    setSubProperty<T extends Theme, K extends keyof Pick<T, 'colors' | 'fonts' | 'data'>, J extends keyof T[K]>(property: K, key: J, value: T[K][J], theme?: keyof Themes): void;
    /**current theme name (key) */
    currentTheme(): keyof Themes;
    /**theme names (keys)*/
    themes(): (keyof Themes)[];
    /**get color class name. */
    color(color: keyof Theme['colors'], property: ClassProperty, selector?: ClassSelector): string;
    /**Get font class name. */
    font(font: keyof Theme['fonts']): string;
    /**Sets the Current Theme. */
    SetCurrentTheme(theme: keyof Themes): void;
    /** Updates the css classes with the current theme. */
    Update(): void;
    /** Saves the Themes to local Storage. */
    Save(): void;
    private _themeKey;
    private _getThemeFromLocalStorage;
    private _disableLog;
}
```

_Generated with_ **[suf-cli](https://www.npmjs.com/package/suf-cli)**
<span id="DOC_GENERATION_MARKER_1"></span>

<span id="LICENSE_GENERATION_MARKER_0"></span>
Copyright (c) 2019 Leonard Grosoli Licensed under the MIT license.
<span id="LICENSE_GENERATION_MARKER_1"></span>
