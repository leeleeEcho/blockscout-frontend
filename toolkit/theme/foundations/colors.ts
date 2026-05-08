import { defaultsDeep } from 'es-toolkit/compat';

import config from 'configs/app';

// AxBlade explorer palette — see docs/design/axblade-color-tokens.md & Figma AxBlade blockchain browser
const DEFAULT_THEME_COLORS = {
  bg: {
    // BG / Frame swapped vs initial AxBlade spec — page uses former Frame, panels use former BG
    primary: {
      _light: { value: '#FCFCFC' },
      _dark: { value: '#090909' },
    },
  },
  text: {
    primary: {
      _light: { value: '#111111' },
      _dark: { value: '#F2F2F2' },
    },
    secondary: {
      _light: { value: '#7C8A84' },
      _dark: { value: '#97A6A0' },
    },
    highlight: {
      _light: { value: '#00664E' },
      _dark: { value: '#00FFB2' },
    },
  },
  hover: {
    _light: { value: '#00664E' },
    _dark: { value: '#33FFC4' },
  },
  selected: {
    control: {
      text: {
        _light: { value: '#003B2E' },
        _dark: { value: '#F2F2F2' },
      },
      bg: {
        _light: { value: '#B2FFE8' },
        _dark: { value: 'RGBA(255, 255, 255, 0.06)' },
      },
    },
    option: {
      bg: {
        _light: { value: '#00FFB2' },
        _dark: { value: '#00FFB2' },
      },
    },
  },
  icon: {
    primary: {
      _light: { value: '#7C8A84' },
      _dark: { value: '#97A6A0' },
    },
    secondary: {
      _light: { value: '#97A6A0' },
      _dark: { value: '#7C8A84' },
    },
  },
  button: {
    primary: {
      _light: { value: '#00FFB2' },
      _dark: { value: '#00FFB2' },
      text: {
        _light: { value: '#003B2E' },
        _dark: { value: '#003B2E' },
      },
    },
  },
  graph: {
    line: {
      _light: { value: '#00664E' },
      _dark: { value: '#00FFB2' },
    },
    gradient: {
      start: {
        _light: { value: 'rgba(0, 255, 178, 0.35)' },
        _dark: { value: 'rgba(0, 255, 178, 0.35)' },
      },
      stop: {
        _light: { value: 'rgba(0, 255, 178, 0)' },
        _dark: { value: 'rgba(0, 255, 178, 0)' },
      },
    },
  },
  navigation: {
    bg: {
      selected: {
        _light: { value: '#DEE6E3' },
        _dark: { value: '#003B2E' },
      },
    },
    text: {
      selected: {
        _light: { value: '#00664E' },
        _dark: { value: '#00FFB2' },
      },
    },
  },
  stats: {
    bg: {
      _light: { value: '#F2F2F2' },
      _dark: { value: '#111111' },
    },
  },
  topbar: {
    bg: {
      _light: { value: '#F2F2F2' },
      _dark: { value: '#111111' },
    },
  },
  tabs: {
    text: {
      // Figma Submenu_Btn: inactive label uses 50% white (dark) / 50% black (light)
      inactive: {
        _light: { value: 'rgba(0, 0, 0, 0.5)' },
        _dark: { value: 'rgba(255, 255, 255, 0.5)' },
      },
    },
  },
};

const colors = {
  // BASE COLORS
  green: {
    '50': { value: '#E6FFF9' },
    '100': { value: '#B2FFE8' },
    '200': { value: '#7FFFD4' },
    '300': { value: '#4DFFC4' },
    '400': { value: '#28E59B' },
    '500': { value: '#00FFB2' },
    '600': { value: '#00CC8E' },
    '700': { value: '#00664E' },
    '800': { value: '#003B2E' },
    '900': { value: '#001F18' },
  },
  blue: {
    '50': { value: '#EBF8FF' },
    '100': { value: '#BEE3F8' },
    '200': { value: '#90CDF4' },
    '300': { value: '#63B3ED' },
    '400': { value: '#4299E1' },
    '500': { value: '#3182CE' },
    '600': { value: '#2B6CB0' },
    '700': { value: '#2C5282' },
    '800': { value: '#2A4365' },
    '900': { value: '#1A365D' },
  },
  red: {
    '50': { value: '#FFF5F6' },
    '100': { value: '#FFE0E4' },
    '200': { value: '#FFC2CA' },
    '300': { value: '#FF9EAB' },
    '400': { value: '#FF7A8A' },
    '500': { value: '#FF6175' },
    '600': { value: '#E04A5F' },
    '700': { value: '#B83A4C' },
    '800': { value: '#8F2D3C' },
    '900': { value: '#4A1820' },
  },
  orange: {
    '50': { value: '#FFFAF0' },
    '100': { value: '#FEEBCB' },
    '200': { value: '#FBD38D' },
    '300': { value: '#F6AD55' },
    '400': { value: '#ED8936' },
    '500': { value: '#DD6B20' },
    '600': { value: '#C05621' },
    '700': { value: '#9C4221' },
    '800': { value: '#7B341E' },
    '900': { value: '#652B19' },
  },
  yellow: {
    '50': { value: '#FFFBF0' },
    '100': { value: '#FDF0D1' },
    '200': { value: '#FAE2A8' },
    '300': { value: '#F5D078' },
    '400': { value: '#EEB84A' },
    '500': { value: '#E7A71E' },
    '600': { value: '#C48C16' },
    '700': { value: '#9E7112' },
    '800': { value: '#75550E' },
    '900': { value: '#4D3809' },
  },
  gray: {
    '50': { value: '#FCFCFC' },
    '100': { value: '#DEE6E3' },
    '200': { value: '#C5D0CC' },
    '300': { value: '#97A6A0' },
    '400': { value: '#7C8A84' },
    '500': { value: '#5C6964' },
    '600': { value: '#414745' },
    '700': { value: '#2E3331' },
    '800': { value: '#1A1A1A' },
    '900': { value: '#090909' },
  },
  teal: {
    '50': { value: '#E6FFFA' },
    '100': { value: '#B2F5EA' },
    '200': { value: '#81E6D9' },
    '300': { value: '#4FD1C5' },
    '400': { value: '#38B2AC' },
    '500': { value: '#319795' },
    '600': { value: '#2C7A7B' },
    '700': { value: '#285E61' },
    '800': { value: '#234E52' },
    '900': { value: '#1D4044' },
  },
  cyan: {
    '50': { value: '#EDFDFD' },
    '100': { value: '#C4F1F9' },
    '200': { value: '#9DECF9' },
    '300': { value: '#76E4F7' },
    '400': { value: '#0BC5EA' },
    '500': { value: '#00B5D8' },
    '600': { value: '#00A3C4' },
    '700': { value: '#0987A0' },
    '800': { value: '#086F83' },
    '900': { value: '#065666' },
  },
  purple: {
    '50': { value: '#FAF5FF' },
    '100': { value: '#E9D8FD' },
    '200': { value: '#D6BCFA' },
    '300': { value: '#B794F4' },
    '400': { value: '#9F7AEA' },
    '500': { value: '#805AD5' },
    '600': { value: '#6B46C1' },
    '700': { value: '#553C9A' },
    '800': { value: '#44337A' },
    '900': { value: '#322659' },
  },
  pink: {
    '50': { value: '#FFF5F7' },
    '100': { value: '#FED7E2' },
    '200': { value: '#FBB6CE' },
    '300': { value: '#F687B3' },
    '400': { value: '#ED64A6' },
    '500': { value: '#D53F8C' },
    '600': { value: '#B83280' },
    '700': { value: '#97266D' },
    '800': { value: '#702459' },
    '900': { value: '#521B41' },
  },
  black: { value: '#111111' },
  white: { value: '#ffffff' },
  whiteAlpha: {
    '50': { value: 'RGBA(255, 255, 255, 0.04)' },
    '100': { value: 'RGBA(255, 255, 255, 0.06)' },
    '200': { value: 'RGBA(255, 255, 255, 0.08)' },
    '300': { value: 'RGBA(255, 255, 255, 0.16)' },
    '400': { value: 'RGBA(255, 255, 255, 0.24)' },
    '500': { value: 'RGBA(255, 255, 255, 0.36)' },
    '600': { value: 'RGBA(255, 255, 255, 0.48)' },
    '700': { value: 'RGBA(255, 255, 255, 0.64)' },
    '800': { value: 'RGBA(255, 255, 255, 0.80)' },
    '900': { value: 'RGBA(255, 255, 255, 0.92)' },
  },
  blackAlpha: {
    '50': { value: 'RGBA(17, 17, 17, 0.04)' },
    '100': { value: 'RGBA(17, 17, 17, 0.06)' },
    '200': { value: 'RGBA(17, 17, 17, 0.08)' },
    '300': { value: 'RGBA(17, 17, 17, 0.16)' },
    '400': { value: 'RGBA(17, 17, 17, 0.24)' },
    '500': { value: 'RGBA(17, 17, 17, 0.36)' },
    '600': { value: 'RGBA(17, 17, 17, 0.48)' },
    '700': { value: 'RGBA(17, 17, 17, 0.64)' },
    '800': { value: 'RGBA(17, 17, 17, 0.80)' },
    '900': { value: 'RGBA(17, 17, 17, 0.92)' },
  },

  // BRAND COLORS
  github: { value: '#171923' },
  telegram: { value: '#2775CA' },
  linkedin: { value: '#1564BA' },
  discord: { value: '#9747FF' },
  slack: { value: '#1BA27A' },
  twitter: { value: '#000000' },
  opensea: { value: '#2081E2' },
  facebook: { value: '#4460A0' },
  medium: { value: '#231F20' },
  reddit: { value: '#FF4500' },
  celo: { value: '#FCFF52' },
  clusters: { value: '#DE6061' },

  // THEME COLORS
  theme: defaultsDeep(config.UI.colorTheme.overrides, DEFAULT_THEME_COLORS),
};

export default colors;
