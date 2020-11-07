import { ITheme } from '../interfaces';
import { genBlock, genProp } from './genUtils';

export function genScrollbarCss(scrollBar: ITheme['scrollBar']) {
  if (!scrollBar) return '';

  const { width, height, track, radius, thumb, thumbHover } = scrollBar;
  const content =
    genBlock(
      '*::-webkit-scrollbar',
      !!height || !!width,
      genProp('width', width),
      genProp('height', height)
    ) +
    genBlock('*::-webkit-scrollbar-track', !!track, genProp('background-color', track)) +
    genBlock(
      '*::-webkit-scrollbar-thumb',
      !!thumb || !!radius,
      genProp('background-color', thumb),
      genProp('border-radius', radius)
    ) +
    genBlock(
      '*::-webkit-scrollbar-thumb:hover',
      !!thumbHover,
      genProp('background-color', thumbHover)
    );
  return content;
}
