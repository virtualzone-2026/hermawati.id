"use client";

import { getAllPosts } from "@/lib/sanity.query";
import { urlFor } from "@/lib/sanity"; // 🔥 Tambahkan helper ini
import Link from "next/link";
import { useState, useEffect } from "react";

// 🔥 helper URL (WAJIB konsisten)
function getPostUrl(post: any) {
  const category = post.categorySlug || "berita";
  const slug = post.slug?.current || post.slug || "";
  return `/category/${category}/${slug}`;
}

export default function LatestPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllPosts();
        setPosts(data || []);
      } catch (err) {
        console.error("Gagal load posts:", err);
      }
    }
    fetchData();
  }, []);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case "pendidikan": return "#5D427C";
      case "parenting": return "#B294D1";
      case "opini": return "#8E79A5";
      case "dokumen": return "#4A3B5E";
      default: return "#5D427C";
    }
  };

  return (
    <section style={{ marginTop: "20px", paddingBottom: "50px" }}>
      <div>
        <h2 style={{
            fontSize: "22px",
            color: "#5D427C",
            fontWeight: "900",
            marginBottom: "35px",
            borderBottom: "4px solid #B294D1",
            display: "inline-block",
            paddingBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
          Postingan <span style={{ color: "#B294D1" }}>Terbaru</span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "35px", minHeight: "400px" }}>
          {currentPosts.map((post: any) => (
            <Link href={getPostUrl(post)} key={post._id} style={{ display: "flex", gap: "25px", textDecoration: "none", alignItems: "flex-start" }} className="group">
              
              {/* Thumbnail - SEKARANG MUNCUL GAMBARNYA */}
              <div style={{
                  width: "220px",
                  height: "140px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "#f8f6fa",
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
                    transition: "transform 0.4s",
                  }}
                  className="group-hover:scale-110"
                />
              </div>

              {/* Konten */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <span style={{
                    fontSize: "11px",
                    color: getCategoryColor(post.categorySlug),
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}>
                  {post.categoryName || post.categorySlug || "Inspirasi"}
                </span>

                <h3 style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    color: "#2D2438",
                    margin: 0,
                    lineHeight: "1.4",
                    transition: "color 0.3s",
                  }}
                  className="group-hover:text-purple-700"
                >
                  {post.title}
                </h3>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "#888" }}>
                  <span>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                  </span>
                  <span>•</span>
                  <span style={{ color: "#B294D1", fontWeight: "bold" }}>
                    {post.authorName || post.author?.name || "Admin"}
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <p style={{ color: "#B294D1", fontStyle: "italic", textAlign: "center" }}>Menyiapkan bacaan untuk Anda...</p>
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div style={{ display: "flex", gap: "12px", marginTop: "50px", alignItems: "center", justifyContent: "center" }}>
            <button onClick={() => { setCurrentPage((prev) => Math.max(prev - 1, 1)); window.scrollTo(0, 0); }} disabled={currentPage === 1} style={{ padding: "10px 18px", borderRadius: "30px", border: "1px solid #f0eaf5", backgroundColor: currentPage === 1 ? "#f5f5f5" : "#fff", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: "800", color: "#5D427C", fontSize: "12px" }}>PREV</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} onClick={() => { setCurrentPage(i + 1); window.scrollTo(0, 0); }} style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #f0eaf5", backgroundColor: currentPage === i + 1 ? "#5D427C" : "#fff", color: currentPage === i + 1 ? "#fff" : "#5D427C", cursor: "pointer", fontWeight: "800" }}>{i + 1}</button>
            ))}
            <button onClick={() => { setCurrentPage((prev) => Math.min(prev + 1, totalPages)); window.scrollTo(0, 0); }} disabled={currentPage === totalPages} style={{ padding: "10px 18px", borderRadius: "30px", border: "1px solid #f0eaf5", backgroundColor: currentPage === totalPages ? "#f5f5f5" : "#fff", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: "800", color: "#5D427C", fontSize: "12px" }}>NEXT</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .group:hover h3 { color: #5d427c !important; }
        .group:hover img { transform: scale(1.05); }
      `}</style>
    </section>
  );
}