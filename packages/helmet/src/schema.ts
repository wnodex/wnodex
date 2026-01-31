import type { HelmetOptions } from 'helmet';

import { z } from 'zod';

export const HelmetOptionsSchema = z
  .union([
    z.boolean(),
    z.custom<HelmetOptions>(
      (val) => typeof val === 'object' && val !== null && !Array.isArray(val)
    ),
  ])
  .optional()
  .default(false);

export type HelmetOptionsInput = z.input<typeof HelmetOptionsSchema>;
export type HelmetOptionsOutput = z.output<typeof HelmetOptionsSchema>;
