import { useToken } from '@chakra-ui/react';
import * as d3 from 'd3';
import React from 'react';

import { ChartResolution, CHART_RESOLUTION_LABELS } from '../../../types';

import { useColorModeValue } from '../../../../../chakra/color-mode';
import LineChartTooltipRow from './LineChartTooltipRow';

const CLASS_NAME = 'LineChartTooltip__title';

const LineChartTooltipTitle = ({ resolution = ChartResolution.DAY }: { resolution?: ChartResolution }) => {
  const [ titleColor ] = useToken('colors', useColorModeValue('orange.600', 'yellow.300'));
  const resolutionTitle = CHART_RESOLUTION_LABELS.find(({ id }) => id === resolution)?.title || 'day';

  return (
    <LineChartTooltipRow lineNum={ 0 }>
      <text
        className={ CLASS_NAME }
        transform="translate(0,0)"
        fill={ titleColor }
        opacity={ 0 }
        dominantBaseline="hanging"
      >
        { `Incomplete ${ resolutionTitle.toLowerCase() }` }
      </text>
    </LineChartTooltipRow>
  );
};

export default React.memo(LineChartTooltipTitle);

export function useRenderTitle(ref: React.RefObject<SVGGElement | null>) {
  return React.useCallback((isVisible: boolean) => {
    d3.select(ref.current)
      .select(`.${ CLASS_NAME }`)
      .attr('opacity', isVisible ? 1 : 0);
  }, [ ref ]);
}
