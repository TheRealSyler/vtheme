import { Log, LogS, LogSingle } from 'suf-log';

export const colors = {
  property: '#6af',
  key: '#0af',
  theme: '#DCDCAA',
  value: '#2Ef9a0',
  default: '#9CDCFE',
  warning: '#f41',
  bg: '#1b0a1baa',
  themeTag: '#CE9178',
};
const sPadding = '0.7rem';
const padding = `${sPadding} 0`;

const BorderRadius = '5px';
const fontSize = '1.2rem';

const themeTag = '(theme)';
const themesTag = '(themes)';

const start = (color: StyleType = 'default') => ({
  background: colors.bg,
  display: 'inline-block',
  'font-size': fontSize,
  color: colors[color],
  padding: padding,
  'padding-left': sPadding,
  'border-top-left-radius': BorderRadius,
  'border-bottom-left-radius': BorderRadius,
});

const one = (color: StyleType = 'default') => ({
  background: colors.bg,
  display: 'inline-block',
  'font-size': fontSize,
  color: colors[color],
  padding: sPadding,
  'padding-left': '1rem',
  'padding-right': '1rem',
  'border-radius': BorderRadius,
});

type StyleType = keyof typeof colors;

const mid = (color: StyleType = 'default') => {
  return {
    background: colors.bg,
    display: 'inline-block',
    'font-size': fontSize,
    padding: padding,
    color: colors[color],
  };
};
const end = (color: StyleType) => {
  return {
    background: colors.bg,
    padding: padding,
    display: 'inline-block',
    color: colors[color],
    'font-size': fontSize,
    'padding-right': '1rem',
    'border-top-right-radius': BorderRadius,
    'border-bottom-right-radius': BorderRadius,
  };
};

const styles = {
  updateOrSaveOrSet: [start(), mid('theme'), end('themeTag')],
  setTheme: [start(), mid('theme'), mid('themeTag'), mid(), end('value')],
  setSubProp: [
    start(),
    mid('theme'),
    mid('themeTag'),
    mid(),
    mid('property'),
    mid(),
    mid('key'),
    mid(),
    end('value'),
  ],
  setKey: [start(), mid('property'), mid('default'), mid('property'), mid('default'), end('value')],
  setThemeProp: [
    start(),
    mid('theme'),
    mid('themeTag'),
    mid(),
    mid('property'),
    mid(),
    end('value'),
  ],
  get: [start(), mid('theme'), end('themeTag')],
  getProp: [start(), mid('theme'), mid('themeTag'), mid(), end('property')],
  getSubProp: [start(), mid('theme'), mid('themeTag'), mid(), mid('property'), mid(), end('key')],
  setCurrentTheme: [start(), mid('key'), mid(), mid('theme'), end('themeTag')],
};

export function LogUpdate(theme: string) {
  LogS(styles.updateOrSaveOrSet, 'Updated using:', theme, themeTag);
}
export function LogSave(themes: string[]) {
  if (themes.length === 0) {
    LogSingle('Saved (no themes marked as canBeModified)', one());
    return;
  }

  if (themes.length === 1) {
    LogS(styles.updateOrSaveOrSet, 'Saved:', themes[0].toString(), themeTag);
    return;
  }

  LogS(styles.updateOrSaveOrSet, 'Saved:', themes.join(', '), themesTag);
}

export function LogCannotBeModifiedWarning(theme: any) {
  Log(
    {
      message: theme,
      style: { ...start('theme'), 'font-weight': 'bold' },
    },
    {
      message: themeTag,
      style: { ...mid('themeTag'), 'font-weight': 'bold' },
    },
    {
      message: 'cannot be modified!',
      style: { ...end('warning'), 'font-weight': 'bold' },
    }
  );
}

export function LogWarning(message: string, from?: string) {
  if (from) {
    Log(
      { message: from, style: { ...start(), 'font-weight': 'bold' } },
      {
        message,
        style: {
          ...end('warning'),
          'font-weight': 'bold',
        },
      }
    );
    return;
  }
  Log({
    message,
    style: {
      ...one('warning'),
      'font-weight': 'bold',
    },
  });
}

export function LogSetCurrentTheme(value: any) {
  LogS(styles.setCurrentTheme, 'Set:', 'current theme', 'to', value, themeTag);
}
export function LogSetTheme(theme: string, value: any) {
  LogS(styles.setTheme, 'Set:', theme, themeTag, 'to', value);
}
export function LogSetProp(property: string, theme: any, value: any) {
  LogS(styles.setThemeProp, 'Set:', theme, themeTag, '>', property, 'to', value);
}
export function LogSetSubProp(property: string, theme: any, key: any, value: any) {
  LogS(styles.setSubProp, 'Set:', theme, themeTag, '>', property, '>', key, 'to', value);
}

export function LogGet(theme: any) {
  LogS(styles.get, 'Get:', theme, themeTag);
}
export function LogGetProp(theme: any, prop: any) {
  LogS(styles.getProp, 'Get:', theme, themeTag, '>', prop);
}
export function LogGetSubProp(theme: any, prop: any, key: any) {
  LogS(styles.getSubProp, 'Get:', theme, themeTag, '>', prop, '>', key);
}

export function LogInit() {
  LogSingle('vTheme Initialized!', {
    background: colors.bg,
    padding: '3rem',
    display: 'inline-block',
    'border-radius': '20px',
    'font-size': '4rem',
    'font-weight': 'bold',
    'text-align': 'center',
    color: 'white',
    'text-shadow': '1.5px 1.5px 1px red, -1.5px -1.5px 1px blue',
  });
}
