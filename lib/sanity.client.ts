import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "jrxdv4ry", // Ganti dengan Project ID Sanity Anda
  dataset: "production",        // Biasanya "production"
  apiVersion: "2024-01-01",     // Gunakan tanggal hari ini atau versi terbaru
  useCdn: false,                // Set ke false agar data selalu terbaru (fresh)
});