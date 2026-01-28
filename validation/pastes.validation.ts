import { z } from "zod";

export const createPasteSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),

  ttl_seconds: z
    .number()
    .int("ttl_seconds must be an integer")
    .min(1, "ttl_seconds must be >= 1")
    .optional(),

  max_views: z
    .number()
    .int("max_views must be an integer")
    .min(1, "max_views must be >= 1")
    .optional(),
});
