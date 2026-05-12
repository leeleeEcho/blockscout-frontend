import type { HTMLChakraProps } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import { clamp } from 'es-toolkit';
import React from 'react';

import { Skeleton } from 'toolkit/chakra/skeleton';

interface Props extends Omit<HTMLChakraProps<'div'>, 'direction'> {
  value: number;
  colorScheme?: 'green' | 'gray';

  /** `forest`：深绿进度 + 浅灰轨道（附加信息 Popover 等） */
  barStyle?: 'brand' | 'forest';
  isLoading?: boolean;
}

const WIDTH = 50;

const Utilization = ({ value, colorScheme = 'green', barStyle = 'brand', isLoading, ...rest }: Props, ref: React.Ref<HTMLDivElement>) => {
  const valueString = (clamp(value * 100 || 0, 0, 100)).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '%';
  const isForest = barStyle === 'forest' && colorScheme === 'green';

  let fillColor: string;
  if (isForest) {
    fillColor = 'green.700';
  } else if (colorScheme === 'gray') {
    fillColor = 'text.secondary';
  } else {
    fillColor = 'green.500';
  }

  const trackBg = isForest ?
    { _light: 'gray.200', _dark: 'whiteAlpha.200' } :
    { _light: 'blackAlpha.200', _dark: 'whiteAlpha.200' };
  const labelColor = fillColor;

  return (
    <Flex alignItems="center" columnGap={ 2 } { ...rest } ref={ ref }>
      <Skeleton loading={ isLoading } w={ `${ WIDTH }px` } h="4px" borderRadius="full" overflow="hidden">
        <Box bg={ trackBg } h="100%">
          <Box bg={ fillColor } w={ valueString } h="100%"/>
        </Box>
      </Skeleton>
      <Skeleton loading={ isLoading } color={ labelColor } fontWeight="bold">
        <span>
          { valueString }
        </span>
      </Skeleton>
    </Flex>
  );
};

export default React.memo(React.forwardRef(Utilization));
