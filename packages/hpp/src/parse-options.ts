import {
  type HppOptionsInput,
  type HppOptionsOutput,
  HppOptionsSchema,
} from './schema.js';

export const parseHppOptions = (
  options?: HppOptionsInput
): HppOptionsOutput => {
  const result = HppOptionsSchema.safeParse(options);

  if (!result.success) {
    throw new Error('Invalid Hpp options');
  }

  return result.data;
};
