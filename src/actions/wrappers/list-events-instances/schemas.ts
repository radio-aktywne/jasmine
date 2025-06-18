import { z } from "zod";

export const inputSchema = z.object({
  end: z.string().optional(),
  include: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  start: z.string().optional(),
  where: z.string().optional(),
});
