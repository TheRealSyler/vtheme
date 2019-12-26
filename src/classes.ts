/**Placeholder only works with the color property */
export type ClassSelector =
  | 'hover'
  | 'active'
  | 'after'
  | 'before'
  | 'focus'
  | 'placeholder'
  | 'placeholder-hover'
  | 'placeholder-focus';

export type ClassProperty = 'fill' | 'background' | 'color' | 'border-color';

export function convertClassProperty(property: ClassProperty) {
  switch (property) {
    case 'background':
      return 'bg-';
    case 'border-color':
      return 'b-';
    case 'color':
      return 'c-';
    case 'fill':
      return 'f-';
  }
}

export function convertClassSelector(selector?: ClassSelector) {
  if (selector) {
    switch (selector) {
      case 'hover':
        return 'h-';
      case 'focus':
        return 'f-';
      case 'active':
        return 'a-';
      case 'before':
        return 'bf';
      case 'after':
        return 'af-';
      case 'placeholder':
        return 'p-';
      case 'placeholder-hover':
        return 'p-h-';
      case 'placeholder-focus':
        return 'p-f-';
    }
  }
  return '';
}
