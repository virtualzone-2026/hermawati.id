import { getSinglePost, getRelatedPosts, getPopularPosts } from "@/lib/sanity.query";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import PostClient from "@/components/PostClient";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons"; 
import CategoryWidget from "@/components/CategoryWidget";
import { urlFor } from "@/lib/sanity"; 

// 1. HELPER: DETEKSI ARAB
function isArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

// 2. HELPER: DURASI BACA
function getReadingTime(body: any[]) {
  if (!body) return 1;
  const text = body.map(b => b.children?.map((c: any) => c.text).join('') || '').join(' ');
  const words = text.trim().split(/\s+/g).length;
  return Math.ceil(words / 200) || 1;
}

// 3. KOMPONEN PORTABLE TEXT (Agar gambar di dlm artikel muncul & Arab rapi)
const ptComponents = {
  block: {
    normal: ({ children }: any) => {
      const textContent = children?.map((c: any) => 
        typeof c === 'string' ? c : (c?.props?.children || "")
      ).join("") || "";
      if (isArabic(textContent)) {
        return (
          <p className="font-amiri" style={{ direction: "rtl", textAlign: "right", fontSize: "32px", lineHeight: "2.5", margin: "35px 0", unicodeBidi: "plaintext" }}>
            {children}
          </p>
        );
      }
      return <p style={{ marginBottom: '1.5em', lineHeight: '1.8' }}>{children}</p>;
    },
  },
  types: {
    image: ({ value }: any) => (
      <div style={{ margin: '40px 0', textAlign: 'center' }}>
        <img src={urlFor(value).url()} alt={value.alt || 'Gambar Konten'} style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
      </div>
    ),
  }
};

export default async function PostDetail({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return <div style={{ padding: 100, textAlign: "center" }}>404 - Postingan tidak ditemukan</div>;

  const currentCat = post.categorySlug || category || "berita";
  const [relatedPosts, popularPosts] = await Promise.all([
    getRelatedPosts(currentCat, slug),
    getPopularPosts(),
  ]);

  const fullUrl = `https://hermawati.web.id/category/${currentCat}/${slug}`;
  const readingTime = getReadingTime(post.body);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <PostClient />

      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        
        {/* BREADCRUMB */}
        <nav style={{ marginBottom: 35, fontSize: 13, color: "#888" }}>
          <Link href="/" style={{ fontWeight: "bold", color: "#5D427C" }}>Home</Link> /
          <span style={{ color: "#5D427C" }}> {post.categoryName || post.category || currentCat}</span> /
          <span> {post.title}</span>
        </nav>

        {/* --- LAYOUT GRID UTAMA --- */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "50px" }}>
          
          {/* --- KIRI: KONTEN UTAMA --- */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, marginBottom: 35, lineHeight: 1.2, color: "#2D2438" }}>
              {post.title}
            </h1>

            {/* META: PENULIS & SHARE BUTTONS */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0eaf5", paddingBottom: 25, marginBottom: 45, flexWrap: "wrap", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                {post.author?.image ? (
                  <img src={urlFor(post.author.image).width(100).height(100).url()} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #B294D1" }} alt={post.author.name} />
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#5D427C", color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>H</div>
                )}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 800, color: "#5D427C" }}>{post.author?.name || "Admin Hermawati"}</span>
                  <span style={{ fontSize: 12, color: "#999" }}>
                    📅 {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • ⏱️ {readingTime} Menit Baca
                  </span>
                </div>
              </div>
              
              {/* TOMBOL SHARE MEDSOS */}
              <ShareButtons url={fullUrl} />
            </div>

            {/* GAMBAR UTAMA ARTIKEL */}
            {post.mainImage && (
              <img 
                src={urlFor(post.mainImage).url()} 
                alt={post.title} 
                style={{ width: '100%', borderRadius: '24px', marginBottom: '45px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
              />
            )}

            {/* ISI ARTIKEL */}
            <article style={{ fontSize: '19px', color: '#333', lineHeight: '1.8' }}>
              <PortableText value={post.body} components={ptComponents} />
            </article>

            {/* BIO PENULIS */}
            {post.author && (
              <div style={{ marginTop: 70, padding: 40, background: "#F9F6FB", borderRadius: 24, border: "1px solid #EADFF2", display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap" }}>
                {post.author.image && (
                  <img src={urlFor(post.author.image).width(200).height(200).url()} style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", border: "3px solid #fff", boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} alt={post.author.name} />
                )}
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h3 style={{ margin: "0 0 12px 0", color: "#5D427C", fontSize: 24, fontWeight: 900 }}>Tentang {post.author.name}</h3>
                  <div style={{ fontSize: 16, color: "#666", lineHeight: 1.7 }}>
                    {post.author.bio ? <PortableText value={post.author.bio} /> : <p>Penulis inspiratif di Hermawati.web.id</p>}
                  </div>
                </div>
              </div>
            )}

            {/* KOMENTAR */}
            <div style={{ marginTop: 80, paddingTop: 50, borderTop: "4px solid #B294D1" }}>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#5D427C", marginBottom: 35 }}>💬 Diskusi & Komentar</h3>
              <CommentSection slug={slug} />
            </div>

            {/* ARTIKEL TERKAIT */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: 80, paddingTop: 50, borderTop: "2px solid #f0eaf5" }}>
                <h3 style={{ marginBottom: 30, color: "#5D427C", fontSize: 24, fontWeight: 900 }}>Artikel Terkait</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 30 }}>
                  {relatedPosts.map((rel: any) => (
                    <Link key={rel._id} href={`/category/${rel.categorySlug || "artikel"}/${rel.slug?.current || rel.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ marginBottom: 15, overflow: 'hidden', borderRadius: 16 }}>
                        <img src={rel.mainImage ? urlFor(rel.mainImage).width(400).height(250).url() : '/placeholder.jpg'} alt={rel.title} style={{ width: '100%', transition: '0.3s', objectFit: 'cover' }} />
                      </div>
                      <h4 style={{ fontSize: 17, fontWeight: 800, margin: 0, lineHeight: 1.4, color: '#2D2438' }}>{rel.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* --- KANAN: SIDEBAR STICKY --- */}
          <aside style={{ width: "340px", position: "sticky", top: "20px", flexShrink: 0 }} className="hide-on-mobile">
            {/* Widget Kategori */}
            <CategoryWidget />

            {/* Widget Terpopuler */}
            <div style={{ marginTop: "50px" }}>
              <h3 style={{ fontSize: 20, marginBottom: 25, borderLeft: "5px solid #B294D1", paddingLeft: 15, color: '#5D427C', fontWeight: 900 }}>
                TER<span style={{color:'#B294D1'}}>POPULER</span>
              </h3>
              {popularPosts.slice(0, 5).map((p: any, i: number) => (
                <Link key={p._id} href={`/category/${p.categorySlug || "artikel"}/${p.slug?.current || p.slug}`} style={{ display: 'grid', gridTemplateColumns: '50px 1fr', gap: 15, marginBottom: 25, textDecoration: 'none', alignItems: 'start' }}>
                  <span style={{ fontSize: 38, fontWeight: 900, color: "#E2D7EB", fontStyle: 'italic', lineHeight: 0.8 }}>{i + 1}</span>
                  <div style={{display:'flex', flexDirection:'column', gap:4}}>
                    <h5 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#2D2438", lineHeight: 1.4 }}>{p.title}</h5>
                    <div style={{fontSize:10, color:'#B294D1', fontWeight:800, textTransform:'uppercase'}}>{p.categoryName || "Inspirasi"}</div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}