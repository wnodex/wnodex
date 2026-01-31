import passport from 'passport';

import { z } from 'zod';

export const PassportOptionsSchema = z
  .union([
    z.boolean(),
    z.custom<typeof passport>(
      (val) => typeof val === 'object' && val !== null && 'authenticate' in val
    ),
  ])
  .optional()
  .default(false);

export type PassportOptionsInput = z.input<typeof PassportOptionsSchema>;
export type PassportOptionsOutput = z.output<typeof PassportOptionsSchema>;
