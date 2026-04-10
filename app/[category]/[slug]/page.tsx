// app/[category]/[slug]/page.tsx
import { getSinglePost, getRelatedPosts } from "@/lib/sanity.query"; 
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import Link from "next/link";

const builder = urlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// Komponen renderer untuk isi artikel dengan dukungan Font Arab Otomatis
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <div style={{ margin: '35px 0', textAlign: 'center' }}>
          <img
            src={urlFor(value).fit('max').auto('format').url()}
            alt={value.alt || "Gambar Konten"}
            style={{ borderRadius: '10px', maxWidth: '100%', height: 'auto' }}
          />
          {value.caption && (
            <p style={{ fontSize: '14px', color: '#666', marginTop: '10px', fontStyle: 'italic' }}>
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => {
      // LOGIKA DETEKSI ARAB: Mengecek apakah teks mengandung karakter Hijaiyah
      const isArabic = /[\u0600-\u06FF]/.test(children[0]);

      return (
        <p style={{ 
          marginBottom: isArabic ? '2.2rem' : '1.8rem', 
          lineHeight: isArabic ? '2.5' : '1.8', 
          fontSize: isArabic ? '28px' : '18px', 
          color: '#333',
          fontFamily: isArabic ? 'var(--font-amiri), serif' : 'inherit',
          direction: isArabic ? 'rtl' : 'ltr',
          textAlign: isArabic ? 'right' : 'left'
        }}>
          {children}
        </p>
      );
    },
    h2: ({ children }: any) => (
      <h2 style={{ marginTop: '2.5rem', marginBottom: '1.2rem', color: '#004a8e', fontSize: '24px', fontWeight: 'bold' }}>
        {children}
      </h2>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ 
        borderRight: '5px solid #004a8e', 
        padding: '25px', 
        backgroundColor: '#f8f9fa', 
        margin: '40px 0',
        fontFamily: 'var(--font-amiri), serif',
        fontSize: '30px',
        lineHeight: '2.8',
        direction: 'rtl',
        textAlign: 'center',
        borderRadius: '8px'
      }}>
        {children}
      </blockquote>
    ),
  },
};

export default async function PostDetail({ 
  params 
}: { 
  params: Promise<{ category: string, slug: string }> 
}) {
  const { category, slug } = await params;
  const [post, relatedPosts] = await Promise.all([
    getSinglePost(slug),
    getRelatedPosts(category, slug)
  ]);

  if (!post) return <div style={{ padding: '50px', textAlign: 'center' }}>Postingan tidak ditemukan.</div>;

  const shareUrl = `https://abahsaif.web.id/${category}/${slug}`;
  const fileUrl = post.attachmentUrl;
  const isPdf = fileUrl?.toLowerCase().endsWith('.pdf');
  const isPpt = fileUrl?.toLowerCase().endsWith('.ppt') || fileUrl?.toLowerCase().endsWith('.pptx');

  return (
    <article style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* 1. BREADCRUMB */}
      <nav style={{ fontSize: '13px', color: '#888', marginBottom: '20px', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#888' }}>Home</Link>
        <span>/</span>
        <Link href={`/${category}`} style={{ textDecoration: 'none', color: '#004a8e', fontWeight: 'bold' }}>{category}</Link>
        <span>/</span>
        <span style={{ color: '#333' }}>Detail</span>
      </nav>

      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', lineHeight: '1.3', marginBottom: '25px', color: '#1a1a1a' }}>
          {post.title}
        </h1>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '20px',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #eee'
        }}>
          {/* SISI KIRI: PENULIS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #eee', backgroundColor: '#f0f0f0' }}>
               <img src="/abah-saif.jpeg" alt="Abah Saif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 'bold', color: '#333', fontSize: '15px' }}>{post.author || "Abah Saif"}</span>
              <span style={{ fontSize: '12px', color: '#888' }}>
                {new Date(post.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* SISI KANAN: TOMBOL SHARE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" style={{ backgroundColor: '#1877F2', width: '36px', height: '36px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={`https://api.whatsapp.com/send?text=${shareUrl}`} target="_blank" style={{ backgroundColor: '#25D366', width: '36px', height: '36px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {post.image && (
        <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
      )}

      {/* ISI TULISAN */}
      <div className="article-body" style={{ marginBottom: '50px' }}>
        {post.body && <PortableText value={post.body} components={ptComponents} />}
      </div>

      {/* FITUR ATTACHMENT VIEWER & DOWNLOAD */}
      {fileUrl && (
        <div style={{ margin: '50px 0', border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{isPdf ? '📕' : '📙'}</span>
              <span style={{ fontWeight: 'bold', color: '#333', fontSize: '15px' }}>
                {post.attachmentDescription || "Lampiran Materi Kajian"}
              </span>
            </div>
            <a 
              href={`${fileUrl}?dl=`} 
              className="download-btn"
              style={{ padding: '10px 18px', backgroundColor: '#28a745', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', transition: '0.3s' }}
            >
              📥 Simpan File
            </a>
          </div>

          <div style={{ width: '100%', height: '550px', backgroundColor: '#525659' }}>
            {isPdf ? (
              <iframe src={fileUrl} width="100%" height="100%" style={{ border: 'none' }} />
            ) : isPpt ? (
              <iframe 
                src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`} 
                width="100%" height="100%" style={{ border: 'none' }} 
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#fff', flexDirection: 'column', gap: '15px' }}>
                <p>Pratinjau tidak tersedia untuk format ini.</p>
                <a href={fileUrl} style={{ color: '#00ccff' }}>Buka langsung di browser</a>
              </div>
            )}
          </div>
        </div>
      )}

      <hr style={{ margin: '60px 0', border: '0', borderTop: '1px solid #eee' }} />

      {/* RELATED POSTS */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section style={{ marginBottom: '80px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '25px', color: '#004a8e', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Postingan Terkait
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {relatedPosts.slice(0, 3).map((rel: any) => (
              <Link href={`/${category}/${rel.slug}`} key={rel._id} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f0f0f0', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                  <img src={rel.image || "https://via.placeholder.com/300x160"} alt={rel.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, lineHeight: '1.4', color: '#333' }}>{rel.title}</h4>
              </Link>
            ))}
          </div>
        </section>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .download-btn:hover { background-color: #218838 !important; transform: translateY(-2px); }
        @media (max-width: 768px) {
          header div[style*="justifyContent: space-between"] {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          iframe { height: 400px !important; }
        }
      `}} />
    </article>
  );
}