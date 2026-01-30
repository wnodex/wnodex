import {
  type HelmetOptionsInput,
  type HelmetOptionsOutput,
  HelmetOptionsSchema,
} from './schema.js';

export const parseHelmetOptions = (
  options: HelmetOptionsInput
): HelmetOptionsOutput => {
  const result = HelmetOptionsSchema.safeParse(options);

  if (!result.success) {
    throw new Error('Invalid Helmet options');
  }

  return result.data;
};
