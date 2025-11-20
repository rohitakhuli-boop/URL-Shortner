import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

// Get current file directory (so dotenv always loads from correct folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the .env file from the project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Debug log (optional, remove later)
console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);
console.log("Loaded MONGODB_DATABASE_NAME:", process.env.MONGODB_DATABASE_NAME);

// Validate environment variables
const envSchema = z.object({
  MONGODB_URI: z.string().nonempty("MONGODB_URI is missing in .env file"),
  MONGODB_DATABASE_NAME: z
    .string()
    .nonempty("MONGODB_DATABASE_NAME is missing in .env file"),
});

// Parse and export
export const env = (() => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Invalid environment variables:\n", result.error.format());
    process.exit(1);
  }
  return result.data;
})();



