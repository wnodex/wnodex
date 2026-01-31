import {
  type CorsOptionsInput,
  type CorsOptionsOutput,
  CorsOptionsSchema,
} from './schema.js';

export const parseCorsOptions = (
  options?: CorsOptionsInput
): CorsOptionsOutput => {
  const result = CorsOptionsSchema.safeParse(options);

  if (!result.success) {
    throw new Error('Invalid CORS options');
  }

  return result.data;
};
