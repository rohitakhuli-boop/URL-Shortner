// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import { readFile, writeFile } from "fs/promises";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const DATA_FILE = join(__dirname, "../data/links.json");

// export const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await writeFile(DATA_FILE, JSON.stringify({}, null, 2));
//       return {};
//     }
//     throw error;
//   }
// };

// export const saveLinks = async (links) => {
//   try {
//     await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
//   } catch (error) {
//     console.error("Error saving links:", error);
//     throw error;
//   }
// };
import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";
const db=dbClient.db(env.MONGODB_DATABASE_NAME)
const shortenerCollection=db.collection("shorteners")
export const loadLinks=async()=>{
  return shortenerCollection.find().toArray();
}
export const saveLinks=async(link)=>{
  return shortenerCollection.insertOne(link);
}
export const getLinkByShortCode=async(shortCode)=>{
  return await shortenerCollection.findOne({shortcode:shortCode})
}