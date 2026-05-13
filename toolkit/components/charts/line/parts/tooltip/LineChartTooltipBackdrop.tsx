import { useToken } from '@chakra-ui/react';
import * as d3 from 'd3';
import React from 'react';

import { calculateContainerHeight } from './utils';

const CLASS_NAME = 'LineChartTooltip__backdrop';

const LineChartTooltipBackdrop = () => {
  const [ bgColor ] = useToken('colors', 'popover.bg');
  const [ strokeColor ] = useToken('colors', 'border.card');

  return (
    <rect
      className={ CLASS_NAME }
      rx={ 4 }
      ry={ 4 }
      fill={ bgColor }
      stroke={ strokeColor }
      strokeWidth={ 1 }
    />
  );
};

export default React.memo(LineChartTooltipBackdrop);

interface UseRenderBackdropParams {
  seriesNum: number;
  transitionDuration: number | null;
}

export function useRenderBackdrop(ref: React.RefObject<SVGGElement | null>, { seriesNum, transitionDuration }: UseRenderBackdropParams) {
  return React.useCallback((width: number, isIncompleteData: boolean) => {
    const height = calculateContainerHeight(seriesNum, isIncompleteData);

    if (transitionDuration) {
      d3.select(ref.current)
        .select(`.${ CLASS_NAME }`)
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeLinear)
        .attr('width', width)
        .attr('height', height);
    } else {
      d3.select(ref.current)
        .select(`.${ CLASS_NAME }`)
        .attr('width', width)
        .attr('height', height);
    }
  }, [ ref, seriesNum, transitionDuration ]);
}
