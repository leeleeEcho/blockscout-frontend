import { Box, chakra } from '@chakra-ui/react';
import React from 'react';

import type { AlertProps } from 'toolkit/chakra/alert';
import { Alert } from 'toolkit/chakra/alert';

type Props = {
  html: string;
  status: AlertProps['status'];
  showIcon?: boolean;
  className?: string;

  /** Figma 99:17537 顶栏公告样式；默认 subtle 以兼容其它页面 */
  variant?: AlertProps['variant'];
};

const AlertWithExternalHtml = ({ html, status, showIcon, className, variant = 'subtle' }: Props) => {
  const linkCss = variant === 'announcement' ? {
    '& a': {
      color: 'alert.announcement.linkFg',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      _hover: {
        color: 'text.highlight',
      },
    },
  } : {
    '& a': {
      color: 'link.primary',
      _hover: {
        color: 'link.primary.hover',
      },
    },
  };

  return (
    <Alert status={ status } showIcon={ showIcon } className={ className } variant={ variant }>
      <Box
        dangerouslySetInnerHTML={{ __html: html }}
        css={ linkCss }
      />
    </Alert>
  );
};

export default React.memo(chakra(AlertWithExternalHtml));
