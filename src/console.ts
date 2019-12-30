import { Logger, LoggerType } from '@sorg/log';
export const consoleColors = {
  property: '#6af',
  theme: '#fa9',
  value: '#0f0',
  default: 'white',
  bg: '#1b0a1baa'
};

const start = {
  background: consoleColors.bg,
  color: consoleColors.default,
  padding: '0.7rem 0',
  'padding-left': '0.7rem',
  'border-top-left-radius': '5px',
  'border-bottom-left-radius': '5px'
};
type StyleType = 'property' | 'value' | 'default' | 'bg' | 'theme';
const middleStyle = (type: StyleType) => {
  return {
    background: consoleColors.bg,
    padding: '0.7rem 0',
    color: consoleColors[type]
  };
};
const endStyle = (type: StyleType) => {
  return {
    background: consoleColors.bg,
    padding: '0.7rem 0',
    color: consoleColors[type],
    'padding-right': '1rem',
    'border-top-right-radius': '5px',
    'border-bottom-right-radius': '5px'
  };
};

const logger = new Logger<{
  mutationSimple: LoggerType;
  mutationAll: LoggerType;
  mutationTheme: LoggerType;
  mutationKey: LoggerType;
  setTheme: LoggerType;
  updateOrSave: LoggerType;
}>({
  mutationSimple: {
    styles: [start, middleStyle('property'), middleStyle('default'), endStyle('value')]
  },
  mutationAll: {
    styles: [
      start,
      middleStyle('property'),
      middleStyle('default'),
      middleStyle('property'),
      middleStyle('default'),
      middleStyle('theme'),
      middleStyle('default'),
      endStyle('value')
    ]
  },
  mutationKey: {
    styles: [
      start,
      middleStyle('property'),
      middleStyle('default'),
      middleStyle('property'),
      middleStyle('default'),
      endStyle('value')
    ]
  },
  mutationTheme: {
    styles: [
      start,
      middleStyle('property'),
      middleStyle('default'),
      middleStyle('theme'),
      middleStyle('default'),
      endStyle('value')
    ]
  },
  setTheme: {
    styles: [start, endStyle('theme')]
  },

  updateOrSave: {
    styles: [start, endStyle('theme')]
  }
});

export function LogUpdate(theme: string) {
  logger.Log('updateOrSave', 'Updated css with theme ', theme);
}
export function LogSave(themes: string) {
  logger.Log('updateOrSave', 'Saved themes: ', themes);
}

export function LogCannotBeModifiedWarning(theme: any) {
  console.warn(`Theme "${theme}" cannot Be modified`);
}

export function LogSetTheme(theme: string) {
  logger.Log('setTheme', 'Set Theme: ', theme);
}
export function LogMutation(data: { property: any; value: any; key?: string; theme?: any }) {
  if (data.key || data.theme) {
    if (data.key && data.theme) {
      logger.Log(
        'mutationAll',
        'Changed property ',
        data.key,
        ' of property ',
        data.property,
        ' of theme ',
        data.theme,
        ' to ',
        data.value
      );
    } else if (data.key) {
      logger.Log(
        'mutationKey',
        'Changed property ',
        data.key,
        ' of property ',
        data.property,
        ' to ',
        data.value
      );
    } else {
      logger.Log(
        'mutationTheme',
        'Changed property ',
        data.property,
        ' of theme ',
        data.theme,
        ' to ',
        data.value
      );
    }
  } else {
    logger.Log('mutationSimple', 'Changed property ', data.property, ' to ', data.value);
  }
}

export function LogInit() {
  console.log(
    '%cS.Theme Initialized',
    `
background: ${consoleColors.bg};
padding: 3rem;
border-radius: 20px;
font-size: 4rem;
font-weight: bold;
text-align: center;
color: ${consoleColors.default};
text-shadow: 1.5px 1.5px 1px red, -1.5px -1.5px 1px blue;
`
  );
}
