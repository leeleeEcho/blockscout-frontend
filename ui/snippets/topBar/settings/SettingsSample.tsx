import { Box, Center } from '@chakra-ui/react';
import React from 'react';

import { Tooltip } from 'toolkit/chakra/tooltip';

import { ColorThemeIconMoon, ColorThemeIconSun } from './SettingsColorThemeIcons';

export type SettingsSampleAppearance = 'swatch' | 'theme';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  isActive: boolean;
  bg: string;
  value: string;
  label: string;

  /** 主题切换：圆角色块 + 月亮/太阳图标（与地址 identicon 色块区分） */
  appearance?: SettingsSampleAppearance;

  /** `appearance="theme"` 时必填 */
  themeIcon?: 'moon' | 'sun';
}

const THEME_TILE = '40px';
const THEME_RADIUS = '10px';

const SettingsSample = ({
  label,
  value,
  bg,
  onClick,
  isActive,
  appearance = 'swatch',
  themeIcon,
}: Props) => {
  const bgColor = { base: 'white', _dark: 'gray.900' };
  const activeBgColor = { base: 'green.50', _dark: 'whiteAlpha.200' };
  const activeBorderColor = 'text.highlight';

  const isTheme = appearance === 'theme';

  const inner = isTheme ? (
    <Center
      bg={ bg }
      boxSize={ THEME_TILE }
      borderRadius={ THEME_RADIUS }
      borderWidth="1px"
      borderColor={ themeIcon === 'sun' ? { base: 'gray.200', _dark: 'whiteAlpha.200' } : 'transparent' }
      position="relative"
      cursor="pointer"
    >
      { themeIcon === 'moon' ? (
        <Box color="green.500" lineHeight={ 0 }>
          <ColorThemeIconMoon/>
        </Box>
      ) : (
        <Box color="rgba(0, 0, 0, 0.75)" lineHeight={ 0 }>
          <ColorThemeIconSun/>
        </Box>
      ) }
    </Center>
  ) : (
    <Box
      bg={ bg }
      boxSize="22px"
      borderRadius="full"
      borderWidth="1px"
      borderColor={ isActive ? activeBgColor : bgColor }
      position="relative"
      cursor="pointer"
    />
  );

  return (
    <Box
      p="9px"
      bgColor={ isActive ? activeBgColor : 'transparent' }
      borderRadius={ isTheme ? THEME_RADIUS : 'base' }
    >
      <Tooltip content={ label }>
        <Box
          position="relative"
          cursor="pointer"
          _before={{
            position: 'absolute',
            display: 'block',
            boxSizing: 'content-box',
            content: '""',
            top: '-3px',
            left: '-3px',
            width: 'calc(100% + 2px)',
            height: 'calc(100% + 2px)',
            borderStyle: 'solid',
            borderRadius: isTheme ? THEME_RADIUS : 'full',
            borderWidth: '2px',
            borderColor: isActive ? activeBorderColor : 'transparent',
          }}
          _hover={{
            _before: {
              borderColor: isActive ? activeBorderColor : 'hover',
            },
          }}
          data-value={ value }
          onClick={ onClick }
        >
          { inner }
        </Box>
      </Tooltip>
    </Box>
  );
};

export default React.memo(SettingsSample);
