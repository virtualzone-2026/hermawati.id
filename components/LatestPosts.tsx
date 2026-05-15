"use client";

import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { useState, useEffect } from "react";

type LatestPostsProps = {
  initialPosts: any[];
};

function getPostUrl(post: any) {
  const category = post.categorySlug || "berita";
  const slug = post.slug?.current || post.slug || "";
  return `/category/${category}/${slug}`;
}

export default function LatestPosts({ initialPosts }: LatestPostsProps) {
  const [posts] = useState<any[]>(initialPosts || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const postsPerPage = 6;

  // Mencegah Hydration Error pada Tanggal
  useEffect(() => { setIsClient(true); }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const getCategoryColor = (slug: string) => {
    switch (slug?.toLowerCase()) {
      case "pendidikan": return "#5D427C";
      case "parenting": return "#B294D1";
      case "ruang-opini": return "#D4AF37";
      default: return "#5D427C";
    }
  };

  return (
    <section style={{ width: '100%', paddingBottom: "60px" }}>
      {/* HEADER SEKSI - Simpel & Elegan */}
      <div style={{ marginBottom: "35px", borderLeft: "6px solid #B294D1", paddingLeft: "15px" }}>
        <h2 style={{ fontSize: "22px", color: "#5D427C", fontWeight: "900", margin: 0 }}>
          POSTINGAN <span style={{ color: "#B294D1" }}>TERBARU</span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {currentPosts.map((post: any) => (
          <Link 
            href={getPostUrl(post)} 
            key={post._id} 
            style={{ display: "flex", gap: "20px", textDecoration: "none", color: "inherit" }}
            className="post-item-row"
          >
            {/* 1. Thumbnail Area - Height Fix & Soft Rounded */}
            <div style={{ 
              width: "220px", 
              height: "140px", 
              flexShrink: 0, 
              borderRadius: "12px", 
              overflow: "hidden", 
              background: "#f8f6fa",
              position: "relative"
            }}>
              <img
                src={post.mainImage ? urlFor(post.mainImage).width(400).height(250).fit('crop').url() : "/placeholder.png"}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* 2. Content Area */}
            <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingTop: "4px" }}>
              <span style={{ 
                fontSize: "10px", 
                fontWeight: "900", 
                color: getCategoryColor(post.categorySlug), 
                textTransform: "uppercase",
                marginBottom: "8px",
                letterSpacing: "0.5px"
              }}>
                {post.categoryName || "Inspirasi"}
              </span>

              <h3 className="post-title" style={{ 
                fontSize: "18px", 
                fontWeight: "800", 
                color: "#2D2438", 
                margin: "0 0 10px 0", 
                lineHeight: "1.4",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}>
                {post.title}
              </h3>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#94A3B8" }}>
                <span style={{ fontWeight: "700", color: "#5D427C" }}>{post.authorName || post.author?.name || "Admin"}</span>
                <span>•</span>
                <span>{isClient && post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "-"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "50px" }}>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i + 1} 
              onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 400, behavior: 'smooth' }); }} 
              style={{
                width: "40px", height: "40px", borderRadius: "8px", border: "none",
                backgroundColor: currentPage === i + 1 ? "#5D427C" : "#F3EDF7",
                color: currentPage === i + 1 ? "#fff" : "#5D427C",
                cursor: "pointer", fontWeight: "900", transition: "0.3s"
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .post-item-row { transition: all 0.2s ease; }
        .post-item-row:hover .post-title { color: #5D427C !important; }
        
        @media (max-width: 768px) {
          .post-item-row { flex-direction: column !important; gap: 15px !important; }
          .post-item-row div:first-child { width: 100% !important; height: 180px !important; }
          .post-title { fontSize: 17px !important; }
        }
      `}</style>
    </section>
  );
}