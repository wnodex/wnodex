import {
  type RateLimitOptionsInput,
  type RateLimitOptionsOutput,
  RateLimitOptionsSchema,
} from './schema.js';

export const parseRateLimitOptions = (
  options?: RateLimitOptionsInput
): RateLimitOptionsOutput => {
  const result = RateLimitOptionsSchema.safeParse(options);

  if (!result.success) {
    throw new Error('Invalid rate-limit options');
  }

  return result.data;
};
