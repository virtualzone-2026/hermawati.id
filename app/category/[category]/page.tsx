import { getPostsByCategory } from "@/lib/sanity.query";
import Link from "next/link";
import Image from "next/image";

/**
 * Komponen Halaman Kategori
 * Menampilkan daftar artikel berdasarkan kategori yang dipilih di URL.
 */
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  // Pada Next.js 15, params harus di-await sebelum diakses
  const { category } = await params;
  
  // Mengambil data artikel secara dinamis berdasarkan kategori
  const posts = await getPostsByCategory(category);
  
  // Format Judul Tampilan: 'fiqih-praktis' -> 'FIQIH PRAKTIS'
  const categoryTitle = category.replace(/-/g, ' ').toUpperCase();

  return (
    <main className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 15px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header Kategori: Gaya khas portal berita dengan border biru tebal */}
      <div style={{ borderBottom: '3px solid #004a8e', marginBottom: '40px', paddingBottom: '10px' }}>
        <h1 style={{ fontSize: '28px', color: '#004a8e', fontWeight: '900', margin: 0 }}>
          {categoryTitle}
        </h1>
      </div>

      {posts.length === 0 ? (
        /* State Tampilan jika kategori masih kosong */
        <div style={{ padding: '100px 0', textAlign: 'center', color: '#888' }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>📂</div>
          <p>Belum ada postingan untuk kategori <strong>{categoryTitle}</strong>.</p>
          <Link href="/" style={{ color: '#004a8e', fontWeight: 'bold', marginTop: '15px', display: 'inline-block' }}>
            Kembali ke Beranda
          </Link>
        </div>
      ) : (
        /* Daftar Berita Vertikal dengan gaya modern */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          {posts.map((post: any) => {
            // Pastikan URL tujuan mengikuti folder kategori dinamis
            const postLink = `/${category}/${post.slug}`;

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
                {/* Thumbnail Gambar dengan Next/Image agar teroptimasi */}
                <div style={{ 
                  width: '280px', 
                  height: '160px', 
                  flexShrink: 0, 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  position: 'relative',
                  backgroundColor: '#eee'
                }}>
                  <Image 
                    src={post.image || "https://via.placeholder.com/280x160?text=No+Image"} 
                    alt={post.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Konten Teks: Judul dan Ringkasan */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ 
                    fontSize: '22px', 
                    fontWeight: '800', 
                    lineHeight: '1.3', 
                    margin: '0 0 12px 0', 
                    color: '#1a1a1a'
                  }}>
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p style={{ 
                      fontSize: '15px', 
                      color: '#555', 
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

                  {/* Meta Data: Label Kategori & Tanggal */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                     <span style={{ fontSize: '11px', backgroundColor: '#eef4ff', padding: '4px 10px', borderRadius: '4px', color: '#004a8e', fontWeight: 'bold' }}>
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
    </main>
  );
}