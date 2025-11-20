import { Router } from "express";
import {
  postURLshortener,
  getShortenerPage,
  redirectToShortLink
} from "../controllers/postshortner.controller.js";

const router = Router();

// Homepage
router.get("/", getShortenerPage);

// ✅ Match your form action="/shorten"
router.post("/shorten", postURLshortener);

// Redirect route
router.get("/:shortcode", redirectToShortLink);

export const shortenedRouter = router;


