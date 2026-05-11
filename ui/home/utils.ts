import type { ReactElement } from 'react';

import type { HomeStatsWidgetId } from 'types/homepage';

import config from 'configs/app';
import type { Props as StatsWidgetProps } from 'ui/shared/stats/StatsWidget';

export type HomeStatsComponentItem = { id: HomeStatsWidgetId; component: ReactElement };
export type HomeStatsWidgetItem = StatsWidgetProps & { id: HomeStatsWidgetId; component?: undefined };

export type HomeStatsItem = HomeStatsComponentItem | HomeStatsWidgetItem;

export const homeStatsWidgetCommonStyles = {
  _odd: {
    _last: {
      gridColumn: 'span 2',
    },
  },
} as const;

/** 首页 Latest blocks / Latest txns 底部「View all …」：与上方列表同宽，描边与文字同色（currentColor） */
export const homeViewAllFooterLinkProps = {
  textStyle: 'sm',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '100%',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'currentColor',
  borderRadius: 'base',
  px: 3,
  py: 1,
} as const;

export const isHomeStatsItemEnabled = (item: { id: HomeStatsWidgetId }) => config.UI.homepage.stats.includes(item.id);

export const sortHomeStatsItems = (a: { id: HomeStatsWidgetId }, b: { id: HomeStatsWidgetId }) => {
  const indexA = config.UI.homepage.stats.indexOf(a.id);
  const indexB = config.UI.homepage.stats.indexOf(b.id);
  if (indexA > indexB) {
    return 1;
  }
  if (indexA < indexB) {
    return -1;
  }
  return 0;
};
