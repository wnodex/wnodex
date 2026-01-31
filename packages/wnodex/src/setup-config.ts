import { ConfigError } from '@wnodex/errors';

import {
  WnodexConfigInput,
  WnodexConfigOutput,
  WnodexConfigSchema,
} from './config.js';

export const setupConfig = (config: WnodexConfigInput): WnodexConfigOutput => {
  const result = WnodexConfigSchema.safeParse(config);

  if (!result.success) {
    throw new ConfigError('Invalid wnodex configuration', result.error);
  }

  return result.data;
};
