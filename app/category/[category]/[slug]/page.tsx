import { getSinglePost, getRelatedPosts, getPopularPosts } from "@/lib/sanity.query";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import PostClient from "@/components/PostClient";
import FacebookComments from "@/components/FacebookComments";
import { urlFor } from "@/lib/sanity"; 
import Image from "next/image";

/**
 * DETECT ARABIC TEXT
 */
function isArabic(text: string) {
  return /[\u0600-\u06FF]/.test(text);
}

/**
 * PORTABLE TEXT COMPONENTS (Support Gambar & Arab)
 */
const ptComponents = {
  block: {
    normal: ({ children }: any) => {
      const textContent = children?.map((c: any) => 
        typeof c === 'string' ? c : (c?.props?.children || "")
      ).join("") || "";

      if (isArabic(textContent)) {
        return (
          <p className="font-amiri" style={{
            direction: "rtl",
            textAlign: "right",
            fontSize: "32px",
            lineHeight: "2.5",
            margin: "35px 0",
            unicodeBidi: "plaintext"
          }}>
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
        <img 
          src={urlFor(value).url()} 
          alt={value.alt || 'Gambar Konten'} 
          style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} 
        />
        {value.alt && <p style={{ fontSize: '14px', color: '#666', marginTop: '12px', fontStyle: 'italic' }}>{value.alt}</p>}
      </div>
    ),
  }
};

function getReadingTime(body: any[]) {
  if (!body) return 1;
  const text = body.map(b => b.children?.map((c: any) => c.text).join('') || '').join(' ');
  const words = text.trim().split(/\s+/g).length;
  return Math.ceil(words / 200) || 1;
}

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

        <div className="main-layout-grid">
          
          {/* MAIN COLUMN */}
          <main style={{ minWidth: 0 }}>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, marginBottom: 35, lineHeight: 1.2, color: "#2D2438" }}>
              {post.title}
            </h1>

            {/* META & SHARE BUTTONS (LENGKAP 4) */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0eaf5", paddingBottom: 25, marginBottom: 45, flexWrap: "wrap", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                {post.author?.image ? (
                  <img 
                    src={urlFor(post.author.image).width(100).height(100).url()} 
                    style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "2px solid #B294D1" }} 
                    alt={post.author.name} 
                  />
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#5D427C", color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>H</div>
                )}
                
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 800, color: "#5D427C" }}>{post.author?.name || "Admin"}</span>
                  <span style={{ fontSize: 12, color: "#999" }}>
                    📅 {new Date(post.publishedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} • ⏱️ {readingTime} Menit Baca
                  </span>
                </div>
              </div>

              {/* SHARE BUTTONS LENGKAP */}
              <div style={{ display: "flex", gap: 10 }}>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`} target="_blank" style={shareCircle("#1877F2")} title="Facebook">
                  <svg style={{width:20, height:20}} viewBox="0 0 24 24"><path fill="#fff" d="M22 12A10 10 0 1 0 10 22v-7H7v-3h3V9c0-3 2-5 5-5h3v3h-2c-1 0-1 1-1 2v3h3l-1 3h-2v7A10 10 0 0 0 22 12z"/></svg>
                </a>
                <a href={`https://api.whatsapp.com/send?text=${fullUrl}`} target="_blank" style={shareCircle("#25D366")} title="WhatsApp">
                  <svg style={{width:20, height:20}} viewBox="0 0 24 24"><path fill="#fff" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href={`https://t.me/share/url?url=${fullUrl}`} target="_blank" style={shareCircle("#0088cc")} title="Telegram">
                  <svg style={{width:18, height:18}} viewBox="0 0 24 24"><path fill="#fff" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-1.871 8.816c-.141.621-.51.774-1.031.484l-2.85-2.1c-.138-.133-.267-.266-.084-.461 0 0 2.617-2.453 2.667-2.664.006-.027.01-.129-.05-.183-.06-.055-.147-.036-.21-.022-.09.02-3.666 2.384-3.666 2.384-.17.113-.324.169-.462.164l-2.737-.856c-.594-.186-.605-.594.124-.879l10.697-4.122c.495-.181.928.115.773.838z"/></svg>
                </a>
                <a href={`https://pinterest.com/pin/create/button/?url=${fullUrl}`} target="_blank" style={shareCircle("#E60023")} title="Pinterest">
                  <svg style={{width:18, height:18}} viewBox="0 0 24 24"><path fill="#fff" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                </a>
              </div>
            </div>

            {/* GAMBAR UTAMA ARTIKEL - INI DIA YANG DICARI! */}
            {post.mainImage && (
              <img 
                src={urlFor(post.mainImage).url()} 
                className="featured-image" 
                alt={post.title} 
                style={{ width: '100%', borderRadius: '24px', marginBottom: '45px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              />
            )}

            {/* ISI ARTIKEL */}
            <div className="article-body-content" style={{ fontSize: '19px', color: '#333' }}>
              <PortableText value={post.body} components={ptComponents} />
            </div>

            {/* AUTHOR BIO BOX (DINAMIS) */}
            {post.author && (
              <div style={{ marginTop: 70, padding: 35, background: "#F9F6FB", borderRadius: 24, border: "1px solid #EADFF2", display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap" }}>
                {post.author.image && (
                  <img 
                    src={urlFor(post.author.image).width(200).height(200).url()} 
                    style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", border: "3px solid #fff", boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
                    alt={post.author.name}
                  />
                )}
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h3 style={{ margin: "0 0 12px 0", color: "#5D427C", fontSize: 22 }}>Tentang {post.author.name}</h3>
                  <div style={{ fontSize: 16, color: "#666", lineHeight: 1.7 }}>
                    {post.author.bio ? <PortableText value={post.author.bio} /> : "Penulis aktif di Hermawati.web.id"}
                  </div>
                </div>
              </div>
            )}

            {/* ARTIKEL TERKAIT DENGAN THUMBNAIL */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: 80, paddingTop: 50, borderTop: "2px solid #f0eaf5" }}>
                <h3 style={{ marginBottom: 30, color: "#5D427C", fontSize: 24 }}>Artikel Terkait</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 30 }}>
                  {relatedPosts.map((rel: any) => (
                    <Link key={rel._id} href={`/category/${rel.categorySlug || "artikel"}/${rel.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ marginBottom: 15, overflow: 'hidden', borderRadius: 16 }}>
                        <img 
                          src={rel.mainImage ? urlFor(rel.mainImage).width(400).height(250).url() : '/placeholder.jpg'} 
                          alt={rel.title} 
                          style={{ width: '100%', transition: '0.3s', objectFit: 'cover' }} 
                        />
                      </div>
                      <h4 style={{ fontSize: 17, fontWeight: 800, margin: 0, lineHeight: 1.4, color: '#2D2438' }}>{rel.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <FacebookComments url={fullUrl} />
          </main>

          {/* SIDEBAR DENGAN THUMBNAIL DINAMIS */}
          <aside>
            <div className="sidebar-sticky-wrapper">
              <h3 style={{ fontSize: 20, marginBottom: 30, borderLeft: "5px solid #B294D1", paddingLeft: 15, color: '#5D427C' }}>Paling Populer</h3>
              {popularPosts.map((p: any, i: number) => (
                <Link key={p._id} href={`/category/${p.categorySlug || "artikel"}/${p.slug}`} style={{ display: 'flex', gap: 15, marginBottom: 25, textDecoration: 'none', alignItems: 'center' }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: "#B294D1", opacity: 0.4 }}>{i + 1}</span>
                  {/* Thumbnail Sidebar */}
                  {p.mainImage && (
                    <div style={{ width: 75, height: 75, flexShrink: 0, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      <img 
                        src={urlFor(p.mainImage).width(150).height(150).url()} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        alt={p.title} 
                      />
                    </div>
                  )}
                  <h5 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#333", lineHeight: 1.5 }}>{p.title}</h5>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function shareCircle(bg: string) {
  return {
    width: 40,
    height: 40,
    borderRadius: "14px",
    background: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.3s",
    textDecoration: "none"
  };
}