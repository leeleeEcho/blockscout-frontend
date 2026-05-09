import { defineSlotRecipe } from '@chakra-ui/react';

import { recipe as checkmarkRecipe } from './checkmark.recipe';

export const recipe = defineSlotRecipe({
  slots: [ 'root', 'control', 'label', 'indicator' ],
  className: 'chakra-checkbox',
  base: {
    root: {
      display: 'inline-flex',
      gap: '2',
      alignItems: 'center',
      verticalAlign: 'top',
      position: 'relative',
      cursor: 'pointer',
      _disabled: {
        cursor: 'disabled',
      },
      _readOnly: {
        cursor: 'default',
      },
      // 悬停在文案上时 control 无 :hover，同步绿边（品牌主绿）
      '&:hover [data-scope="checkbox"][data-part="control"]': {
        borderColor: 'checkbox.control.border.hover',
      },
      '&:focus-within [data-scope="checkbox"][data-part="control"]': {
        borderColor: 'checkbox.control.border.hover',
      },
      '&:hover:not([data-state=checked]):not([data-state=indeterminate]) [data-scope="checkbox"][data-part="label"]': {
        color: 'checkbox.label.fg.hover',
      },
      '&[data-state=checked] [data-scope="checkbox"][data-part="label"], &[data-state=indeterminate] [data-scope="checkbox"][data-part="label"]': {
        color: 'checkbox.label.fg.checked',
      },
    },

    control: checkmarkRecipe.base,

    label: {
      fontWeight: 'normal',
      userSelect: 'none',
      flexGrow: 1,
      color: 'checkbox.label.fg',
      transitionProperty: 'color',
      transitionDuration: 'fast',
      _disabled: {
        opacity: 'control.disabled',
      },
    },

    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      '& svg': {
        display: 'none',
      },
    },
  },

  variants: {
    size: {
      sm: {
        root: { gap: '2' },
        label: { textStyle: 'sm' },
        control: checkmarkRecipe.variants?.size?.md,
      },
      md: {
        root: { gap: '2' },
        label: { textStyle: 'md' },
        control: checkmarkRecipe.variants?.size?.md,
      },
    },

    variant: {
      solid: {
        control: checkmarkRecipe.variants?.variant?.solid,
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});
