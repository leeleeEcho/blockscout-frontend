import { Text, chakra } from '@chakra-ui/react';
import React from 'react';

import type { Transaction } from 'client/slices/tx/types/api';

import { DialogContent, DialogHeader, DialogRoot, DialogTrigger, DialogBody } from 'toolkit/chakra/dialog';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'toolkit/chakra/popover';
import AdditionalInfoButton from 'ui/shared/AdditionalInfoButton';

import TxAdditionalInfoContainer from './TxAdditionalInfoContainer';
import TxAdditionalInfoContent from './TxAdditionalInfoContent';

const ADDITIONAL_INFO_TITLE_PROPS = {
  as: 'h2' as const,
  fontSize: 'xs',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'text.primary',
  mb: 3,
};

type Props =
  ({
    hash: string;
    tx?: undefined;
  } |
  {
    hash?: undefined;
    tx: Transaction;
  }) & {
    isMobile?: boolean;
    isLoading?: boolean;
    className?: string;
  };

const TxAdditionalInfo = ({ hash, tx, isMobile, isLoading, className }: Props) => {
  const content = hash !== undefined ? <TxAdditionalInfoContainer hash={ hash }/> : <TxAdditionalInfoContent tx={ tx }/>;

  if (isMobile) {
    return (
      <DialogRoot size="full">
        <DialogTrigger asChild>
          <AdditionalInfoButton loading={ isLoading } className={ className }/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Text { ...ADDITIONAL_INFO_TITLE_PROPS }>Additional info</Text>
          </DialogHeader>
          <DialogBody>
            { content }
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    );
  }
  return (
    <PopoverRoot positioning={{ placement: 'right-start' }}>
      <PopoverTrigger>
        <AdditionalInfoButton loading={ isLoading } className={ className }/>
      </PopoverTrigger>
      <PopoverContent w="330px" maxW="calc(100vw - 16px)" borderRadius="lg" overflow="hidden">
        <PopoverBody pt={ 4 } px={ 4 } pb={ 4 }>
          <Text { ...ADDITIONAL_INFO_TITLE_PROPS }>Additional info</Text>
          { content }
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default React.memo(chakra(TxAdditionalInfo));
