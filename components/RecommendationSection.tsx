"use client";

import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { useState, useEffect } from "react";

// helper URL biar konsisten dengan halaman lain
function getPostUrl(post: any) {
  const category = post.categorySlug || "berita";
  return `/category/${category}/${post.slug}`;
}

export default function RecommendationSection({ posts }: { posts: any[] }) {
  const [shuffledData, setShuffledData] = useState<any[]>([]);

  // Efek shuffle: Biar setiap refresh rekomendasinya ganti-ganti gaes!
  useEffect(() => {
    if (posts && posts.length > 0) {
      const shuffled = [...posts]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
      setShuffledData(shuffled);
    }
  }, [posts]);

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "pendidikan": return "#5D427C";
      case "parenting": return "#B294D1";
      case "opini": return "#8E79A5";
      case "dokumen": return "#4A3B5E";
      default: return "#7a6a8a";
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
          LIHAT SEMUA ❯
        </Link>
      </div>

      <div className="recommendation-grid">
        {shuffledData.map((item: any) => (
          <Link
            href={getPostUrl(item)}
            key={item._id}
            className="recommendation-card"
          >
            <div className="image-container">
              {item.mainImage ? (
                <img
                  src={urlFor(item.mainImage).width(400).height(250).url()}
                  alt={item.title}
                  className="card-image"
                />
              ) : (
                <div className="placeholder-img">No Image</div>
              )}
            </div>

            <span
              style={{ color: getCategoryColor(item.categorySlug) }}
              className="category-label"
            >
              {item.categoryName || "Inspirasi"}
            </span>

            <h3 className="card-title">{item.title}</h3>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .recommendation-wrapper {
          margin-top: 50px;
          padding: 20px 0;
          width: 100%;
        }
        .recommendation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #f0eaf5;
          padding-bottom: 15px;
        }
        .recommendation-title {
          font-size: 24px;
          color: #5d427c;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .lavender-text { color: #b294d1; }
        .see-all-link {
          font-size: 12px;
          color: #b294d1;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 1px;
          transition: 0.3s;
        }
        .see-all-link:hover { color: #5d427c; }

        .recommendation-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .recommendation-card {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .image-container {
          width: 100%;
          height: 190px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 15px;
          background-color: #f8f6fa;
          box-shadow: 0 8px 20px rgba(93, 66, 124, 0.08);
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .recommendation-card:hover .card-image {
          transform: scale(1.08);
        }
        .placeholder-img {
          width: 100%; height: 100%; display: flex; align-items: center; 
          justify-content: center; color: #ccc; font-size: 12px;
        }
        .category-label {
          font-size: 10px;
          font-weight: 900;
          display: block;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .card-title {
          font-size: 17px;
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
        .recommendation-card:hover .card-title {
          color: #5d427c;
        }

        @media (max-width: 992px) {
          .recommendation-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .recommendation-grid { grid-template-columns: 1fr; gap: 25px; }
          .image-container { height: 210px; }
          .recommendation-title { font-size: 20px; }
        }
      `}</style>
    </section>
  );
}