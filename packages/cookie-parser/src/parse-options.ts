import {
  type CookieParserOptionsInput,
  type CookieParserOptionsOutput,
  CookieParserOptionsSchema,
} from './schema.js';

export const parseCookieParserOptions = (
  options: CookieParserOptionsInput
): CookieParserOptionsOutput => {
  const result = CookieParserOptionsSchema.safeParse(options);

  if (!result.success) {
    throw new Error('Invalid cookie-parser options');
  }

  return result.data;
};
