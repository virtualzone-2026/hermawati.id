import { getSinglePost, getRelatedPosts, getPopularPosts } from "@/lib/sanity.query";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import PostClient from "@/components/PostClient";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons"; 
import CategoryWidget from "@/components/CategoryWidget";
import { urlFor } from "@/lib/sanity"; 
import { Metadata } from "next";

// --- 1. METADATA DINAMIS ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return { title: "Postingan Tidak Ditemukan | Hermawati" };

  const ogImage = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url() 
    : "https://hermawati.web.id/og-default.jpg";

  return {
    title: `${post.title} | Hermawati`,
    description: post.excerpt || "Baca selengkapnya di Hermawati Literasi Digital.",
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
          <p className="font-amiri" style={{ 
            direction: "rtl", textAlign: "right", fontSize: "34px", 
            lineHeight: "2.5", margin: "45px 0", color: "#2D2438" 
          }}>
            {children}
          </p>
        );
      }
      return <p style={{ marginBottom: '1.8em', lineHeight: '1.9' }}>{children}</p>;
    },
    h2: ({ children }: any) => <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#2D2438', marginTop: '45px', marginBottom: '20px', borderLeft: '5px solid #B294D1', paddingLeft: '15px' }}>{children}</h2>,
    blockquote: ({ children }: any) => <blockquote style={{ borderLeft: '5px solid #B294D1', padding: '10px 25px', fontStyle: 'italic', background: '#F9F6FB', borderRadius: '0 15px 15px 0', margin: '30px 0' }}>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link 
          href={value.href} 
          rel={rel}
          style={{ color: '#5D427C', fontWeight: 'bold', textDecoration: 'underline', textDecorationColor: '#B294D1' }}
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: any) => (
      <div style={{ margin: '45px 0', textAlign: 'center' }}>
        <img 
          src={urlFor(value).width(1000).url()} 
          alt={value.alt || 'Gambar Hermawati'} 
          style={{ maxWidth: '100%', borderRadius: '20px', boxShadow: '0 15px 45px rgba(0,0,0,0.1)' }} 
        />
        {value.caption && <p style={{ fontSize: '14px', color: '#888', marginTop: '12px' }}>{value.caption}</p>}
      </div>
    ),
  }
};

export default async function PostDetail({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const post = await getSinglePost(slug);

  if (!post) return <div style={{ padding: 100, textAlign: "center" }}>Postingan tidak ditemukan gaes.</div>;

  const currentCat = post.categorySlug || category || "berita";
  const [relatedPosts, popularPosts] = await Promise.all([
    getRelatedPosts(currentCat, slug),
    getPopularPosts(),
  ]);

  const fullUrl = `https://hermawati.web.id/category/${currentCat}/${slug}`;
  const readingTime = getReadingTime(post.body);
  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : "";

  // LOGIKA PEMBAGIAN KONTEN (TENGAH ARTIKEL)
  const bodyContent = post.body || [];
  const middleIndex = Math.ceil(bodyContent.length / 2);
  const firstHalf = bodyContent.slice(0, middleIndex);
  const secondHalf = bodyContent.slice(middleIndex);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "image": [ogImage],
    "datePublished": post.publishedAt,
    "author": [{
      "@type": "Person",
      "name": post.author?.name || "Admin Hermawati",
      "url": "https://hermawati.web.id"
    }]
  };

  return (
    <div style={{ background: "#FDFCFD", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <PostClient />

      <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        
        {/* BREADCRUMB */}
        <nav style={{ marginBottom: 35, fontSize: 13, color: "#888", fontWeight: 700 }}>
          <Link href="/" style={{ color: "#B294D1" }}>HOME</Link> / 
          <Link href={`/category/${currentCat}`} style={{ color: "#B294D1", marginLeft: 10, textTransform: 'uppercase' }}>{post.categoryName || currentCat}</Link> / 
          <span style={{ color: "#5D427C", marginLeft: 10 }}>{post.title}</span>
        </nav>

        <div className="post-grid-layout" style={{ display: "flex", alignItems: "flex-start", gap: "50px" }}>
          
          {/* MAIN CONTENT */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 900, marginBottom: 25, lineHeight: 1.2, color: "#2D2438" }}>
              {post.title}
            </h1>

            {/* AUTHOR INFO */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0eaf5", paddingBottom: 25, marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                {post.author?.image ? (
                  <img src={urlFor(post.author.image).width(100).height(100).url()} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #B294D1" }} alt={post.author.name} />
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#5D427C", color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>H</div>
                )}
                <div>
                  <div style={{ fontWeight: 800, color: "#5D427C" }}>{post.author?.name || "Admin Hermawati"}</div>
                  <div style={{ fontSize: 12, color: "#999" }}>
                    {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • ⏱️ {readingTime} Menit Baca
                  </div>
                </div>
              </div>
              <ShareButtons url={fullUrl} title={post.title} />
            </div>

            {/* FEATURED IMAGE */}
            {post.mainImage && (
              <img 
                src={urlFor(post.mainImage).width(1200).url()} 
                alt={post.title} 
                style={{ width: '100%', borderRadius: '24px', marginBottom: '45px', boxShadow: '0 20px 40px rgba(93, 66, 124, 0.12)' }} 
              />
            )}

            {/* ARTICLE BODY DENGAN INTERNAL LINKING DI TENGAH */}
            <article className="article-body" style={{ fontSize: '20px', color: '#333', lineHeight: '1.9' }}>
              
              {/* BAGIAN PERTAMA ARTIKEL */}
              <PortableText value={firstHalf} components={ptComponents} />
              
              {/* 🔥 INTERNAL LINKING BOX (PINDAH KE TENGAH) 🔥 */}
              <div style={{ 
                margin: '40px 0', 
                padding: '30px', 
                background: '#F9F6FB', 
                borderRadius: '20px', 
                borderLeft: '10px solid #5D427C',
                boxShadow: '0 10px 25px rgba(93, 66, 124, 0.05)'
              }}>
                <p style={{ margin: 0, fontWeight: 900, fontSize: '15px', color: '#5D427C', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    BACA JUGA ARTIKEL MENARIK LAINNYA:
                </p>
                <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {relatedPosts.slice(0, 2).map((rel: any) => (
                    <Link key={rel._id} href={`/category/${rel.categorySlug || "artikel"}/${rel.slug?.current || rel.slug}`} style={{ color: '#2D2438', fontSize: '18px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#5D427C' }}>➔</span> {rel.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* BAGIAN KEDUA ARTIKEL */}
              <PortableText value={secondHalf} components={ptComponents} />
            </article>

            {/* AUTHOR BIO */}
            {post.author && (
              <div style={{ marginTop: 70, padding: 35, background: "#fff", borderRadius: 24, border: "1px solid #EADFF2", display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap", boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                {post.author.image && (
                  <img src={urlFor(post.author.image).width(200).height(200).url()} style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover" }} alt={post.author.name} />
                )}
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h3 style={{ margin: "0 0 8px 0", color: "#5D427C", fontSize: 22, fontWeight: 900 }}>Tentang {post.author.name}</h3>
                  <div style={{ fontSize: 15, color: "#666" }}>
                    {post.author.bio ? <PortableText value={post.author.bio} /> : <p>Editor senior di Hermawati Literasi Digital.</p>}
                  </div>
                </div>
              </div>
            )}

            {/* RELATED POSTS GRID (BAWAH) */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: 80, paddingTop: 50, borderTop: "2px solid #f0eaf5" }}>
                <h3 style={{ marginBottom: 35, color: "#5D427C", fontSize: 24, fontWeight: 900 }}>Mungkin Anda Suka</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 30 }}>
                  {relatedPosts.map((rel: any) => (
                    <Link key={rel._id} href={`/category/${rel.categorySlug || "artikel"}/${rel.slug?.current || rel.slug}`} className="related-card" style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ marginBottom: 15, overflow: 'hidden', borderRadius: 16, height: 180 }}>
                        <img src={rel.mainImage ? urlFor(rel.mainImage).width(400).height(250).url() : '/placeholder.jpg'} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.4s' }} className="rel-img" />
                      </div>
                      <h4 style={{ fontSize: 17, fontWeight: 800, margin: 0, lineHeight: 1.4, color: '#2D2438' }}>{rel.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* COMMENTS */}
            <div id="comments" style={{ marginTop: 80 }}>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#5D427C", marginBottom: 30 }}>💬 Diskusi</h3>
              <CommentSection slug={slug} />
            </div>
          </main>

          {/* SIDEBAR (STICKY FIXED) */}
          <aside style={{ width: "340px", position: "sticky", top: "20px", flexShrink: 0 }} className="hide-on-mobile">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <CategoryWidget />
              <div>
                <h3 style={{ fontSize: 18, marginBottom: 25, borderLeft: "5px solid #B294D1", paddingLeft: 15, color: '#5D427C', fontWeight: 900 }}>TERPOPULER</h3>
                {popularPosts.slice(0, 5).map((p: any, i: number) => (
                  <Link key={p._id} href={`/category/${p.categorySlug || "artikel"}/${p.slug?.current || p.slug}`} style={{ display: 'grid', gridTemplateColumns: '45px 1fr', gap: 15, marginBottom: 25, textDecoration: 'none' }}>
                    <span style={{ fontSize: 38, fontWeight: 900, color: "#EADFF2", fontStyle: 'italic', lineHeight: 0.8 }}>{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h5 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#2D2438", lineHeight: 1.4 }}>{p.title}</h5>
                      <div style={{ fontSize: 10, color: '#B294D1', fontWeight: 800 }}>{p.categoryName || "INSPIRASI"}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .post-grid-layout { display: block !important; }
          .hide-on-mobile { display: none !important; }
        }
        .related-card:hover .rel-img { transform: scale(1.1); }
        .article-body a:hover { color: #B294D1 !important; }
      `}} />
    </div>
  );
}