import { client } from "./sanity"; // Pastikan file lib/sanity.ts sudah ada
import { groq } from "next-sanity";

const revalidateConfig = { next: { revalidate: 0 } };

// Perbaikan Excerpt: Lebih aman dan tidak bikin query berat
const excerptLogic = `pt::text(body)[0...150] + "..."`;

/**
 * 1. FUNGSI UTAMA HOMEPAGE
 * Menarik semua postingan tanpa terkecuali agar homepage tidak kosong
 */
export async function getAllPosts() {
  return client.fetch(groq`*[_type == "post"] | order(publishedAt desc)[0...15] { 
    _id, 
    title, 
    "slug": slug.current, 
    mainImage, 
    publishedAt, 
    "categoryName": coalesce(category->title, "Informasi"),
    "categorySlug": coalesce(category->slug.current, "berita"),
    "excerpt": ${excerptLogic}
  }`, {}, revalidateConfig);
}

/**
 * 2. DETAIL POSTINGAN
 */
export async function getSinglePost(slug: string) {
  if (!slug) return null;
  return client.fetch(groq`*[_type == "post" && slug.current == $slug][0] {
    _id, 
    title, 
    "slug": slug.current, 
    mainImage, 
    publishedAt,
    "categoryName": coalesce(category->title, "Informasi"), 
    "categorySlug": coalesce(category->slug.current, "berita"), 
    body, 
    author-> { name, image, bio }
  }`, { slug }, revalidateConfig);
}

/**
 * 3. ARTIKEL TERBARU (FEED)
 */
export async function getLatestPosts() {
  return client.fetch(groq`*[_type == "post"] | order(publishedAt desc)[0...10] { 
    _id, 
    title, 
    "slug": slug.current, 
    mainImage, 
    publishedAt, 
    "category": coalesce(category->title, "Informasi"), 
    "categorySlug": coalesce(category->slug.current, "berita"), 
    "excerpt": ${excerptLogic} 
  }`, {}, revalidateConfig);
}

/**
 * 4. ARTIKEL KHUSUS KATEGORI 'ARTIKEL' (Untuk Sidebar)
 */
export async function getArticlePosts() {
  return client.fetch(groq`*[_type == "post" && (category->slug.current == "artikel" || !defined(category))] | order(publishedAt desc)[0...6] {
    _id, title, "slug": slug.current, mainImage,
    "categorySlug": coalesce(category->slug.current, "artikel")
  }`, {}, revalidateConfig);
}

/**
 * 5. POST BERDASARKAN KATEGORI
 */
export async function getPostsByCategory(categorySlug: string) {
  if (!categorySlug) return [];
  return client.fetch(groq`*[_type == "post" && coalesce(category->slug.current, "berita") == $categorySlug] | order(publishedAt desc) {
    _id, title, "slug": slug.current, mainImage, publishedAt,
    "category": coalesce(category->title, "Informasi"), 
    "categorySlug": coalesce(category->slug.current, "berita"),
    "excerpt": ${excerptLogic}
  }`, { categorySlug }, revalidateConfig);
}

/**
 * 6. TERKAIT & TERPOPULER
 */
export async function getRelatedPosts(categorySlug: string, currentSlug: string) {
  return client.fetch(groq`*[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...4] {
    _id, title, "slug": slug.current, mainImage,
    "categorySlug": coalesce(category->slug.current, "berita")
  }`, { currentSlug }, revalidateConfig);
}

export async function getPopularPosts() {
  return client.fetch(groq`*[_type == "post"] | order(publishedAt desc)[0...5] {
    _id, title, "slug": slug.current, mainImage, 
    "categorySlug": coalesce(category->slug.current, "berita")
  }`, {}, revalidateConfig);
}

/**
 * 7. PENDIDIKAN & DOKUMEN
 */
export async function getEducationPosts() {
  return client.fetch(groq`*[_type == "post" && (category->slug.current == "pendidikan" || !defined(category))] | order(publishedAt desc)[0...6] { 
    _id, title, "slug": slug.current, mainImage, 
    "categorySlug": "pendidikan" 
  }`, {}, revalidateConfig);
}

export async function getDocumentPosts() {
  return client.fetch(groq`*[_type == "post" && defined(attachment)] | order(publishedAt desc)[0...5] { 
    _id, title, "slug": slug.current, mainImage, publishedAt, "attachmentUrl": attachment.asset->url 
  }`, {}, revalidateConfig);
}

// Fungsi bantu tambahan agar tidak error saat dipanggil
export async function getNewsPosts() { return getEducationPosts(); }