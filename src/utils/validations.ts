import { z } from "zod";

export const requiredField = z
  .string()
  .min(1, { message: "Field is required" });
