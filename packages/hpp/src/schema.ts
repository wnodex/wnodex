import { z } from 'zod';

export const HppOptionsSchema = z
  .union([z.boolean(), z.array(z.string())])
  .optional()
  .default(true);

export type HppOptionsInput = z.input<typeof HppOptionsSchema>;
export type HppOptionsOutput = z.output<typeof HppOptionsSchema>;
