import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { shortenedRouter } from "./routes/shortener.routes.js";
// import { PORT } from "./env.js";
const PORT=3001;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

// Router
app.use("/", shortenedRouter);

app.listen(PORT || 3000, () => {
  console.log(`🚀 Server running at http://localhost:${PORT || 3000}`);
});



