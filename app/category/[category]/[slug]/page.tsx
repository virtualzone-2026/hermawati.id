import { getSinglePost, getRelatedPosts, getPopularPosts } from "@/lib/sanity.query";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import PostClient from "@/components/PostClient";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons"; 
import CategoryWidget from "@/components/CategoryWidget";
import { urlFor } from "@/lib/sanity"; 
import { Metadata } from "next";

// --- 1. METADATA DINAMIS (Solusi agar Gambar muncul saat di-share) ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return { title: "Post Not Found - Hermawati" };

  const ogImage = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url() 
    : "https://hermawati.web.id/og-default.jpg";

  return {
    title: `${post.title} | Hermawati`,
    description: post.excerpt || "Baca selengkapnya di Hermawati.web.id - Literasi Pendidikan & Parenting.",
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://hermawati.web.id/category/${post.categorySlug}/${post.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      images: [ogImage],
    },
  };
}

// --- 2. HELPERS ---
function isArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

function getReadingTime(body: any[]) {
  if (!body) return 1;
  const text = body.map(b => b.children?.map((c: any) => c.text).join('') || '').join(' ');
  const words = text.trim().split(/\s+/g).length;
  return Math.ceil(words / 200) || 1;
}

// --- 3. KOMPONEN PORTABLE TEXT ---
const ptComponents = {
  block: {
    normal: ({ children }: any) => {
      const textContent = children?.map((c: any) => 
        typeof c === 'string' ? c : (c?.props?.children || "")
      ).join("") || "";
      
      if (isArabic(textContent)) {
        return (
          <p className="arabic-text" style={{ 
            direction: "rtl", 
            textAlign: "right", 
            fontSize: "32px", 
            lineHeight: "2.5", 
            margin: "40px 0", 
            fontFamily: "'Amiri', serif" 
          }}>
            {children}
          </p>
        );
      }
      return <p style={{ marginBottom: '1.8em', lineHeight: '1.8', color: '#333' }}>{children}</p>;
    },
    h2: ({ children }: any) => <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#2D2438', marginTop: '40px', marginBottom: '20px' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#5D427C', marginTop: '30px', marginBottom: '15px' }}>{children}</h3>,
  },
  types: {
    image: ({ value }: any) => (
      <div style={{ margin: '45px 0', textAlign: 'center' }}>
        <img 
          src={urlFor(value).width(1000).url()} 
          alt={value.alt || 'Hermawati Content Image'} 
          style={{ maxWidth: '100%', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} 
        />
        {value.caption && <p style={{ fontSize: '14px', color: '#999', marginTop: '12px', fontStyle: 'italic' }}>{value.caption}</p>}
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
        <nav style={{ marginBottom: 35, fontSize: 13, color: "#888", fontWeight: 600 }}>
          <Link href="/" style={{ color: "#B294D1", textDecoration: 'none' }}>HOME</Link>
          <span style={{ margin: '0 10px' }}>/</span>
          <Link href={`/category/${currentCat}`} style={{ color: "#B294D1", textDecoration: 'none', textTransform: 'uppercase' }}>
            {post.categoryName || currentCat}
          </Link>
          <span style={{ margin: '0 10px' }}>/</span>
          <span style={{ color: "#5D427C" }}>{post.title}</span>
        </nav>

        {/* LAYOUT GRID */}
        <div className="post-grid-layout" style={{ display: "flex", alignItems: "flex-start", gap: "50px" }}>
          
          {/* SISI KIRI: KONTEN */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, marginBottom: 30, lineHeight: 1.2, color: "#2D2438" }}>
              {post.title}
            </h1>

            {/* AUTHOR & SHARE */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0eaf5", paddingBottom: 25, marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                {post.author?.image ? (
                  <img src={urlFor(post.author.image).width(100).height(100).url()} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #B294D1" }} alt={post.author.name} />
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#5D427C", color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>H</div>
                )}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 800, color: "#5D427C", fontSize: 15 }}>{post.author?.name || "Admin Hermawati"}</span>
                  <span style={{ fontSize: 12, color: "#999", fontWeight: 600 }}>
                    {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • ⏱️ {readingTime} Menit Baca
                  </span>
                </div>
              </div>
              <ShareButtons url={fullUrl} title={post.title} />
            </div>

            {/* FEATURED IMAGE */}
            {post.mainImage && (
              <div style={{ position: 'relative', marginBottom: '50px' }}>
                <img 
                  src={urlFor(post.mainImage).width(1200).url()} 
                  alt={post.title} 
                  style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 50px rgba(93, 66, 124, 0.15)' }} 
                />
              </div>
            )}

            {/* BODY CONTENT */}
            <article className="article-body" style={{ fontSize: '19px', color: '#333', lineHeight: '1.9' }}>
              <PortableText value={post.body} components={ptComponents} />
            </article>

            {/* AUTHOR BIO BOX */}
            {post.author && (
              <div style={{ marginTop: 70, padding: 40, background: "#F9F6FB", borderRadius: "30px", border: "1px solid #EADFF2", display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap" }}>
                {post.author.image && (
                  <img src={urlFor(post.author.image).width(200).height(200).url()} style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "4px solid #fff", boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }} alt={post.author.name} />
                )}
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h3 style={{ margin: "0 0 10px 0", color: "#5D427C", fontSize: 22, fontWeight: 900 }}>Ditulis oleh {post.author.name}</h3>
                  <div style={{ fontSize: 15, color: "#666", lineHeight: 1.7 }}>
                    {post.author.bio ? <PortableText value={post.author.bio} /> : <p>Kontributor aktif dan inspiratif di Hermawati Literasi Digital.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* COMMENTS */}
            <div id="comments" style={{ marginTop: 80, paddingTop: 50, borderTop: "4px solid #B294D1" }}>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#5D427C", marginBottom: 35 }}>💬 Diskusi Pembaca</h3>
              <CommentSection slug={slug} />
            </div>

            {/* RELATED POSTS */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: 80, paddingTop: 50, borderTop: "1px solid #f0eaf5" }}>
                <h3 style={{ marginBottom: 30, color: "#5D427C", fontSize: 24, fontWeight: 900 }}>Mungkin Anda Suka</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 30 }}>
                  {relatedPosts.map((rel: any) => (
                    <Link key={rel._id} href={`/category/${rel.categorySlug || "artikel"}/${rel.slug}`} style={{ textDecoration: "none", color: "inherit" }} className="related-card">
                      <div style={{ marginBottom: 15, overflow: 'hidden', borderRadius: 16, height: 160, background: '#eee' }}>
                        <img src={rel.mainImage ? urlFor(rel.mainImage).width(400).height(250).url() : '/placeholder.jpg'} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.4s' }} className="rel-img" />
                      </div>
                      <h4 style={{ fontSize: 16, fontWeight: 800, margin: 0, lineHeight: 1.4, color: '#2D2438' }}>{rel.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* SISI KANAN: SIDEBAR */}
          <aside style={{ width: "340px", position: "sticky", top: "20px", flexShrink: 0 }} className="sidebar-sticky hide-on-mobile">
            <CategoryWidget />

            <div style={{ marginTop: "50px" }}>
              <h3 style={{ fontSize: 18, marginBottom: 25, borderLeft: "5px solid #B294D1", paddingLeft: 15, color: '#5D427C', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Ter<span style={{color:'#B294D1'}}>populer</span>
              </h3>
              {popularPosts.slice(0, 5).map((p: any, i: number) => (
                <Link key={p._id} href={`/category/${p.categorySlug || "artikel"}/${p.slug}`} style={{ display: 'grid', gridTemplateColumns: '45px 1fr', gap: 15, marginBottom: 25, textDecoration: 'none', alignItems: 'start' }}>
                  <span style={{ fontSize: 40, fontWeight: 900, color: "#EADFF2", fontStyle: 'italic', lineHeight: 0.8, fontFamily: 'Arial Black' }}>{String(i + 1).padStart(2, '0')}</span>
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

      {/* STYLE RESPONSIVE & HOVER */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .post-grid-layout { display: block !important; }
          .hide-on-mobile { display: none !important; }
          main { width: 100% !important; }
        }
        .related-card:hover .rel-img { transform: scale(1.1); }
        .article-body a { color: #5D427C; font-weight: bold; text-decoration: underline; }
        .article-body blockquote { border-left: 5px solid #B294D1; padding-left: 20px; font-style: italic; color: #666; margin: 30px 0; }
      `}} />
    </div>
  );
}