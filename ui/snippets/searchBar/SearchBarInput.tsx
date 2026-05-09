import type { HTMLChakraProps } from '@chakra-ui/react';
import { chakra, Center } from '@chakra-ui/react';
import React from 'react';
import type { ChangeEvent, FormEvent, FocusEvent } from 'react';

import useIsMobile from 'client/shared/hooks/useIsMobile';

import config from 'configs/app';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Input } from 'toolkit/chakra/input';
import { InputGroup } from 'toolkit/chakra/input-group';
import { ClearButton } from 'toolkit/components/buttons/ClearButton';
import IconSvg from 'ui/shared/IconSvg';

const nameServicesFeature = config.features.nameServices;

interface Props extends Omit<HTMLChakraProps<'form'>, 'onChange'> {
  onChange?: (value: string) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onBlur?: (event: FocusEvent<HTMLFormElement>) => void;
  onFocus?: () => void;
  onHide?: () => void;
  onClear?: () => void;
  onFormClick?: (event: React.MouseEvent<HTMLFormElement>) => void;
  isHeroBanner?: boolean;
  isSuggestOpen?: boolean;
  value?: string;
  readOnly?: boolean;
}

const SearchBarInput = (
  { onChange, onSubmit, isHeroBanner, isSuggestOpen, onFocus, onBlur, onHide, onClear, onFormClick, value, readOnly, ...rest }: Props,
  ref: React.ForwardedRef<HTMLFormElement>,
) => {
  const innerRef = React.useRef<HTMLFormElement>(null);
  React.useImperativeHandle(ref, () => innerRef.current as HTMLFormElement, []);
  const isMobile = useIsMobile();

  // 未配置时勿用 0px：否则默认/聚焦时边框宽度为 0，品牌绿边（input.border.focus）无法显示
  const borderWidthHeroBanner = useColorModeValue(
    config.UI.homepage.heroBanner?.search?.border_width?.[0] ?? '1px',
    config.UI.homepage.heroBanner?.search?.border_width?.[1] ?? '1px',
  );

  const handleChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  }, [ onChange ]);

  const handleKeyPress = React.useCallback((event: KeyboardEvent) => {
    if (isMobile) {
      return;
    }

    switch (event.key) {
      case '/': {
        if ([ 'INPUT', 'TEXTAREA' ].includes((event.target as HTMLElement).tagName)) {
          break;
        }

        if (!isSuggestOpen) {
          event.preventDefault();
          innerRef.current?.querySelector('input')?.focus();
          onFocus?.();
        }
        break;
      }
      case 'Escape': {
        if (isSuggestOpen) {
          innerRef.current?.querySelector('input')?.blur();
          onHide?.();
        }
        break;
      }
    }
  }, [ isMobile, isSuggestOpen, onFocus, onHide ]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [ handleKeyPress ]);

  const getPlaceholder = () => {
    const clusterText = nameServicesFeature.isEnabled && nameServicesFeature.clusters.isEnabled ? ' / cluster ' : '';
    return `Search by address / txn hash / block / token${ clusterText }/... `;
  };

  const startElement = (
    <IconSvg
      name="search"
      boxSize={ 5 }
      mx={ 2 }
      color="inherit"
    />
  );

  const endElement = (
    <>
      <ClearButton onClick={ onClear } visible={ Boolean(value?.length) } mx={ 2 } color="inherit"/>
      { !isMobile && (
        <Center
          boxSize="20px"
          mr={ 2 }
          borderRadius="sm"
          borderWidth="1px"
          borderColor="border.divider"
        >
          /
        </Center>
      ) }
    </>
  );

  const inputBg = isHeroBanner ? 'input.bg' : 'bg.surface';
  // Hero：在渐变背景上用 divider 系描边 + 聚焦绿边；非 Hero 默认边框交给 input recipe
  const heroOnlyBorder = isHeroBanner ? 'border.divider' : undefined;

  return (
    <chakra.form
      ref={ innerRef }
      noValidate
      onSubmit={ onSubmit }
      onBlur={ onBlur }
      onClick={ onFormClick }
      w="100%"
      bg="transparent"
      borderRadius="base"
      position="relative"
      zIndex={ isSuggestOpen ? 'modal' : 'auto' }
      { ...rest }
    >
      <InputGroup
        startElement={ startElement }
        endElement={ endElement }
      >
        <Input
          size={{ base: isHeroBanner ? 'md' : 'sm', lg: 'md' }}
          placeholder={ getPlaceholder() }
          value={ value }
          onChange={ handleChange }
          onFocus={ onFocus }
          tabIndex={ readOnly ? -1 : 0 }
          readOnly={ readOnly }
          borderWidth={ isHeroBanner ? borderWidthHeroBanner : '1px' }
          borderStyle="solid"
          borderColor={ heroOnlyBorder }
          color="input.fg"
          bg={ inputBg }
          caretColor="green.500"
          _placeholder={{ color: 'input.placeholder' }}
          _hover={{ borderColor: 'input.border.hover' }}
          _focus={{
            borderColor: 'input.border.focus',
            boxShadow: 'none',
            _hover: { borderColor: 'input.border.focus' },
          }}
          _focusVisible={{
            borderColor: 'input.border.focus',
            boxShadow: 'none',
            _hover: { borderColor: 'input.border.focus' },
          }}
          _disabled={{
            opacity: 'control.disabled',
            cursor: 'not-allowed',
          }}
          enterKeyHint="search"
        />
      </InputGroup>
    </chakra.form>
  );
};

export default React.memo(React.forwardRef(SearchBarInput));
