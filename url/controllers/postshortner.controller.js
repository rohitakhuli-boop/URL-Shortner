// import crypto from "crypto";
// import { loadLinks, saveLinks } from "../models/shortener.model.js";

// // GET Homepage
// export const getShortenerPage = async (req, res) => {
//   try {
//     const links = await loadLinks();
//     return res.render("index", { links, host: req.get("host") });
//   } catch (error) {
//     console.error("Error loading homepage:", error);
//     res.status(500).send("Internal server error");
//   }
// };

// // POST - shorten URL
// export const postURLshortener = async (req, res) => {
//   try {
//     const { url, shortcode } = req.body;
//     if (!url) return res.status(400).send("URL is required");

//     try {
//       new URL(url);
//     } catch {
//       return res.status(400).send("Invalid URL format");
//     }

//     const links = await loadLinks();
//     let finalShortcode = shortcode?.trim() || crypto.randomBytes(4).toString("hex");

//     while (links[finalShortcode]) {
//       finalShortcode = crypto.randomBytes(4).toString("hex");
//     }

//     links[finalShortcode] = url;
//     await saveLinks(links);
//     // await saveLinks({url,shortcode});

//     console.log("✅ New link saved:", finalShortcode, "=>", url);

//     res.redirect("/");
//   } catch (error) {
//     console.error("Error saving link:", error);
//     res.status(500).send("Internal server error");
//   }
// };

// // GET - redirect to original URL
// export const redirectToShortLink = async (req, res) => {
//   try {
//     const { shortcode } = req.params;
//     const links = await loadLinks();

//     if (!links[shortcode]) {
//       return res.status(404).send("404 - Short URL not found");
//     }

//     res.redirect(links[shortcode]);
//   } catch (error) {
//     console.error("Error redirecting:", error);
//     res.status(500).send("Internal server error");
//   }
// };
import crypto from "crypto";
import { loadLinks, saveLinks,getLinkByShortCode } from "../models/shortener.model.js";

// GET Homepage
export const getShortenerPage = async (req, res) => {
  try {
    const links = await loadLinks();
    return res.render("index", { links, host: req.get("host") });
  } catch (error) {
    console.error("Error loading homepage:", error);
    res.status(500).send("Internal server error");
  }
};

// POST - shorten URL
export const postURLshortener = async (req, res) => {
  try {
    const { url, shortcode } = req.body;
    if (!url) return res.status(400).send("URL is required");

    try {
      new URL(url);
    } catch {
      return res.status(400).send("Invalid URL format");
    }

    const links = await loadLinks();
    let finalShortcode = shortcode?.trim() || crypto.randomBytes(4).toString("hex");

    while (links[finalShortcode]) {
      finalShortcode = crypto.randomBytes(4).toString("hex");
    }

    // links[finalShortcode] = url;
    // await saveLinks(links);
     await saveLinks({url,shortcode});

    console.log("✅ New link saved:", finalShortcode, "=>", url);

    res.redirect("/");
  } catch (error) {
    console.error("Error saving link:", error);
    res.status(500).send("Internal server error");
  }
};

// GET - redirect to original URL
export const redirectToShortLink = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const link = await getLinkByShortCode(shortcode); // <-- move this line up

    if (!link) {
      return res.status(404).send("404 - Short URL not found");
    }

    res.redirect(link.url);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).send("Internal server error");
  }
};




