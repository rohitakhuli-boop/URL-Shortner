import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { shortenedRouter } from "./routes/shortener.routes.js";
import { authRoutes } from "./routes/auth.routes.js";  // ✅ FIX: import authRoutes

const PORT = 3001;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Routers
app.use(authRoutes);   // now works
app.use("/", shortenedRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});



