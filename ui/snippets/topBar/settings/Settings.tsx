import { Flex, Separator, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { IconButton } from 'toolkit/chakra/icon-button';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'toolkit/chakra/popover';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
import IconSvg from 'ui/shared/IconSvg';

import SettingsAddressFormat from './SettingsAddressFormat';
import SettingsColorTheme from './SettingsColorTheme';
import SettingsIdentIcon from './SettingsIdentIcon';
import SettingsLocalTime from './SettingsLocalTime';
import SettingsPoorReputationTokens from './SettingsPoorReputationTokens';
import SettingsScamTokens from './SettingsScamTokens';

const Settings = () => {
  const popover = useDisclosure();
  const tooltip = useDisclosure();

  const handlePopoverOpenChange = React.useCallback(({ open }: { open: boolean }) => {
    open && tooltip.onClose();
    popover.onOpenChange({ open });
  }, [ popover, tooltip ]);

  const handleTooltipOpenChange = React.useCallback(({ open }: { open: boolean }) => {
    if (!popover.open) {
      tooltip.onOpenChange({ open });
    }
  }, [ popover, tooltip ]);

  return (
    <PopoverRoot
      positioning={{ placement: 'bottom-end' }}
      open={ popover.open }
      onOpenChange={ handlePopoverOpenChange }
      // should be false to enable auto-switch to default color theme
      lazyMount={ false }
    >
      <Tooltip content="Website settings" disableOnMobile open={ tooltip.open } onOpenChange={ handleTooltipOpenChange }>
        <Flex alignItems="center">
          <PopoverTrigger>
            <IconButton
              variant="outline"
              size="md"
              boxSize={ 9 }
              minW={ 9 }
              minH={ 9 }
              borderRadius="4px"
              borderWidth="1px"
              borderColor={ popover.open ? 'green.700' : 'text.highlight' }
              color={ popover.open ? 'green.500' : 'text.highlight' }
              bg={ popover.open ? 'green.700' : { base: 'white', _dark: 'whiteAlpha.100' } }
              _hover={ popover.open ?
                { bg: 'green.700', borderColor: 'green.700', color: 'green.500' } :
                { bg: { base: 'blackAlpha.50', _dark: 'whiteAlpha.200' }, borderColor: 'text.highlight', color: 'text.highlight' } }
              aria-label="User settings"
            >
              <IconSvg name="gear"/>
            </IconButton>
          </PopoverTrigger>
        </Flex>
      </Tooltip>
      <PopoverContent overflowY="hidden" w="auto" minW="280px" fontSize="sm" borderRadius="lg">
        <PopoverBody pt={ 4 } px={ 4 } pb={ 4 }>
          <Text
            as="h2"
            fontSize="xs"
            fontWeight={ 700 }
            letterSpacing="0.1em"
            textTransform="uppercase"
            color="text.primary"
            mb={ 4 }
          >
            Settings
          </Text>
          <SettingsColorTheme onSelect={ popover.onClose }/>
          <Separator my={ 3 }/>
          <SettingsIdentIcon/>
          <SettingsAddressFormat/>
          <Separator my={ 3 }/>
          <VStack gap={ 1 }>
            <SettingsScamTokens/>
            <SettingsPoorReputationTokens/>
            <SettingsLocalTime/>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default React.memo(Settings);
