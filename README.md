## S.Theme

<span id="DOC_GENERATION_MARKER_0"></span>

# Docs

- **[directive](#directive)**

  - [DirectiveInputBase](#directiveinputbase)
  - [VThemeDirectiveInput](#vthemedirectiveinput)

- **[extraFunctions](#extrafunctions)**

  - [ThemeTransition](#themetransition)

- **[helpers](#helpers)**

  - [VThemeLoaderColors](#vthemeloadercolors)
  - [VThemeLoaderCss](#vthemeloadercss)
  - [VThemeLoader](#vthemeloader)
  - [VThemeRouterLink](#vthemerouterlink)
  - [VThemeScrollbar](#vthemescrollbar)
  - [VThemeColor](#vthemecolor)

- **[index](#index)**

  - [ThemeController](#themecontroller)

- **[save](#save)**

  - [SaveTheme](#savetheme)

- **[store](#store)**

  - [Color](#color)
  - [ITheme](#itheme)
  - [ThemeOptions](#themeoptions)

- **[update](#update)**

  - [UpdateTheme](#updatetheme)
  - [GetColor](#getcolor)
  - [GetOptions](#getoptions)

### directive

##### DirectiveInputBase

```typescript
interface DirectiveInputBase {
  background: string;
  color: string;
  fill: string;
  border: string;
}
```

##### VThemeDirectiveInput

```typescript
interface VThemeDirectiveInput extends DirectiveInputBase {
  isImage: boolean;
  hover: DirectiveInputBase;
  focus: DirectiveInputBase;
  active: DirectiveInputBase;
  after: DirectiveInputBase;
  before: DirectiveInputBase;
  font: string;
  placeholder: {
    color: string;
    hover: string;
    focus: string;
  };
  shadow: boolean | 'sm' | 'lg' | 'strong';
  update:
    | Array<{
        type: 'shadow' | 'color' | 'background' | 'fill' | 'border' | 'hover' | 'before' | 'after';
        value: string | DirectiveInputBase;
      }>
    | true;
}
```

### extraFunctions

##### ThemeTransition

```typescript
function ThemeTransition(): void;
```

### helpers

##### VThemeLoaderColors

```typescript
interface VThemeLoaderColors {
  /**
   * Loader primary color in Css color format, `#35a` etc.
   */
  primary: string;
  /**
   * Loader accent color in Css color format, `#35a` etc.
   */
  accent: string;
}
```

##### VThemeLoaderCss

```typescript
interface VThemeLoaderCss {
  /**
   * Loader width in Css unit format, `1px` | `1rem` etc.
   */
  width: string;
  /**
   * Loader height in Css unit format, `1px` | `1rem` etc.
   */
  height: string;
  /**
   * Loader rotation speed in Css unit format, `1s` | `100ms` etc.
   */
  speed: string;
  /**
   * Loader margin in Css unit format, `1px` | `1rem` etc.
   */
  margin: string;
  /**
   * Loader border width in Css unit format, `1px` | `1rem` etc.
   */
  borderWidth: string;
}
```

##### VThemeLoader

```typescript
class VThemeLoader extends VThemeBaseHelper<VThemeLoaderColors> {
  width: string;
  height: string;
  speed: string;
  margin: string;
  borderWidth: string;
  constructor(options?: Partial<VThemeLoaderColors>, cssOptions?: Partial<VThemeLoaderCss>);
}
```

##### VThemeRouterLink

```typescript
class VThemeRouterLink extends VThemeBaseHelper<VThemeRouterLinkOptions> {
  constructor(options?: Partial<VThemeRouterLinkOptions>);
}
```

##### VThemeScrollbar

```typescript
class VThemeScrollbar {
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
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  width: string;
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  height: string;
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  radius: string;
  constructor(
    /**
     * Scrollbar track color in Css color format, `#35a` etc.
     */
    track: string,
    /**
     * Scrollbar thumb color in Css color format, `#35a` etc.
     */
    thumb: string,
    /**
     * Scrollbar thumb hover color in Css color format, `#35a` etc.
     */
    thumbHover: string,
    options?: {
      width?: number | string;
      height?: number | string;
      radius?: number | string;
    }
  );
}
```

##### VThemeColor

```typescript
class VThemeColor {
  value: string;
  options: VThemeColorOptions;
  constructor(
    /**
     * Color value in Css color format, `#35a` etc.
     */
    color: string,
    /**
     * Settings, fill is false by Default.
     */
    options?: VThemeColorOptions
  );
}
```

### index

##### ThemeController

```typescript
/**
 * TODO
 */
class ThemeController {
  static store: ThemeStore;
  static Init(options?: ThemeOptions): void;
}
```

### save

##### SaveTheme

```typescript
/**
 * Saves the Theme to local Storage.
 */
function SaveTheme(): void;
```

### store

##### Color

```typescript
type Color = VThemeColor | string;
```

##### ITheme

```typescript
/**
 * TODO
 */
interface ITheme {
  name: string;
  /**
   * If true the theme will be saved when the `SaveTheme` function gets called.
   */
  canBeModified: boolean;
  /**
   * Theme Colors
   */
  colors: {
    [key: string]: Color;
  };
  /**
   * Theme Fonts (font-family in css)
   */
  fonts: {
    [key: string]: string;
  };
  defaults: {
    /**
     * Default Text Color, Note the Color has to be in the theme colors.
     */
    color: string;
    /**
     * Default Background Color, Note the Color has to be in the theme colors.
     */
    background: string;
    /**
     * Default Font Family, Note the font has to be in the theme fonts.
     */
    font: string;
  };
  invertImageIcon: boolean;
  shadow?: {
    color: Color;
  };
  data?: {
    [key: string]: any;
  };
  scrollBar?: VThemeScrollbar;
  loader?: VThemeLoader;
  routerLink?: VThemeRouterLink;
}
```

##### ThemeOptions

```typescript
/**
 * Vtheme Installation Options.
 */
interface ThemeOptions {
  defaultTheme: string;
  themes: {
    [name: string]: ITheme;
  };
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

### update

##### UpdateTheme

```typescript
/**
 * Updates the Dom with the current theme based on the given options.
 * only updates the colors if no options are provided.
 */
function UpdateTheme(options?: UpdateThemeOptions | boolean): void;
```

##### GetColor

```typescript
function GetColor(input: string | VThemeColor): string;
```

##### GetOptions

```typescript
function GetOptions(input: string | VThemeColor): VThemeColorOptions;
```

_Generated With_ **[ts-doc-gen](https://www.npmjs.com/package/ts-doc-gen)**
<span id="DOC_GENERATION_MARKER_1"></span>
