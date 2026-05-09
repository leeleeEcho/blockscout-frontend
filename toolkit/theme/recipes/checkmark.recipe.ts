import { defineRecipe } from '@chakra-ui/react';

export const recipe = defineRecipe({
  className: 'chakra-checkmark',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: '0',
    position: 'relative',
    color: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'transparent',
    focusVisibleRing: 'outside',
    _icon: {
      boxSize: 'full',
    },
    _disabled: {
      opacity: 'control.disabled',
    },
  },
  variants: {
    size: {
      xs: {
        boxSize: '3',
        borderRadius: '2px',
      },
      sm: {
        boxSize: '4',
        borderRadius: '2px',
      },
      md: {
        boxSize: '5',
        borderRadius: 'sm',
      },
    },

    variant: {
      solid: {
        bg: 'checkbox.control.bg',
        borderColor: 'checkbox.control.border',
        _hover: {
          borderColor: 'checkbox.control.border.hover',
        },
        _readOnly: {
          borderColor: 'checkbox.control.border.readOnly',
          _hover: {
            borderColor: 'checkbox.control.border.readOnly',
          },
          '&:is([data-state=checked], [data-state=indeterminate])': {
            bg: 'checkbox.control.border.readOnly',
            color: 'gray.500',
            _hover: {
              bg: 'checkbox.control.border.readOnly',
            },
          },
        },
        '&:is([data-state=checked], [data-state=indeterminate])': {
          bg: 'checkbox.control.bg.checked',
          borderColor: 'green.500',
          color: 'transparent',
          _hover: {
            bg: 'checkbox.control.bg.checked',
            borderColor: 'green.500',
          },
          '& svg': {
            display: 'none',
          },
          _after: {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            w: '3.5',
            h: '3.5',
            borderRadius: '2px',
            bg: 'green.500',
          },
        },
        '&:is([data-state=indeterminate])': {
          _after: {
            width: '2.5',
            height: '0.5',
            borderRadius: '2px',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});
