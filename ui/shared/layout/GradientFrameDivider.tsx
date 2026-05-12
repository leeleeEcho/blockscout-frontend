import { Box, type BoxProps, useToken } from '@chakra-ui/react';
import * as React from 'react';

export interface GradientFrameDividerProps extends Omit<BoxProps, 'children'> {
  axis: 'horizontal' | 'vertical';
}

/** 1px 渐变分割线：中间为 text.highlight，两端透明（AxBlade / Figma「线条说明」） */
export function GradientFrameDivider({ axis, ...rest }: GradientFrameDividerProps) {
  const [ stop ] = useToken('colors', 'text.highlight');
  const gradient = React.useMemo(() => {
    const c = stop ?? '#00664E';
    return axis === 'vertical' ?
      `linear-gradient(180deg, transparent 10%, ${ c } 50%, transparent 90%)` :
      `linear-gradient(90deg, transparent 10%, ${ c } 50%, transparent 90%)`;
  }, [ axis, stop ]);

  return (
    <Box
      aria-hidden
      flexShrink={ 0 }
      pointerEvents="none"
      bgImage={ gradient }
      bgRepeat="no-repeat"
      bgSize="100% 100%"
      { ...(axis === 'vertical' ? { w: '1px', alignSelf: 'stretch', minH: '0' } : { h: '1px', w: '100%' }) }
      { ...rest }
    />
  );
}
