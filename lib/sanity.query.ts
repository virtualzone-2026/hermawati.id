import { client } from "./sanity"; 
import { groq } from "next-sanity";

// Konfigurasi revalidasi agar data selalu fresh (ISR 0 / Dynamic)
// Kita cast ke 'any' untuk menghindari konflik tipe internal di Next.js 16
const revalidateConfig = { next: { revalidate: 0 } } as any;

// Helper untuk mengambil teks murni dari body artikel untuk ringkasan (150 karakter)
const excerptLogic = `pt::text(body)[0...150] + "..."`;

/**
 * 1. SEMUA POSTINGAN (Homepage Utama)
 */
export async function getAllPosts() {
  return client.fetch<any[]>(
    groq`*[_type == "post"] | order(publishedAt desc)[0...15] { 
      _id, 
      title, 
      "slug": slug.current, 
      mainImage, 
      publishedAt, 
      "categoryName": coalesce(category->title, "Informasi"),
      "categorySlug": coalesce(category->slug.current, "berita"),
      "excerpt": ${excerptLogic},
      "authorName": author->name
    }`, 
    {}, 
    revalidateConfig
  );
}

/**
 * 2. DETAIL ARTIKEL TUNGGAL
 */
export async function getSinglePost(slug: string) {
  if (!slug) return null;
  return client.fetch<any>(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id, 
      title, 
      "slug": slug.current, 
      mainImage, 
      publishedAt,
      "categoryName": coalesce(category->title, "Informasi"), 
      "categorySlug": coalesce(category->slug.current, "berita"), 
      body, 
      author-> { name, image, bio }
    }`, 
    { slug }, 
    revalidateConfig
  );
}

/**
 * 3. ARTIKEL KHUSUS SIDEBAR
 */
export async function getArticlePosts() {
  return client.fetch<any[]>(
    groq`*[_type == "post" && (category->slug.current == "artikel" || !defined(category))] | order(publishedAt desc)[0...6] {
      _id, 
      title, 
      "slug": slug.current, 
      mainImage,
      publishedAt,
      "categoryName": coalesce(category->title, "Artikel"),
      "categorySlug": coalesce(category->slug.current, "artikel")
    }`, 
    {}, 
    revalidateConfig
  );
}

/**
 * 4. PENDIDIKAN (Featured)
 */
export async function getEducationPosts() {
  return client.fetch<any[]>(
    groq`*[_type == "post" && category->slug.current == "pendidikan"] | order(publishedAt desc)[0...6] { 
      _id, 
      title, 
      "slug": slug.current, 
      mainImage, 
      publishedAt,
      "categoryName": "Pendidikan",
      "categorySlug": "pendidikan" 
    }`, 
    {}, 
    revalidateConfig
  );
}

/**
 * 5. PUSTAKA DOKUMEN
 */
export async function getDocumentPosts() {
  return client.fetch<any[]>(
    groq`*[_type == "post" && defined(attachment)] | order(publishedAt desc)[0...5] { 
      _id, 
      title, 
      "slug": slug.current, 
      mainImage, 
      publishedAt, 
      "attachmentUrl": attachment.asset->url,
      "categorySlug": "pustaka-dokumen"
    }`, 
    {}, 
    revalidateConfig
  );
}

/**
 * 6. POSTINGAN BERDASARKAN KATEGORI
 */
export async function getPostsByCategory(categorySlug: string) {
  if (!categorySlug) return [];
  return client.fetch<any[]>(
    groq`*[_type == "post" && coalesce(category->slug.current, "berita") == $categorySlug] | order(publishedAt desc) {
      _id, 
      title, 
      "slug": slug.current, 
      mainImage, 
      publishedAt,
      "categoryName": coalesce(category->title, "Informasi"), 
      "categorySlug": coalesce(category->slug.current, "berita"),
      "excerpt": ${excerptLogic}
    }`, 
    { categorySlug }, 
    revalidateConfig
  );
}

/**
 * 7. ARTIKEL TERKAIT
 */
export async function getRelatedPosts(categorySlug: string, currentSlug: string) {
  return client.fetch<any[]>(
    groq`*[_type == "post" && slug.current != $currentSlug && (category->slug.current == $categorySlug || !defined(category))] | order(publishedAt desc)[0...4] {
      _id, 
      title, 
      "slug": slug.current, 
      mainImage, 
      publishedAt,
      "categorySlug": coalesce(category->slug.current, "berita")
    }`, 
    { categorySlug, currentSlug }, 
    revalidateConfig
  );
}

/**
 * 8. ARTIKEL TERPOPULER
 */
export async function getPopularPosts() {
  return client.fetch<any[]>(
    groq`*[_type == "post"] | order(publishedAt desc)[0...5] {
      _id, 
      title, 
      "slug": slug.current, 
      mainImage, 
      publishedAt,
      "categoryName": coalesce(category->title, "Populer"),
      "categorySlug": coalesce(category->slug.current, "berita")
    }`, 
    {}, 
    revalidateConfig
  );
}

/**
 * 9. FUNGSI PENCARIAN (SEARCH) - FIXED OVERLOAD ERROR
 */
export async function searchPosts(query: string) {
  const searchQuery = groq`*[_type == "post" && (title match $query || pt::text(body) match $query)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    "categoryName": coalesce(category->title, "Informasi"),
    "categorySlug": coalesce(category->slug.current, "berita"),
    author->{name, image}
  }`;

  // Kita gunakan 'as any' pada params dan options untuk bypass overload check
  return client.fetch<any[]>(
    searchQuery, 
    { query: `*${query}*` } as any, 
    revalidateConfig
  );
}

/**
 * 10. ALIAS & HELPER
 */
export async function getNewsPosts() { return getEducationPosts(); }
export async function getLatestPosts() { return getAllPosts(); }