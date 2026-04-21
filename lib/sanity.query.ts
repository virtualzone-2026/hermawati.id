import { client } from "./sanity.client";
import { groq } from "next-sanity";

const revalidateConfig = { next: { revalidate: 0 } };
const excerpt = `coalesce(array::join(string::split(pt::text(body), "")[0...140], ""), "") + "..."`;

/**
 * 1. DETAIL POSTINGAN
 */
export async function getSinglePost(slug: string) {
  if (!slug) return null;
  return client.fetch(groq`*[_type == "post" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, "image": mainImage.asset->url, publishedAt,
    "category": category->title, 
    "categorySlug": coalesce(category->slug.current, "berita"), 
    body, author-> { name, "image": image.asset->url }
  }`, { slug }, revalidateConfig);
}

/**
 * 🔥 2. POST BERDASARKAN KATEGORI (FIX BUILD ERROR)
 * Ini fungsi yang dicari file /app/category/[category]/page.tsx
 */
export async function getPostsByCategory(categorySlug: string) {
  if (!categorySlug) return [];
  return client.fetch(groq`*[_type == "post" && coalesce(category->slug.current, "berita") == $categorySlug] | order(publishedAt desc) {
    _id, title, "slug": slug.current, "image": mainImage.asset->url, publishedAt,
    "category": category->title, "categorySlug": coalesce(category->slug.current, "berita"),
    "excerpt": ${excerpt}
  }`, { categorySlug }, revalidateConfig);
}

/**
 * 3. TERKAIT (FIX: 4 POST SEKALIAN)
 */
export async function getRelatedPosts(categorySlug: string, currentSlug: string) {
  const finalCat = categorySlug || "berita";
  return client.fetch(groq`*[_type == "post" && coalesce(category->slug.current, "berita") == $finalCat && slug.current != $currentSlug] | order(publishedAt desc)[0...4] {
    _id, title, "slug": slug.current, "image": mainImage.asset->url,
    "categorySlug": coalesce(category->slug.current, "berita")
  }`, { finalCat, currentSlug }, revalidateConfig);
}

/**
 * 4. TERPOPULER (SIDEBAR)
 */
export async function getPopularPosts() {
  return client.fetch(groq`*[_type == "post"] | order(publishedAt desc)[0...5] {
    _id, title, "slug": slug.current, "image": mainImage.asset->url, 
    "categorySlug": coalesce(category->slug.current, "berita")
  }`, {}, revalidateConfig);
}

/**
 * 5. FUNGSI HOMEPAGE (Mencegah Export Error)
 */
export async function getAllPosts() {
  return client.fetch(groq`*[_type == "post"] | order(publishedAt desc)[0...15] { 
    _id, title, "slug": slug.current, "image": mainImage.asset->url, publishedAt, 
    "categorySlug": coalesce(category->slug.current, "berita") 
  }`, {}, revalidateConfig);
}

export async function getArticlePosts() {
  return client.fetch(groq`*[_type == "post" && category->slug.current == "artikel"] | order(publishedAt desc)[0...6] {
    _id, title, "slug": slug.current, "image": mainImage.asset->url,
    "categorySlug": "artikel"
  }`, {}, revalidateConfig);
}

export async function getLatestPosts() {
  return client.fetch(groq`*[_type == "post"] | order(publishedAt desc)[0...10] { 
    _id, title, "slug": slug.current, "image": mainImage.asset->url, publishedAt, 
    "category": category->title, "categorySlug": coalesce(category->slug.current, "berita"), 
    "excerpt": ${excerpt} 
  }`, {}, revalidateConfig);
}

export async function getEducationPosts() {
  return client.fetch(groq`*[_type == "post"] | order(select(category->slug.current == "pendidikan" => 0, 1) asc, publishedAt desc)[0...6] { 
    _id, title, "slug": slug.current, "image": mainImage.asset->url, 
    "categorySlug": coalesce(category->slug.current, "pendidikan") 
  }`, {}, revalidateConfig);
}

export async function getNewsPosts() { return getEducationPosts(); }

export async function getDocumentPosts() {
  return client.fetch(groq`*[_type == "post" && defined(attachment)] | order(publishedAt desc)[0...5] { 
    _id, title, "slug": slug.current, publishedAt, "attachmentUrl": attachment.asset->url 
  }`, {}, revalidateConfig);
}

export async function searchPosts(term: string) {
  return client.fetch(groq`*[_type == "post" && (title match $term || category->title match $term || pt::text(body) match $term)] | order(publishedAt desc) {
    _id, title, "slug": slug.current, "image": mainImage.asset->url, publishedAt, 
    "categorySlug": coalesce(category->slug.current, "berita"), "excerpt": ${excerpt}
  }`, { term: `*${term}*` }, revalidateConfig);
}