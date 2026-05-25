import { isPrivateMode } from 'client/shared/storage/cookies';

import { getEnvValue } from './utils';

const appPort = getEnvValue('NEXT_PUBLIC_APP_PORT');
const appSchema = getEnvValue('NEXT_PUBLIC_APP_PROTOCOL');
const appHost = getEnvValue('NEXT_PUBLIC_APP_HOST');
const baseUrl = [
  appSchema || 'https',
  '://',
  appHost,
  appPort && ':' + appPort,
].filter(Boolean).join('');
const isDev = getEnvValue('NEXT_PUBLIC_APP_ENV') === 'development';
const isReview = getEnvValue('NEXT_PUBLIC_APP_ENV') === 'review';
const isPw = getEnvValue('NEXT_PUBLIC_APP_INSTANCE') === 'pw';
const spriteHash = getEnvValue('NEXT_PUBLIC_ICON_SPRITE_HASH');

const app = Object.freeze({
  isDev,
  isReview,
  isPw,
  protocol: appSchema || 'https',
  host: appHost,
  port: appPort,
  baseUrl,
  useProxy: getEnvValue('NEXT_PUBLIC_USE_NEXT_JS_PROXY') === 'true',
  spriteHash,
  isPrivateMode: isPrivateMode(),
  // Demo-node timestamp shift (anvil-zksync uses Unix epoch as genesis).
  // When set, lib/date/dayjs.ts adds this many seconds to inputs that look
  // like pre-1975 timestamps. Unset / 0 = no-op for chains with real wall-clock.
  timestampOffsetSec: Number(getEnvValue('NEXT_PUBLIC_TIMESTAMP_OFFSET_SEC') || '0'),
});

export default app;
