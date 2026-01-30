import passport from 'passport';

import { z } from 'zod';

export const PassportOptionsSchema = z
  .union([z.boolean(), z.custom<typeof passport>()])
  .optional()
  .default(false);

export type PassportOptionsInput = z.input<typeof PassportOptionsSchema>;
export type PassportOptionsOutput = z.output<typeof PassportOptionsSchema>;
