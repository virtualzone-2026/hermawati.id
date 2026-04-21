"use client";

import { getAllPosts } from "@/lib/sanity.query";
import Link from "next/link";
import { useState, useEffect } from "react";

// 🔥 helper URL (WAJIB biar konsisten)
function getPostUrl(post: any) {
  const category = post.categorySlug || "berita";
  return `/category/${category}/${post.slug}`;
}

export default function RecommendationSection() {
  const [recommendedData, setRecommendedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const allData = await getAllPosts();

        if (allData && allData.length > 0) {
          // shuffle aman
          const shuffled = [...allData]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);

          setRecommendedData(shuffled);
        }
      } catch (error) {
        console.error("Gagal mengambil data rekomendasi:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 🔥 pakai categorySlug biar konsisten
  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "pendidikan":
        return "#5D427C";
      case "parenting":
        return "#B294D1";
      case "opini":
        return "#8E79A5";
      case "dokumen":
        return "#4A3B5E";
      default:
        return "#7a6a8a";
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "60px 0",
          textAlign: "center",
          color: "#B294D1",
          fontStyle: "italic",
        }}
      >
        Memilih inspirasi terbaik...
      </div>
    );
  }

  if (!loading && recommendedData.length === 0) return null;

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
        {recommendedData.map((item: any) => (
          <Link
            href={getPostUrl(item)} // ✅ FIX DI SINI
            key={item._id}
            className="recommendation-card group"
          >
            <div className="image-container">
              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/400x250?text=Inspirasi"
                }
                alt={item.title}
                className="card-image"
              />
            </div>

            <span
              style={{
                color: getCategoryColor(item.categorySlug), // ✅ FIX
              }}
              className="category-label"
            >
              {item.category || item.categorySlug || "Inspirasi"}
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
          border-bottom: 1px solid #f0eaf5;
          padding-bottom: 15px;
        }
        .recommendation-title {
          font-size: 24px;
          color: #5d427c;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .lavender-text {
          color: #b294d1;
        }
        .see-all-link {
          font-size: 12px;
          color: #b294d1;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 1px;
          transition: 0.3s;
        }
        .see-all-link:hover {
          color: #5d427c;
        }

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
          height: 180px;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 15px;
          background-color: #f8f6fa;
          box-shadow: 0 4px 15px rgba(93, 66, 124, 0.08);
        }
        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .recommendation-card:hover .card-image {
          transform: scale(1.1);
        }
        .category-label {
          font-size: 11px;
          font-weight: 800;
          display: block;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }
        .card-title {
          font-size: 17px;
          font-weight: 800;
          line-height: 1.4;
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
          .recommendation-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .recommendation-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          .image-container {
            height: 220px;
          }
          .recommendation-title {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}