export const consoleColors = {
  property: '#6af',
  theme: '#fa9',
  value: '#0f0',
  default: 'white',
  bg: '#1b0a1baa'
};
const consoleLogBg = `background: ${consoleColors.bg}; padding: 1rem 0;`;
const consoleLogBgFirst = `
background: ${consoleColors.bg};
padding: 1rem 0;
padding-left: 1rem;
border-top-left-radius: 5px;
border-bottom-left-radius: 5px;`;
const consoleLogBgLast = `
background: ${consoleColors.bg};
padding: 1rem 0;
padding-right: 1rem;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;`;

export function ConsoleLog(type: string, items: string, currentTheme?: any) {
  console.log(
    `%cTheme${currentTheme ? ` %c${currentTheme}%c` : 's'} ${type}:%c${items} `,
    `color: ${consoleColors.default}; ${consoleLogBgFirst}`,
    `color: ${currentTheme ? consoleColors.theme : consoleColors.property}; ${
      currentTheme ? consoleLogBg : consoleLogBgLast
    }`,
    currentTheme ? `color: ${consoleColors.default}; ${consoleLogBg}` : '',
    currentTheme ? `color: ${consoleColors.property}; ${consoleLogBgLast}` : ''
  );
}
export function ThemeCannotBeModifiedWarning(theme: any) {
  console.warn(`Theme "${theme}" cannot Be modified`);
}

export function ThemeLogMutation(inp: { property: any; value: any; key?: string; theme?: any }) {
  console.log(
    `%cChanged property %c${inp.property}%c ${inp.theme ? `of Theme %c${inp.theme}%c ` : ''}${
      inp.key ? `with key %c${inp.key} ` : ''
    }to: %c${inp.value}`,
    `color: ${consoleColors.default}; ${consoleLogBgFirst}`,
    `color: ${consoleColors.property}; ${consoleLogBg}`,
    `color: ${consoleColors.default}; ${consoleLogBg}`,
    `${inp.theme ? `color: ${consoleColors.theme};` : `color: ${consoleColors.value};`} ${
      inp.key ? consoleLogBg : consoleLogBgLast
    }`,
    inp.key ? `color: ${consoleColors.property}; ${consoleLogBg}` : '',
    inp.key ? `color: ${consoleColors.default}; ${consoleLogBg}` : '',
    inp.theme ? `color: ${consoleColors.value}; ${consoleLogBgLast}` : ''
  );
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
