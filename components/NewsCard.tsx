// components/NewsCard.tsx
import Link from "next/link";

type NewsCardProps = {
  post: {
    title?: string;
    image?: string;
    publishedAt?: string;
    slug?: string;
    category?: string;
  };
};

export default function NewsCard({ post }: NewsCardProps) {
  // Ambil data dari objek post, berikan fallback jika data kosong
  const title = post?.title || "Judul Konten";
  const image = post?.image || "https://via.placeholder.com/400/240?text=Pendidikan";
  const category = post?.category || "Pendidikan";
  const slug = post?.slug || "#";
  const date = post?.publishedAt;

  // Format tanggal ke standar Indonesia
  const formattedDate = date 
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Baru saja";

  // Fungsi untuk menentukan warna label berdasarkan kategori
  const getCategoryColor = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'pendidikan': return '#1a365d';
      case 'parenting': return '#d63384';
      case 'opini': return '#fd7e14';
      case 'dokumen': return '#198754';
      default: return '#1a365d';
    }
  };

  return (
    <article className="news-card" style={{ 
      borderBottom: '1px solid #f5f5f5', 
      paddingBottom: '20px', 
      marginBottom: '25px' 
    }}>
      <Link href={`/post/${slug}`} style={{ textDecoration: 'none', display: 'block' }} className="group">
        {/* Kontainer Gambar */}
        <div style={{ 
          width: '100%', 
          aspectRatio: '16/9', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          marginBottom: '15px',
          backgroundColor: '#f8f9fa',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <img 
            src={image} 
            alt={title} 
            loading="lazy" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
            className="group-hover:scale-105"
          />
        </div>

        {/* Konten Teks */}
        <div className="news-card-content">
          <span style={{ 
            fontSize: '11px', 
            color: getCategoryColor(category), 
            fontWeight: 800, 
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '8px',
            letterSpacing: '1px',
          }}>
            {category}
          </span>
          
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 800, 
            color: '#1a365d', 
            lineHeight: '1.4',
            margin: '0 0 12px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            transition: 'color 0.2s'
          }} className="group-hover:text-blue-700">
            {title}
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#999' }}>
            <span>{formattedDate}</span>
            <span>•</span>
            <span style={{ color: '#d4af37', fontWeight: 'bold' }}>Baca Selengkapnya</span>
          </div>
        </div>
      </Link>
    </article>
  );
}