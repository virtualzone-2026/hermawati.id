"use client";

import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { useState, useEffect } from "react";

// 🔥 helper URL: Kunci agar link tidak error dan SEO ramah
function getPostUrl(post: any) {
  const catSlug = post.categorySlug?.current || post.categorySlug || "berita";
  const postSlug = post.slug?.current || post.slug || "";
  return `/category/${catSlug}/${postSlug}`;
}

export default function RecommendationSection({ posts }: { posts: any[] }) {
  const [shuffledData, setShuffledData] = useState<any[]>([]);

  // Efek shuffle: Memberikan kesan web selalu "fresh" setiap dikunjungi
  useEffect(() => {
    if (posts && posts.length > 0) {
      const shuffled = [...posts]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      setShuffledData(shuffled);
    }
  }, [posts]);

  // Warna kategori sinkron dengan Branding Hermawati
  const getCategoryColor = (slug: any) => {
    const s = typeof slug === 'object' ? slug.current : slug;
    switch (s?.toLowerCase()) {
      case "pendidikan": return "#5D427C";
      case "parenting": return "#B294D1";
      case "ruang-opini": return "#D4AF37";
      case "pustaka-dokumen": return "#198754";
      default: return "#5D427C";
    }
  };

  if (!posts || posts.length === 0) return null;

  return (
    <section className="recommendation-wrapper">
      <div className="recommendation-header">
        <h2 className="recommendation-title">
          REKOMENDASI <span className="lavender-text">PILIHAN</span>
        </h2>

        <Link href="/category/pendidikan" className="see-all-link">
          JELAJAH SEMUA ➔
        </Link>
      </div>

      <div className="recommendation-grid">
        {shuffledData.map((item: any) => (
          <Link
            href={getPostUrl(item)}
            key={item._id}
            className="recommendation-card"
          >
            {/* Kontainer Gambar dengan Aspect Ratio Premium */}
            <div className="image-container">
              {item.mainImage ? (
                <img
                  src={urlFor(item.mainImage).width(500).height(320).url()}
                  alt={item.title}
                  className="card-image"
                />
              ) : (
                <div className="placeholder-img">
                  <span>Hermawati</span>
                </div>
              )}
            </div>

            {/* Label Kategori dengan Background Soft */}
            <span
              style={{ 
                color: getCategoryColor(item.categorySlug),
                background: `${getCategoryColor(item.categorySlug)}10` 
              }}
              className="category-label"
            >
              {item.categoryName || "Inspirasi"}
            </span>

            <h3 className="card-title">{item.title}</h3>
            
            <div className="card-footer">
               <span>Selengkapnya</span>
               <span className="arrow">→</span>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .recommendation-wrapper {
          margin-top: 30px;
          padding: 10px 0;
          width: 100%;
        }
        .recommendation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 35px;
          border-bottom: 1px solid #f0eaf5;
          padding-bottom: 15px;
        }
        .recommendation-title {
          font-size: 24px;
          color: #2d2438;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .lavender-text { color: #b294d1; }
        .see-all-link {
          font-size: 11px;
          color: #5d427c;
          text-decoration: none;
          font-weight: 900;
          letter-spacing: 1px;
          transition: 0.3s;
          padding: 8px 15px;
          background: #f9f6fb;
          border-radius: 10px;
        }
        .see-all-link:hover { 
          background: #5d427c;
          color: #fff;
        }

        .recommendation-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 35px;
        }

        .recommendation-card {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: 0.3s;
        }
        .image-container {
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 18px;
          background-color: #f8f6fa;
          box-shadow: 0 10px 25px rgba(93, 66, 124, 0.06);
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
        }
        .recommendation-card:hover .card-image {
          transform: scale(1.1);
        }
        .placeholder-img {
          width: 100%; height: 100%; display: flex; align-items: center; 
          justify-content: center; color: #b294d1; font-weight: 800; font-size: 12px;
          background: linear-gradient(135deg, #f9f6fb, #eadff2);
        }
        .category-label {
          font-size: 10px;
          font-weight: 800;
          display: inline-block;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 8px;
        }
        .card-title {
          font-size: 18px;
          font-weight: 800;
          line-height: 1.5;
          margin: 0;
          color: #2d2438;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s;
        }
        .card-footer {
          margin-top: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: #b294d1;
          opacity: 0;
          transform: translateX(-10px);
          transition: 0.3s;
        }
        .recommendation-card:hover .card-footer {
          opacity: 1;
          transform: translateX(0);
        }
        .recommendation-card:hover .card-title {
          color: #5d427c;
        }

        @media (max-width: 992px) {
          .recommendation-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .recommendation-grid { grid-template-columns: 1fr; gap: 30px; }
          .recommendation-title { font-size: 20px; }
        }
      `}</style>
    </section>
  );
}