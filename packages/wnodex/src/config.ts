import z from 'zod';
import { BodyParserOptionsSchema } from '@wnodex/body-parser';
import { CompressionOptionsSchema } from '@wnodex/compression';
import { CookieParserOptionsSchema } from '@wnodex/cookie-parser';
import { CorsOptionsSchema } from '@wnodex/cors';
import { HelmetOptionsSchema } from '@wnodex/helmet';
import { HppOptionsSchema } from '@wnodex/hpp';
import { PassportOptionsSchema } from '@wnodex/passport';
import { RateLimitOptionsSchema } from '@wnodex/rate-limit';
import { SessionOptionsSchema } from '@wnodex/session';

export const WnodexConfigSchema = z.object({
  port: z.union([z.number(), z.string()]).optional().default(3000),
  bodyParsers: BodyParserOptionsSchema,
  helmet: HelmetOptionsSchema,
  cors: CorsOptionsSchema,
  compression: CompressionOptionsSchema,
  rateLimit: RateLimitOptionsSchema,
  cookieParser: CookieParserOptionsSchema,
  hpp: HppOptionsSchema,
  session: SessionOptionsSchema,
  passport: PassportOptionsSchema,
});

export type WnodexConfig = z.infer<typeof WnodexConfigSchema>;
export type WnodexConfigInput = z.input<typeof WnodexConfigSchema>;
export type WnodexConfigOutput = z.output<typeof WnodexConfigSchema>;
