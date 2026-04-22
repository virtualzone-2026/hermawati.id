"use client";

import { urlFor } from "@/lib/sanity";
import Link from "next/link";

// 1. Helper URL Konsisten (Penting agar tidak 404)
function getPostUrl(item: any) {
  const category = item.categorySlug || "berita";
  const slug = item.slug?.current || item.slug || "";
  return `/category/${category}/${slug}`;
}

// 2. Definisi Props agar TypeScript tidak marah (Solusi IntrinsicAttributes)
interface TopNewsProps {
  posts: any[];
}

export default function TopNews({ posts }: TopNewsProps) {
  // Ambil 5 berita teratas
  const topBarNews = posts?.slice(0, 5) || [];

  if (topBarNews.length === 0) {
    return (
      <div className="empty-state">
        Menyiapkan kabar terbaru untuk Anda...
      </div>
    );
  }

  /**
   * 🔥 FIX HYDRATION & VIEW LOGIC: 
   * Membuat angka view terlihat realistik & stabil (Server-Client Sinkron)
   */
  const getDisplayViews = (item: any) => {
    if (item.views) return item.views;
    // Jika tidak ada data view, buat angka stabil berdasarkan panjang judul
    const seed = item.title?.length || 10;
    const count = (seed % 5) + 1;
    const decimal = seed % 9;
    return `${count}.${decimal}k`;
  };

  return (
    <div className="top-news-container">
      <div className="top-news-grid">
        {topBarNews.map((item: any) => (
          <Link
            href={getPostUrl(item)}
            key={item._id}
            className="news-card-wrapper"
          >
            <div className="news-card">
              {/* THUMBNAIL AREA */}
              <div className="image-box">
                {item.mainImage ? (
                  <img
                    src={urlFor(item.mainImage).width(400).height(225).url()}
                    alt={item.title}
                    className="card-img"
                  />
                ) : (
                  <div className="placeholder-img">
                    <span>Hermawati</span>
                  </div>
                )}
                {/* Badge Kategori */}
                <div className="cat-badge">
                  {item.categoryName || "Inspirasi"}
                </div>
              </div>

              {/* TEXT AREA */}
              <div className="text-box">
                <h4 className="news-title">{item.title}</h4>
                <div className="news-meta">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span>{getDisplayViews(item)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .top-news-container {
          width: 100%;
          overflow: hidden;
        }

        .top-news-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          width: 100%;
        }

        .news-card-wrapper {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .news-card {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          background-color: #F9F6FB;
          box-shadow: 0 4px 12px rgba(93, 66, 124, 0.05);
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .news-card-wrapper:hover .card-img {
          transform: scale(1.1);
        }

        .placeholder-img {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #F0EAF5, #EADFF2);
          color: #B294D1;
          font-weight: 800;
          font-size: 10px;
          text-transform: uppercase;
        }

        .cat-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(93, 66, 124, 0.85);
          color: #fff;
          font-size: 8px;
          font-weight: 900;
          padding: 3px 8px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(8px);
          z-index: 2;
        }

        .text-box {
          padding: 12px 2px;
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
          transition: color 0.3s ease;
        }

        .news-card-wrapper:hover .news-title {
          color: #5D427C;
        }

        .news-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          color: #B294D1;
          font-weight: 800;
        }

        .empty-state {
          text-align: center;
          padding: 30px;
          color: #B294D1;
          font-style: italic;
          font-size: 13px;
          border: 1px dashed #EADFF2;
          border-radius: 12px;
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 1100px) {
          .top-news-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 900px) {
          .top-news-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 650px) {
          .top-news-grid { 
            display: flex;
            overflow-x: auto;
            gap: 15px;
            padding-bottom: 10px;
            scroll-snap-type: x mandatory;
            scrollbar-width: none; /* Hide scrollbar Firefox */
          }
          .top-news-grid::-webkit-scrollbar { display: none; } /* Hide scrollbar Chrome/Safari */
          
          .news-card-wrapper {
            min-width: 180px;
            flex-shrink: 0;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </div>
  );
}