import { z } from "zod";

export const createPasteSchema = z.object({
  content: z.string().min(1, "Content cannot be empty"),
  maxViews: z
    .number()
    .int("maxViews must be an integer")
    .positive("maxViews must be greater than 0")
    .optional(),

  expiresAt: z
    .string()
    .datetime("expiresAt must be a valid ISO date")
    .optional(),
});
