import { z } from "zod";

export const inputSchema = z.object({
  end: z.string().nullable().optional(),
  include: z.string().nullable().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  start: z.string().nullable().optional(),
  where: z.string().nullable().optional(),
});
