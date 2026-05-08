import { defineRecipe } from '@chakra-ui/react';

export const recipe = defineRecipe({
  base: {
    gap: 0,
    _disabled: {
      cursor: 'not-allowed',
    },
  },
  variants: {
    variant: {
      primary: {
        color: 'link.primary',
        _hover: {
          textDecoration: 'none',
          color: 'link.primary.hover',
        },
      },
      // Card / widget row title (e.g. block height, tx hash): main text color, not list-style secondary links
      title: {
        color: 'text.primary',
        _hover: {
          textDecoration: 'none',
          color: 'text.highlight',
        },
      },
      secondary: {
        color: 'link.secondary',
        _hover: {
          textDecoration: 'none',
          color: 'text.highlight',
        },
      },
      subtle: {
        color: 'link.subtle',
        _hover: {
          color: 'text.highlight',
          textDecorationLine: 'underline',
          textDecorationColor: 'text.highlight',
        },
      },
      underlaid: {
        color: 'link.primary',
        bgColor: 'link.underlaid.bg',
        px: '8px',
        py: '6px',
        borderRadius: 'base',
        textStyle: 'sm',
        _hover: {
          color: 'link.primary.hover',
          textDecoration: 'none',
        },
      },
      menu: {
        color: 'link.menu',
        _hover: {
          color: 'text.highlight',
          textDecoration: 'none',
        },
      },
      navigation: {
        color: 'link.navigation.fg',
        bg: 'transparent',
        _hover: {
          color: 'link.navigation.fg.hover',
          textDecoration: 'none',
        },
        _selected: {
          color: 'link.navigation.fg.selected',
          bg: 'link.navigation.bg.selected',
        },
        _active: {
          color: 'link.navigation.fg.active',
        },
      },
      plain: {
        color: 'inherit',
        _hover: {
          textDecoration: 'none',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
