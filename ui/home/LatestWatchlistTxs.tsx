import { Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import useApiQuery from 'client/api/hooks/useApiQuery';

import { TX } from 'client/slices/tx/stubs/tx';

import useIsMobile from 'client/shared/hooks/useIsMobile';

import { Link } from 'toolkit/chakra/link';
import useRedirectForInvalidAuthToken from 'ui/snippets/auth/useRedirectForInvalidAuthToken';

import LatestTxsFallback from './fallbacks/LatestTxsFallback';
import LatestTxsItem from './LatestTxsItem';
import LatestTxsItemMobile from './LatestTxsItemMobile';

const LatestWatchlistTxs = () => {
  useRedirectForInvalidAuthToken();
  const isMobile = useIsMobile();
  const txsCount = isMobile ? 2 : 5;
  const { data, isPlaceholderData, isError } = useApiQuery('general:homepage_txs_watchlist', {
    queryOptions: {
      placeholderData: Array(txsCount).fill(TX),
    },
  });

  if (isError) {
    return <LatestTxsFallback/>;
  }

  if (!data?.length) {
    return <Text>No latest transactions found.</Text>;
  }

  if (data) {
    const txsUrl = route({ pathname: '/txs', query: { tab: 'watchlist' } });
    return (
      <>
        <VStack mb={ 3 } gap={ 1 } alignItems="stretch" display={{ base: 'flex', lg: 'none' }} textStyle="sm">
          { data.slice(0, txsCount).map(((tx, index) => (
            <LatestTxsItemMobile
              key={ tx.hash + (isPlaceholderData ? index : '') }
              tx={ tx }
              isLoading={ isPlaceholderData }
            />
          ))) }
        </VStack>
        <VStack mb={ 4 } gap={ 1 } alignItems="stretch" display={{ base: 'none', lg: 'flex' }} textStyle="sm">
          { data.slice(0, txsCount).map(((tx, index) => (
            <LatestTxsItem
              key={ tx.hash + (isPlaceholderData ? index : '') }
              tx={ tx }
              isLoading={ isPlaceholderData }
            />
          ))) }
        </VStack>
        <Flex justifyContent="center">
          <Link textStyle="sm" href={ txsUrl }>View all watch list transactions</Link>
        </Flex>
      </>
    );
  }

  return null;
};

export default LatestWatchlistTxs;
