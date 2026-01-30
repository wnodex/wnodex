import {
  type CompressionOptionsInput,
  type CompressionOptionsOutput,
  CompressionOptionsSchema,
} from './schema.js';

export const parseCompressionOptions = (
  options: CompressionOptionsInput
): CompressionOptionsOutput => {
  const result = CompressionOptionsSchema.safeParse(options);
  if (!result.success) {
    console.error(result.error);
    throw new Error('Invalid compression options');
  }
  return result.data;
};
