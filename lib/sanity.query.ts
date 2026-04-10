// lib/sanity.query.ts
import { client } from "./sanity.client";
import { groq } from "next-sanity";

// Konfigurasi revalidate agar data selalu fresh (PENTING untuk web live)
const revalidateConfig = { next: { revalidate: 0 } };

/**
 * 1. Ambil SEMUA postingan terbaru (Homepage)
 */
export async function getAllPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc)[0...10] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      subCategory
    }`,
    {},
    revalidateConfig
  );
}

/**
 * 2. Ambil Berita Terbaru (Headline)
 */
export async function getNewsPosts() {
  return client.fetch(
    groq`*[_type == "post" && category == "berita"] | order(publishedAt desc)[0...6] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "category": "Berita"
    }`,
    {},
    revalidateConfig
  );
}

/**
 * 3. Fungsi Dinamis Rubrik (Mendukung filter Kategori Induk atau Sub-Kategori)
 */
export async function getPostsByCategory(categoryName: string) {
  return client.fetch(
    groq`*[_type == "post" && (category == $categoryName || subCategory == $categoryName)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      subCategory,
      "excerpt": array::join(string::split(pt::text(body), "")[0...150], "") + "..."
    }`,
    { categoryName },
    revalidateConfig
  );
}

/**
 * 4. Ambil Detail Konten (LENGKAP dengan PDF/PPT & Author)
 */
export async function getSinglePost(slug: string) {
  if (!slug) return null;
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      category,
      subCategory,
      body,
      author,
      "attachmentUrl": attachment.asset->url,
      "attachmentDescription": attachment.description
    }`,
    { slug },
    revalidateConfig
  );
}

/**
 * 5. Ambil Khutbah Terbaru (Sidebar)
 */
export async function getKhutbahPosts() {
  return client.fetch(
    groq`*[_type == "post" && category == "khutbah"] | order(publishedAt desc)[0...5] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      publishedAt,
      "category": "Khutbah"
    }`,
    {},
    revalidateConfig
  );
}

/**
 * 6. Ambil Postingan Terkait (Bawah Artikel)
 */
export async function getRelatedPosts(category: string, currentSlug: string) {
  return client.fetch(
    groq`*[_type == "post" && category == $category && slug.current != $currentSlug][0...3] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url
    }`,
    { category, currentSlug },
    revalidateConfig
  );
}