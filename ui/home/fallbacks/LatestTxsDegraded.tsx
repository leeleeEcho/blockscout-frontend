import { Box, Flex, VStack } from '@chakra-ui/react';
import { clamp } from 'es-toolkit';
import React from 'react';

import { route } from 'nextjs-routes';

import { AddressHighlightProvider } from 'client/slices/address/contexts/address-highlight';
import { TX } from 'client/slices/tx/stubs/tx';

import { publicClient } from 'client/features/connect-wallet/utils/public-client';

import config from 'configs/app';
import { Link } from 'toolkit/chakra/link';

import LatestTxsItem from '../LatestTxsItem';
import LatestTxsItemMobile from '../LatestTxsItemMobile';
import LatestTxsDegradedNewItems from './LatestTxsDegradedNewItems';
import LatestTxsFallback from './LatestTxsFallback';
import { useHomeRpcDataContext } from './rpcDataContext';

const zetachainFeature = config.features.zetachain;

interface Props {
  maxNum: number;
}

const LatestTxsDegraded = ({ maxNum }: Props) => {
  const { txs, totalTxs, isError, isLoading, enable } = useHomeRpcDataContext();

  React.useEffect(() => {
    enable(true, 'latest-txs');
    return () => {
      enable(false, 'latest-txs');
    };
  }, [ enable ]);

  if (isError || !publicClient) {
    return <LatestTxsFallback/>;
  }

  const items = isLoading ? Array(maxNum).fill(TX) : txs.slice(0, maxNum);

  if (items.length === 0) {
    return <Box textStyle="sm">No latest transactions found.</Box>;
  }

  const txsUrl = route({ pathname: `/txs`, query: zetachainFeature.isEnabled ? { tab: 'evm' } : undefined });
  const overflow = clamp(totalTxs - maxNum, 0, Infinity);

  return (
    <>
      <LatestTxsDegradedNewItems overflow={ overflow } url={ txsUrl } isLoading={ isLoading }/>
      <VStack mb={ 3 } mt={ 1 } gap={ 1 } alignItems="stretch" display={{ base: 'flex', lg: 'none' }} textStyle="sm">
        { items.map(((tx, index) => (
          <LatestTxsItemMobile
            key={ tx.hash + (isLoading ? index : '') }
            tx={ tx }
            isLoading={ isLoading }
          />
        ))) }
      </VStack>
      <AddressHighlightProvider>
        <VStack mb={ 3 } mt={ 1 } gap={ 1 } alignItems="stretch" display={{ base: 'none', lg: 'flex' }} textStyle="sm">
          { items.map(((tx, index) => (
            <LatestTxsItem
              key={ tx.hash + (isLoading ? index : '') }
              tx={ tx }
              isLoading={ isLoading }
            />
          ))) }
        </VStack>
      </AddressHighlightProvider>
      <Flex justifyContent="center">
        <Link textStyle="sm" loading={ isLoading } href={ txsUrl }>View all transactions</Link>
      </Flex>
    </>
  );
};

export default React.memo(LatestTxsDegraded);
