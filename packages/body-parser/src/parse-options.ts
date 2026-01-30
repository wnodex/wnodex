import {
  BodyParserOptionsInput,
  BodyParserOptionsOutput,
  BodyParserOptionsSchema,
} from './schema.js';

export const parseBodyParserOptions = (
  options: BodyParserOptionsInput
): BodyParserOptionsOutput => {
  const result = BodyParserOptionsSchema.safeParse(options);

  if (!result.success) {
    throw new Error('Invalid body-parser options');
  }

  return result.data;
};
