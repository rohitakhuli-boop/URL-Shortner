import dotenv from "dotenv";
import { z } from "zod";

// ✅ Load environment variables from .env file
dotenv.config();

// ✅ Define validation schema
const portSchema = z.coerce.number().min(1).max(65535).default(3000);

// ✅ Parse and export
export const PORT = portSchema.parse(process.env.PORT);


