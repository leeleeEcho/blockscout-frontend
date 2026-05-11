import { chakra } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Image } from 'toolkit/chakra/image';

import NetworkIcon from './NetworkIcon';

type Props = {
  className?: string;
};

/** 侧栏收起时首页 logo；未配置收起专用资源时回退为 NetworkIcon。 */
const NavigationCollapsedLogo = ({ className }: Props) => {
  const defaultSrc = config.UI.navigation.logoCollapsed.default;
  const darkSrc = config.UI.navigation.logoCollapsed.dark;

  const logoSrc = useColorModeValue(defaultSrc, darkSrc || defaultSrc);

  if (!logoSrc) {
    return <NetworkIcon className={ className }/>;
  }

  return (
    <chakra.a
      className={ className }
      href={ route({ pathname: '/' }) }
      aria-label="Link to main page"
    >
      <Image
        w="25px"
        h="20px"
        skeletonWidth="25px"
        src={ logoSrc }
        alt={ `${ config.chain.name } network logo` }
        objectFit="contain"
        objectPosition="left"
      />
    </chakra.a>
  );
};

export default React.memo(chakra(NavigationCollapsedLogo));
