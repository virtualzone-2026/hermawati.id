"use client";

import { urlFor } from "@/lib/sanity";
import Link from "next/link";

interface TopNewsProps {
  posts: any[];
}

function getPostUrl(item: any) {
  const category = item.categorySlug || "berita";
  const slug = item.slug?.current || item.slug || "";
  return `/category/${category}/${slug}`;
}

export default function TopNews({ posts }: TopNewsProps) {
  const topBarNews = posts?.slice(0, 5) || [];

  if (topBarNews.length === 0) return null;

  const getDisplayViews = (item: any) => {
    if (item.views) return item.views;
    const seed = item.title?.length || 10;
    const count = (seed % 5) + 1;
    const decimal = seed % 9;
    return `${count}.${decimal}k`;
  };

  return (
    <div className="top-news-container">
      <div className="top-news-grid">
        {topBarNews.map((item: any, index: number) => (
          <Link
            href={getPostUrl(item)}
            key={item._id || index}
            className="news-card-wrapper"
          >
            <div className="news-card">
              {/* IMAGE BOX */}
              <div className="image-box">
                {item.mainImage ? (
                  <img
                    src={urlFor(item.mainImage).width(400).height(225).fit('crop').auto('format').url()}
                    alt={item.title}
                    className="card-img"
                  />
                ) : (
                  <div className="placeholder-img">Hermawati</div>
                )}
                <div className="cat-badge">
                  {item.categoryName || "Info"}
                </div>
              </div>

              {/* TEXT AREA */}
              <div className="text-box">
                <h4 className="news-title">{item.title}</h4>
                <div className="news-meta">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
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
          padding: 10px 0;
        }

        .top-news-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 15px;
        }

        .news-card-wrapper {
          text-decoration: none;
          display: block;
        }

        .image-box {
          position: relative;
          width: 100%;
          height: 140px; 
          /* 🔥 UPDATE: Rounded 8px (Halus tapi tetap Boxy) */
          border-radius: 8px; 
          overflow: hidden;
          background-color: #f0f0f0;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover; 
          display: block;
          transition: transform 0.3s ease;
        }

        .news-card-wrapper:hover .card-img {
          transform: scale(1.05);
        }

        .placeholder-img {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eee;
          color: #999;
          font-weight: 800;
          font-size: 12px;
        }

        .cat-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #5D427C;
          color: #fff;
          font-size: 8px;
          font-weight: 900;
          padding: 3px 10px;
          /* 🔥 UPDATE: Match dengan box (4px) */
          border-radius: 4px; 
          text-transform: uppercase;
        }

        .text-box {
          padding: 10px 2px;
        }

        .news-title {
          font-size: 13.5px;
          line-height: 1.4;
          font-weight: 800;
          color: #2D2438;
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 38px; 
        }

        .news-card-wrapper:hover .news-title {
          color: #5D427C;
        }

        .news-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: #B294D1;
          font-weight: 800;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 1100px) {
          .top-news-grid { grid-template-columns: repeat(4, 1fr); }
          .image-box { height: 120px; }
        }

        @media (max-width: 850px) {
          .top-news-grid { grid-template-columns: repeat(2, 1fr); }
          .image-box { height: 150px; }
        }

        @media (max-width: 500px) {
          .top-news-grid {
            display: flex;
            overflow-x: auto;
            padding: 0 20px 20px 20px;
            margin: 0 -20px;
            gap: 12px;
            scrollbar-width: none;
          }
          .news-card-wrapper { min-width: 220px; }
          .image-box { height: 125px; border-radius: 6px; }
        }
      `}</style>
    </div>
  );
}