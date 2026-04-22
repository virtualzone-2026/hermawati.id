"use client";

import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { useState } from "react";

// 1. Definisi Tipe Data agar Build Sukses
type LatestPostsProps = {
  initialPosts: any[];
};

// 2. Helper URL (Kunci konsistensi agar tidak 404)
function getPostUrl(post: any) {
  const category = post.categorySlug || "berita";
  const slug = post.slug?.current || post.slug || "";
  return `/category/${category}/${slug}`;
}

export default function LatestPosts({ initialPosts }: LatestPostsProps) {
  // Gunakan data dari props sebagai state awal
  const [posts] = useState<any[]>(initialPosts || []);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8; // Dikurangi sedikit agar tidak terlalu panjang

  // Logika Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Warna kategori sesuai Brand Hermawati
  const getCategoryColor = (slug: string) => {
    switch (slug?.toLowerCase()) {
      case "pendidikan": return "#5D427C";
      case "parenting": return "#B294D1";
      case "ruang-opini": return "#D4AF37";
      case "pustaka-dokumen": return "#198754";
      default: return "#5D427C";
    }
  };

  return (
    <section style={{ paddingBottom: "50px" }}>
      <div>
        {/* HEADER SEKSI */}
        <h2 style={{
            fontSize: "22px",
            color: "#5D427C",
            fontWeight: "900",
            marginBottom: "40px",
            borderBottom: "4px solid #B294D1",
            display: "inline-block",
            paddingBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
          POSTINGAN <span style={{ color: "#B294D1" }}>TERBARU</span>
        </h2>

        {/* LIST POSTINGAN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "35px", minHeight: "400px" }}>
          {currentPosts.map((post: any) => (
            <Link 
              href={getPostUrl(post)} 
              key={post._id} 
              style={{ display: "flex", gap: "25px", textDecoration: "none", alignItems: "start" }} 
              className="news-item-group"
            >
              {/* Thumbnail */}
              <div style={{
                  width: "240px",
                  height: "150px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "#F9F6FB",
                  boxShadow: "0 4px 15px rgba(93, 66, 124, 0.08)",
                }}>
                <img
                  src={
                    (post.mainImage || post.image) 
                      ? urlFor(post.mainImage || post.image).width(400).height(250).url() 
                      : "https://via.placeholder.com/400x250?text=Hermawati"
                  }
                  alt={post.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  className="news-img"
                />
              </div>

              {/* Konten Teks */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "5px" }}>
                <span style={{
                    fontSize: "11px",
                    color: getCategoryColor(post.categorySlug),
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    background: `${getCategoryColor(post.categorySlug)}15`,
                    padding: "4px 10px",
                    borderRadius: "8px",
                    display: "inline-block",
                    width: "fit-content"
                  }}>
                  {post.categoryName || "Inspirasi"}
                </span>

                <h3 style={{
                    fontSize: "20px",
                    fontWeight: "900",
                    color: "#2D2438",
                    margin: 0,
                    lineHeight: "1.4",
                    transition: "color 0.3s",
                  }}
                  className="news-title"
                >
                  {post.title}
                </h3>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#94A3B8", fontWeight: 600 }}>
                  <span>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                  </span>
                  <span style={{ color: "#EADFF2" }}>•</span>
                  <span style={{ color: "#B294D1", fontWeight: "800" }}>
                    {post.authorName || post.author?.name || "Admin"}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div style={{ textAlign: "center", padding: "50px", color: "#B294D1" }}>
               <p style={{ fontStyle: "italic" }}>Belum ada kiriman terbaru gaes...</p>
            </div>
          )}
        </div>

        {/* PAGINATION PREMIUM */}
        {totalPages > 1 && (
          <div style={{ display: "flex", gap: "10px", marginTop: "60px", alignItems: "center", justifyContent: "center" }}>
            <button 
              onClick={() => { setCurrentPage((p) => Math.max(p - 1, 1)); window.scrollTo({ top: 500, behavior: 'smooth' }); }} 
              disabled={currentPage === 1}
              style={{ padding: "12px 20px", borderRadius: "15px", border: "1px solid #F0EAF5", backgroundColor: "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "800", color: "#5D427C", fontSize: "12px", opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              PREV
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i + 1} 
                onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 500, behavior: 'smooth' }); }} 
                style={{ 
                  width: "45px", height: "45px", borderRadius: "15px", border: "none",
                  backgroundColor: currentPage === i + 1 ? "#5D427C" : "#F9F6FB", 
                  color: currentPage === i + 1 ? "#fff" : "#5D427C", 
                  cursor: "pointer", fontWeight: "900", transition: "0.3s"
                }}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => { setCurrentPage((p) => Math.min(p + 1, totalPages)); window.scrollTo({ top: 500, behavior: 'smooth' }); }} 
              disabled={currentPage === totalPages}
              style={{ padding: "12px 20px", borderRadius: "15px", border: "1px solid #F0EAF5", backgroundColor: "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "800", color: "#5D427C", fontSize: "12px", opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              NEXT
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .news-item-group:hover .news-title { color: #5D427C !important; }
        .news-item-group:hover .news-img { transform: scale(1.08); }
        
        @media (max-width: 600px) {
          .news-item-group { flex-direction: column; gap: 15px !important; }
          .news-item-group div:first-child { width: 100% !important; height: 200px !important; }
        }
      `}</style>
    </section>
  );
}