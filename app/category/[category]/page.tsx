import { getPostsByCategory } from "@/lib/sanity.query";
import { urlFor } from "@/lib/sanity"; // 👈 WAJIB IMPORT INI
import Link from "next/link";
import Image from "next/image";

/**
 * Komponen Halaman Kategori
 */
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  
  // Format Judul Tampilan
  const categoryTitle = category.replace(/-/g, ' ').toUpperCase();

  return (
    <main className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 15px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header Kategori */}
      <div style={{ borderBottom: '3px solid #5D427C', marginBottom: '40px', paddingBottom: '10px' }}>
        <h1 style={{ fontSize: '28px', color: '#5D427C', fontWeight: '900', margin: 0 }}>
          {categoryTitle}
        </h1>
      </div>

      {posts.length === 0 ? (
        <div style={{ padding: '100px 0', textAlign: 'center', color: '#888' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>📂</div>
          <p>Belum ada postingan untuk kategori <strong>{categoryTitle}</strong>.</p>
          <Link href="/" style={{ color: '#5D427C', fontWeight: 'bold', marginTop: '15px', display: 'inline-block' }}>
            Kembali ke Beranda
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          {posts.map((post: any) => {
            // Kita pastikan URL mengarah ke rute yang benar
            const postLink = `/category/${category}/${post.slug}`;

            // 🔥 PERBAIKAN GAMBAR: Cek mainImage dan pakai urlFor
            const imageUrl = post.mainImage 
              ? urlFor(post.mainImage).width(600).height(400).url() 
              : "https://via.placeholder.com/600x400?text=Hermawati+Literasi";

            return (
              <Link 
                href={postLink} 
                key={post._id} 
                className="news-item-row"
                style={{ 
                  display: 'flex', 
                  gap: '25px', 
                  textDecoration: 'none', 
                  color: 'inherit',
                  paddingBottom: '30px',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                {/* Thumbnail Gambar */}
                <div style={{ 
                  width: '280px', 
                  height: '180px', 
                  flexShrink: 0, 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  backgroundColor: '#F9F6FB',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}>
                  <Image 
                    src={imageUrl} 
                    alt={post.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="280px"
                  />
                </div>

                {/* Konten Teks */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ 
                    fontSize: '22px', 
                    fontWeight: '800', 
                    lineHeight: '1.3', 
                    margin: '0 0 12px 0', 
                    color: '#2D2438'
                  }}>
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p style={{ 
                      fontSize: '15px', 
                      color: '#666', 
                      margin: '0 0 15px 0', 
                      lineHeight: '1.6', 
                      display: '-webkit-box', 
                      WebkitLineClamp: 2, 
                      WebkitBoxOrient: 'vertical', 
                      overflow: 'hidden' 
                    }}>
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta Data */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                     <span style={{ fontSize: '11px', backgroundColor: '#F0EAF5', padding: '4px 12px', borderRadius: '6px', color: '#5D427C', fontWeight: 'bold' }}>
                       {categoryTitle}
                     </span>
                     <span style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(post.publishedAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      {/* Efek Hover CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .news-item-row:hover h2 { color: #5D427C !important; }
        .news-item-row:hover img { transform: scale(1.05); transition: 0.4s; }
      `}} />
    </main>
  );
}