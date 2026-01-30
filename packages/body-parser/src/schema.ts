import { type OptionsJson, type OptionsUrlencoded } from 'body-parser';

import { z } from 'zod';

export const BodyParserOptionsSchema = z
  .union([
    z.boolean(),
    z.object({
      json: z.custom<OptionsJson>().optional(),
      urlencoded: z.custom<OptionsUrlencoded>().optional(),
    }),
  ])
  .optional()
  .default(true);

export type BodyParserOptions = z.infer<typeof BodyParserOptionsSchema>;
export type BodyParserOptionsInput = z.input<typeof BodyParserOptionsSchema>;
export type BodyParserOptionsOutput = z.output<typeof BodyParserOptionsSchema>;
