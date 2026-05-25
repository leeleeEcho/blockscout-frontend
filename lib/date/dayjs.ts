// eslint-disable-next-line no-restricted-imports
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import config from 'configs/app';
import { nbsp } from 'toolkit/utils/htmlEntities';

const relativeTimeConfig = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'ss', r: 59, d: 'second' },
    { l: 'm', r: 1 },
    { l: 'mm', r: 59, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 23, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 6, d: 'day' },
    { l: 'w', r: 1 },
    { l: 'ww', r: 4, d: 'week' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 11, d: 'month' },
    { l: 'y', r: 17 },
    { l: 'yy', d: 'year' },
  ],
};

dayjs.extend(relativeTime, relativeTimeConfig);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(weekOfYear);
dayjs.extend(minMax);
dayjs.extend(utc);

dayjs.updateLocale('en', {
  formats: {
    llll: `MMM DD YYYY HH:mm:ss (Z${ nbsp }UTC)`,
    lll: 'MMM D, YYYY H:mm',
  },
  relativeTime: {
    s: '1s',
    ss: '%ds',
    future: 'in %s',
    past: '%s ago',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '%dw',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

dayjs.locale('en');

// Demo-node timestamp shifting (anvil-zksync starts from Unix epoch).
// If input is an ISO string in 197x or a small numeric ts (< 5 years post-epoch),
// add config.app.timestampOffsetSec so the UI shows wall-clock time.
// When the env is unset/0, this is a no-op.
const TIMESTAMP_OFFSET_SEC = config.app.timestampOffsetSec;
const SHIFT_THRESHOLD_SEC = 5 * 365 * 86400;

function maybeShift(input: unknown): unknown {
  if (!TIMESTAMP_OFFSET_SEC) return input;
  if (typeof input === 'string' && /^19[67]\d-/.test(input)) {
    const ms = Date.parse(input);
    if (!isNaN(ms)) return new Date(ms + TIMESTAMP_OFFSET_SEC * 1000).toISOString();
  }
  if (typeof input === 'number' && input > 0 && input < SHIFT_THRESHOLD_SEC * 1000) {
    return input + TIMESTAMP_OFFSET_SEC * 1000;
  }
  return input;
}

const originalDayjs = dayjs;
const shiftedDayjs = ((input?: unknown, ...rest: Array<unknown>) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (originalDayjs as any)(maybeShift(input), ...rest)) as typeof dayjs;

Object.setPrototypeOf(shiftedDayjs, originalDayjs);
for (const key of Object.keys(originalDayjs)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (shiftedDayjs as any)[key] = (originalDayjs as any)[key];
}

export default shiftedDayjs;

export const FORMATS = {
  // the "lll" format with seconds
  lll_s: 'MMM D, YYYY H:mm:ss',
};
