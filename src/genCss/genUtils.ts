export function genBlock(header: string, condition?: boolean, ...body: string[]) {
  if (condition) {
    return `${header} {
${body.filter((v) => v.length !== 0).join('\n')}
}
`;
  }
  return '';
}

export function genProp(prop: string, value?: string | number) {
  if (value) {
    return `  ${prop}: ${cssNumberToString(value)};`;
  }
  return '';
}

function cssNumberToString(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value;
}
