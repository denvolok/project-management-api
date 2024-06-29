import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number(),
  USERS_SERVICE_HOST: z.string(),
  USERS_SERVICE_PORT: z.coerce.number(),
});
