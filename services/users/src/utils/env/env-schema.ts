import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number(),
  JWT_SECRET: z.string(),
});
