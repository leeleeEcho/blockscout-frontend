import React from 'react';

import capitalizeFirstLetter from 'client/shared/text/capitalize-first-letter';

import type { BadgeProps } from 'toolkit/chakra/badge';
import { Badge } from 'toolkit/chakra/badge';
import { Tooltip } from 'toolkit/chakra/tooltip';
import type { IconName } from 'ui/shared/IconSvg';
import IconSvg from 'ui/shared/IconSvg';

export type StatusTagType = 'ok' | 'error' | 'pending';

export interface Props extends BadgeProps {
  type: 'ok' | 'error' | 'pending';
  text?: string;
  errorText?: string | null;
  mode?: 'compact' | 'full';

  /**
   * `solid`：列表状态标签（Figma `108:9249` Liststate_tag）
   * Success 浅色：底 `green.500` + 字/图标 Secondary `green.700`（#00664E）；深色：底 `green.800` + 字/图标 `green.500`
   */
  visual?: 'default' | 'solid';
}

const SOLID_BADGE: Record<StatusTagType, { bg: BadgeProps['bg']; color: BadgeProps['color'] }> = {
  ok: {
    bg: { base: 'green.500', _dark: 'green.800' },
    color: { base: 'green.700', _dark: 'green.500' },
  },
  error: {
    bg: { base: 'red.600', _dark: 'red.700' },
    color: 'white',
  },
  pending: {
    bg: { base: 'gray.600', _dark: 'gray.700' },
    color: 'white',
  },
};

/** Figma AxBlade Liststate_tag / Success（node 108:9249, dev mode） */
const OK_SOLID_TAG_PROPS = {
  borderRadius: '4px',
  gap: '1',
  pl: '6px',
  pr: '8px',
  py: '0px',
  minH: '18px',
  fontSize: '12px',
  lineHeight: '18px',
  letterSpacing: '0.5px',
  fontWeight: '300',
  fontFamily: 'body',
} as const;

const StatusTag = ({ type, text, errorText, mode = 'full', visual = 'default', ...rest }: Props) => {
  let icon: IconName;
  let colorPalette: BadgeProps['colorPalette'];

  switch (type) {
    case 'ok':
      icon = 'status/success';
      colorPalette = 'green';
      break;
    case 'error':
      icon = 'status/error';
      colorPalette = 'red';
      break;
    case 'pending':
      icon = 'status/pending';
      colorPalette = 'gray';
      break;
  }

  const isOkSolid = visual === 'solid' && type === 'ok';
  const iconBoxSize = isOkSolid ? '12px' : 2.5;
  const iconElement = <IconSvg name={ icon } boxSize={ iconBoxSize } display={ text ? 'inline-block' : 'block' }/>;
  const capitalizedText = text ? capitalizeFirstLetter(text) : undefined;

  const solid = visual === 'solid' ? SOLID_BADGE[type] : undefined;
  const badgePaletteProps = (() => {
    if (!solid) {
      return { colorPalette };
    }

    if (type === 'ok') {
      return {
        bg: solid.bg,
        color: solid.color,
        ...OK_SOLID_TAG_PROPS,
      };
    }

    return {
      bg: solid.bg,
      color: solid.color,
      borderRadius: 'full',
      px: '2.5',
      py: '0.5',
    };
  })();

  if (mode === 'compact') {
    const tooltipContent = errorText || capitalizedText;
    return (
      <Tooltip content={ tooltipContent } disabled={ !tooltipContent }>
        <Badge { ...badgePaletteProps } startElement={ iconElement } px={ solid ? undefined : '7px' } { ...rest }/>
      </Tooltip>
    );
  }

  if (!text) {
    return (
      <Badge { ...badgePaletteProps } { ...rest }>
        { iconElement }
      </Badge>
    );
  }

  return (
    <Tooltip content={ errorText } disabled={ !errorText }>
      <Badge { ...badgePaletteProps } startElement={ iconElement } { ...rest }>
        { capitalizedText }
      </Badge>
    </Tooltip>
  );
};

export default StatusTag;
