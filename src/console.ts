import { Log, LogS } from 'suf-log';

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
const end = (color: StyleType = 'default') => {
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
end();
const logStyles = {
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
  setCurrentTheme: [start(), mid('key'), mid(), mid('theme'), end('themeTag')],
};

export function LogUpdate(theme: string) {
  LogS(logStyles.updateOrSaveOrSet, 'Updated using:', theme, '(theme)');
}
export function LogSave(themes: string[]) {
  if (themes.length === 0) {
    Log({ message: 'Saved (no themes marked as canBeModified)', style: one() });
    return;
  }

  if (themes.length === 1) {
    LogS(logStyles.updateOrSaveOrSet, 'Saved:', themes[0].toString(), '(theme)');
    return;
  }

  LogS(logStyles.updateOrSaveOrSet, 'Saved:', themes.join(', '), '(themes)');
}

export function LogCannotBeModifiedWarning(theme: any) {
  Log(
    {
      message: theme,
      style: { ...start('theme'), 'font-weight': 'bold' },
    },
    {
      message: '(theme)',
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
  LogS(logStyles.setCurrentTheme, 'Set:', 'current theme', 'to', value, '(theme)');
}
export function LogSetTheme(theme: string, value: any) {
  LogS(logStyles.setTheme, 'Set:', theme, '(theme)', 'to', value);
}
export function LogSetProp(property: string, theme: any, value: any) {
  LogS(logStyles.setThemeProp, 'Set:', theme, '(theme)', '>', property, 'to', value);
}
export function LogSetSubProp(property: string, theme: any, key: any, value: any) {
  LogS(logStyles.setSubProp, 'Set:', theme, '(theme)', '>', property, '>', key, 'to', value);
}

export function LogInit() {
  Log({
    message: 'vTheme Initialized!',
    style: {
      background: colors.bg,
      padding: '3rem',
      display: 'inline-block',
      'border-radius': '20px',
      'font-size': '4rem',
      'font-weight': 'bold',
      'text-align': 'center',
      color: 'white',
      'text-shadow': '1.5px 1.5px 1px red, -1.5px -1.5px 1px blue',
    },
  });
}
