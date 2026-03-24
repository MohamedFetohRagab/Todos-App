import * as z from "zod";

export const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  body: z.string().max(80, "Description can be 0 or 80 letter").optional(),
  completed: z.boolean().optional(),
  id: z.string().optional(),
});
