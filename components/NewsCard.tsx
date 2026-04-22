'use client'

import Link from "next/link";
import { urlFor } from "@/lib/sanity";

type NewsCardProps = {
  post: {
    _id?: string;
    title?: string;
    mainImage?: any;
    image?: string; 
    publishedAt?: string;
    slug?: any; 
    categoryName?: string;
    categorySlug?: any;
  };
};

export default function NewsCard({ post }: NewsCardProps) {
  // 1. Ekstrak Slug dengan Optional Chaining (Anti-Null)
  // Kita cek: jika post.slug adalah object DAN punya .current, ambil itu. Jika tidak, ambil post.slug langsung.
  const slug = (post?.slug && typeof post.slug === 'object') 
    ? post.slug.current 
    : (post?.slug || "#");
  
  // 2. Ekstrak Category Slug dengan pengaman ekstra
  // Pakai Optional Chaining ?. biar kalau null gak meledak gaes
  const catSlug = (post?.categorySlug && typeof post.categorySlug === 'object')
    ? post.categorySlug.current 
    : (post?.categorySlug || "artikel");

  // 3. Mapping Data & Fallback
  const title = post?.title || "Judul Konten";
  const category = post?.categoryName || "Pendidikan";
  const date = post?.publishedAt;

  // 4. Handle Gambar Sanity secara aman
  const imageUrl = post?.mainImage?.asset
    ? urlFor(post.mainImage).width(600).height(400).url() 
    : "https://via.placeholder.com/600/400?text=Hermawati";

  const formattedDate = date 
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Baru saja";

  const getCategoryColor = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'pendidikan': return '#5D427C';
      case 'parenting': return '#B294D1';
      case 'ruang opini': return '#D4AF37';
      case 'pustaka dokumen': return '#198754';
      default: return '#5D427C';
    }
  };

  return (
    <article style={{ 
      borderBottom: '1px solid #F0EAF5', 
      paddingBottom: '20px', 
      marginBottom: '25px'
    }}>
      <Link href={`/category/${catSlug}/${slug}`} style={{ textDecoration: 'none', display: 'block' }} className="group">
        
        {/* Kontainer Gambar */}
        <div style={{ 
          width: '100%', 
          aspectRatio: '16/10', 
          borderRadius: '20px', 
          overflow: 'hidden', 
          marginBottom: '18px',
          backgroundColor: '#F9F6FB',
          boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
        }}>
          <img 
            src={imageUrl} 
            alt={title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.5s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>

        {/* Konten Teks */}
        <div>
          <span style={{ 
            fontSize: '11px', 
            color: getCategoryColor(category), 
            fontWeight: 800, 
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '10px',
            letterSpacing: '1px',
            padding: '4px 10px',
            background: `${getCategoryColor(category)}15`,
            borderRadius: '8px'
          }}>
            {category}
          </span>
          
          <h3 style={{ 
            fontSize: '19px', 
            fontWeight: 900, 
            color: '#2D2438', 
            lineHeight: '1.4',
            margin: '0 0 12px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {title}
          </h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#94A3B8' }}>
            <span>{formattedDate}</span>
            <span style={{ color: '#EADFF2' }}>|</span>
            <span style={{ color: '#B294D1', fontWeight: 800 }}>Baca Artikel ➔</span>
          </div>
        </div>
      </Link>
    </article>
  );
}