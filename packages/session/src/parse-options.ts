import {
  type SessionOptionsInput,
  type SessionOptionsOutput,
  SessionOptionsSchema,
} from './schema.js';

export const parseSessionOptions = (
  options?: SessionOptionsInput
): SessionOptionsOutput => {
  const result = SessionOptionsSchema.safeParse(options);

  if (!result.success) {
    throw new Error('Invalid session options');
  }

  return result.data;
};
