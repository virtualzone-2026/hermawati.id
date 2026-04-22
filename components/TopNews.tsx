"use client";

import { urlFor } from "@/lib/sanity";
import Link from "next/link";

// 🔥 helper URL Konsisten (Handle Sanity Slug Object)
function getPostUrl(item: any) {
  const category = item.categorySlug || "berita";
  const slug = item.slug?.current || item.slug || "";
  return `/category/${category}/${slug}`;
}

interface TopNewsProps {
  posts: any[];
}

export default function TopNews({ posts }: TopNewsProps) {
  // Ambil 5 berita dari data yang sudah ditarik di page.tsx
  const topBarNews = posts?.slice(0, 5) || [];

  if (topBarNews.length === 0) {
    return (
      <div className="empty-state">
        Menyiapkan kabar terbaru untuk Anda...
      </div>
    );
  }

  /**
   * 🔥 FIX HYDRATION ERROR: 
   * Kita buat angka view "random" tapi stabil berdasarkan panjang judul.
   * Jadi server dan client bakal nampilin angka yang sama persis.
   */
  const getFakeViews = (title: string) => {
    if (!title) return 150;
    return (title.length * 7) + 120; 
  };

  return (
    <div className="top-news-grid">
      {topBarNews.map((item: any) => (
        <Link
          href={getPostUrl(item)}
          key={item._id}
          className="news-card-wrapper"
        >
          <div className="news-card">
            {/* THUMBNAIL */}
            <div className="image-box">
              {item.mainImage ? (
                <img
                  src={urlFor(item.mainImage).width(400).height(225).url()}
                  alt={item.title}
                  className="card-img"
                />
              ) : (
                <div className="placeholder-img">Hermawati</div>
              )}
              {/* Badge Kategori Kecil */}
              <div className="cat-badge">
                {item.categoryName || item.category || "Inspirasi"}
              </div>
            </div>

            {/* TEXT INFO */}
            <div className="text-box">
              <h4 className="news-title">{item.title}</h4>
              <div className="news-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                {/* Pakai fungsi views yang stabil gaes! */}
                <span>{item.views || getFakeViews(item.title)}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}

      <style jsx>{`
        .top-news-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          width: 100%;
        }

        .news-card-wrapper {
          text-decoration: none;
          color: inherit;
        }

        .news-card {
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .news-card:hover {
          transform: translateY(-5px);
        }

        .image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background-color: #f8f6fa;
          box-shadow: 0 4px 15px rgba(93, 66, 124, 0.06);
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.5s ease;
        }

        .news-card:hover .card-img {
          transform: scale(1.1);
        }

        .placeholder-img {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B294D1;
          font-weight: 800;
          font-size: 11px;
        }

        .cat-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(93, 66, 124, 0.9);
          color: #fff;
          font-size: 8px;
          font-weight: 900;
          padding: 3px 7px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(4px);
        }

        .text-box {
          padding: 12px 0;
        }

        .news-title {
          font-size: 13px;
          line-height: 1.4;
          font-weight: 800;
          color: #2D2438;
          margin: 0 0 6px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s;
        }

        .news-card:hover .news-title {
          color: #5D427C;
        }

        .news-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: #B294D1;
          font-weight: 700;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #B294D1;
          font-style: italic;
          border: 1px dashed #f0eaf5;
          border-radius: 16px;
        }

        /* RESPONSIVE */
        @media (max-width: 1200px) {
          .top-news-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 1024px) {
          .top-news-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 600px) {
          .top-news-grid { 
            display: flex;
            overflow-x: auto;
            padding-bottom: 15px;
            gap: 15px;
            scrollbar-width: none;
          }
          .news-card-wrapper {
            min-width: 200px;
            flex-shrink: 0;
          }
        }
      `}</style>
    </div>
  );
}