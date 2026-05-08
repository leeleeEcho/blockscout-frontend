import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { HomeRpcDataContextProvider } from 'ui/home/fallbacks/rpcDataContext';
import HeroBanner from 'ui/home/HeroBanner';
import Highlights from 'ui/home/Highlights';
import { HomeDataContextProvider } from 'ui/home/homeDataContext';
import ChainIndicators from 'ui/home/indicators/ChainIndicators';
import LatestArbitrumL2Batches from 'ui/home/latestBatches/LatestArbitrumL2Batches';
import LatestBlocks from 'ui/home/LatestBlocks';
import Stats from 'ui/home/Stats';
import Transactions from 'ui/home/Transactions';
const rollupFeature = config.features.rollup;

const Home = () => {
  const leftWidget = (() => {
    if (rollupFeature.isEnabled && !rollupFeature.homepage.showLatestBlocks) {
      switch (rollupFeature.type) {
        case 'arbitrum':
          return <LatestArbitrumL2Batches/>;
      }
    }

    return <LatestBlocks/>;
  })();

  return (
    <HomeDataContextProvider>
      <HomeRpcDataContextProvider>
        <Box as="main">
          <HeroBanner/>
          <Flex flexDir={{ base: 'column', lg: 'row' }} columnGap={ 2 } rowGap={ 1 } mt={ 3 } _empty={{ mt: 0 }}>
            <Stats/>
            <ChainIndicators/>
          </Flex>
          { config.UI.homepage.highlights && <Highlights mt={ 3 } display={{ base: 'none', lg: 'block' }}/> }
          <Flex mt={ 8 } direction={{ base: 'column', lg: 'row' }} columnGap={ 12 } rowGap={ 6 }>
            { leftWidget }
            <Box flexGrow={ 1 }>
              <Transactions/>
            </Box>
          </Flex>
        </Box>
      </HomeRpcDataContextProvider>
    </HomeDataContextProvider>
  );
};

export default Home;
