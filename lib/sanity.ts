import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "jrxdv4ry", // ID Project baru kamu
  dataset: "production",
  apiVersion: "2024-01-01", // Sesuaikan dengan tanggal hari ini atau biarkan saja
  useCdn: false, // Set false biar data yang muncul selalu yang paling update
});

// --- INI DIA YANG HILANG GAES! ---
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}