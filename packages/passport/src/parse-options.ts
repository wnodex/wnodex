import {
  type PassportOptionsInput,
  type PassportOptionsOutput,
  PassportOptionsSchema,
} from './schema.js';

export const parsePassportOptions = (
  options: PassportOptionsInput
): PassportOptionsOutput => {
  const result = PassportOptionsSchema.safeParse(options);

  if (!result.success) {
    throw new Error('Invalid Passport options');
  }

  return result.data;
};
