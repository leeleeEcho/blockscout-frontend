import { Box, Flex, VStack, Separator, HStack, chakra } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { Transaction } from 'client/slices/tx/types/api';

import { route } from 'nextjs/routes';

import TxFee from 'client/slices/tx/components/TxFee';
import TxStatus from 'client/slices/tx/components/TxStatus';

import { currencyUnits } from 'client/shared/chain/units';

import config from 'configs/app';
import { useMultichainContext } from 'lib/contexts/multichain';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import BlobEntity from 'ui/shared/entities/blob/BlobEntity';
import TextSeparator from 'ui/shared/TextSeparator';
import Utilization from 'ui/shared/Utilization/Utilization';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';

/** 主数值加粗、USD 括号段保持次要字重（AssetValue 为外层 span + 两段子节点） */
const POPOVER_VALUE_ROW_SX = {
  '& > span': { fontWeight: 700 },
  '& > span > *:last-of-type': { fontWeight: 400 },
};

const TxAdditionalInfoContent = ({ tx, isLoading }: { tx: Transaction; isLoading?: boolean }) => {
  const multichainContext = useMultichainContext();

  const sectionTitleProps = {
    color: 'text.secondary',
    fontWeight: 500,
    fontSize: 'sm',
    marginBottom: 1,
  };

  const sectionSeparator = <Separator orientation="horizontal" borderColor="border.divider"/>;

  return (
    <>
      <TxStatus
        status={ tx.status }
        errorText={ tx.status === 'error' ? tx.result : undefined }
        mb={ 4 }
        isLoading={ isLoading }
        visual="solid"
      />
      <VStack
        alignItems="stretch"
        separator={ sectionSeparator }
        gap={ 3 }
      >
        { tx.blob_versioned_hashes && tx.blob_versioned_hashes.length > 0 && (
          <Box>
            <VStack alignItems="stretch" gap={ 1 }>
              <Flex alignItems="center" justifyContent="space-between">
                <Skeleton loading={ isLoading } { ...sectionTitleProps }>Blobs: { tx.blob_versioned_hashes.length }</Skeleton>
                { tx.blob_versioned_hashes.length > 3 && (
                  <Link
                    href={ route({ pathname: '/tx/[hash]', query: { hash: tx.hash, tab: 'blobs' } }) }
                    loading={ isLoading }
                    variant="secondary"
                  >
                    view all
                  </Link>
                ) }
              </Flex>
              <VStack alignItems="stretch" gap={ 1 }>
                { tx.blob_versioned_hashes.slice(0, 3).map((hash, index) => (
                  <Flex key={ hash } columnGap={ 2 } py={ 0.5 } w="full">
                    <Skeleton loading={ isLoading } fontWeight={ 500 }>{ index + 1 }</Skeleton>
                    <BlobEntity hash={ hash } noIcon isLoading={ isLoading }/>
                  </Flex>
                )) }
              </VStack>
            </VStack>
          </Box>
        ) }

        <VStack alignItems="stretch" gap={ 1 }>
          <Skeleton loading={ isLoading } { ...sectionTitleProps }>
            <span>Value</span>
          </Skeleton>
          <Box css={ POPOVER_VALUE_ROW_SX }>
            <NativeCoinValue
              amount={ tx.value }
              exchangeRate={ tx.exchange_rate }
              historicalExchangeRate={ tx.historic_exchange_rate }
              noTooltip
              loading={ isLoading }
            />
          </Box>
        </VStack>

        { !config.UI.views.tx.hiddenFields?.tx_fee && (tx.stability_fee !== undefined || tx.fee.value !== null) && (
          <VStack alignItems="stretch" gap={ 1 }>
            <Skeleton loading={ isLoading } { ...sectionTitleProps }>
              <span>Transaction fee</span>
            </Skeleton>
            <Box css={ POPOVER_VALUE_ROW_SX }>
              <TxFee tx={ tx } rowGap={ 0 } noTooltip loading={ isLoading }/>
            </Box>
          </VStack>
        ) }

        { tx.gas_used !== null && (
          <VStack alignItems="stretch" gap={ 1 }>
            <Skeleton loading={ isLoading } { ...sectionTitleProps }>
              <span>Gas limit & usage by transaction</span>
            </Skeleton>
            <Flex alignItems="center" flexWrap="wrap" rowGap={ 1 } columnGap={ 1 }>
              <Skeleton loading={ isLoading } fontWeight="700">{ BigNumber(tx.gas_used).toFormat() }</Skeleton>
              <TextSeparator/>
              <Skeleton loading={ isLoading } fontWeight="700">{ BigNumber(tx.gas_limit).toFormat() }</Skeleton>
              <Utilization
                ml={ 4 }
                value={ Number(BigNumber(tx.gas_used).dividedBy(BigNumber(tx.gas_limit)).toFixed(2)) }
                barStyle="forest"
                isLoading={ isLoading }
              />
            </Flex>
          </VStack>
        ) }

        { !config.UI.views.tx.hiddenFields?.gas_fees &&
          (tx.base_fee_per_gas !== null || tx.max_fee_per_gas !== null || tx.max_priority_fee_per_gas !== null) && (
          <VStack alignItems="stretch" gap={ 1 }>
            <Skeleton loading={ isLoading } { ...sectionTitleProps }>
              <span>Gas fees ({ currencyUnits.gwei })</span>
            </Skeleton>
            <VStack gap={ 0 } alignItems="flex-start">
              { tx.base_fee_per_gas !== null && (
                <HStack gap={ 1 } alignItems="baseline">
                  <Skeleton loading={ isLoading }>
                    <chakra.span color="text.secondary" fontWeight="400">Base:</chakra.span>
                  </Skeleton>
                  <NativeCoinValue
                    amount={ tx.base_fee_per_gas }
                    units="gwei"
                    unitsTooltip="wei"
                    noSymbol
                    fontWeight="700"
                    loading={ isLoading }
                  />
                </HStack>
              ) }
              { tx.max_fee_per_gas !== null && (
                <HStack gap={ 1 } alignItems="baseline">
                  <Skeleton loading={ isLoading }>
                    <chakra.span color="text.secondary" fontWeight="400">Max:</chakra.span>
                  </Skeleton>
                  <NativeCoinValue
                    amount={ tx.max_fee_per_gas }
                    units="gwei"
                    unitsTooltip="wei"
                    noSymbol
                    fontWeight="700"
                    loading={ isLoading }
                  />
                </HStack>
              ) }
              { tx.max_priority_fee_per_gas !== null && (
                <HStack gap={ 1 } alignItems="baseline">
                  <Skeleton loading={ isLoading }>
                    <chakra.span color="text.secondary" fontWeight="400">Max priority:</chakra.span>
                  </Skeleton>
                  <NativeCoinValue
                    amount={ tx.max_priority_fee_per_gas }
                    units="gwei"
                    unitsTooltip="wei"
                    noSymbol
                    fontWeight="700"
                    loading={ isLoading }
                  />
                </HStack>
              ) }
            </VStack>
          </VStack>
        ) }
        { !(tx.blob_versioned_hashes && tx.blob_versioned_hashes.length > 0) && (
          <VStack alignItems="stretch" gap={ 1 }>
            <Skeleton loading={ isLoading } { ...sectionTitleProps }>
              <span>Others</span>
            </Skeleton>
            <VStack alignItems="flex-start" gap={ 0 }>
              <Skeleton loading={ isLoading } display="flex" alignItems="center" gap={ 1 } flexWrap="wrap">
                <chakra.span color="text.secondary" fontWeight="400">Txn type:</chakra.span>
                <chakra.span fontWeight="700" color="text.primary">{ tx.type }</chakra.span>
                { tx.type === 2 && <chakra.span color="text.secondary" fontWeight="400">(EIP-1559)</chakra.span> }
              </Skeleton>
              <Skeleton loading={ isLoading } display="flex" alignItems="center" gap={ 1 }>
                <chakra.span color="text.secondary" fontWeight="400">Nonce:</chakra.span>
                <chakra.span fontWeight="700" color="text.primary">{ tx.nonce }</chakra.span>
              </Skeleton>
              <Skeleton loading={ isLoading } display="flex" alignItems="center" gap={ 1 }>
                <chakra.span color="text.secondary" fontWeight="400">Position:</chakra.span>
                <chakra.span fontWeight="700" color="text.primary">{ tx.position }</chakra.span>
              </Skeleton>
            </VStack>
          </VStack>
        ) }
        <Link
          href={ route({ pathname: '/tx/[hash]', query: { hash: tx.hash } }, multichainContext) }
          loading={ isLoading }
          variant="plain"
          display="block"
          mt={ 1 }
          pt={ 3 }
          mx="auto"
          textAlign="center"
          w="100%"
          maxW="100%"
          px={ 4 }
          py={ 2 }
          borderWidth="1px"
          borderStyle="solid"
          borderColor={{ base: 'green.700', _dark: 'green.500' }}
          borderRadius="4px"
          color={{ base: 'green.700', _dark: 'green.500' }}
          fontWeight={ 600 }
          fontSize="sm"
          textDecoration="none"
          _hover={{
            bg: { base: 'green.50', _dark: 'green.900' },
            color: { base: 'green.700', _dark: 'green.500' },
            textDecoration: 'none',
          }}
        >
          More details
        </Link>
      </VStack>
    </>
  );
};

export default React.memo(TxAdditionalInfoContent);
