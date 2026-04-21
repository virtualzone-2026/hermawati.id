// components/CategoryPills.tsx
"use client";

import Link from 'next/link';

const categories = [
  { title: 'Pendidikan', slug: 'pendidikan', bg: '#eef2ff', text: '#1a365d' },
  { title: 'Parenting', slug: 'parenting', bg: '#fdf2f8', text: '#d63384' },
  { title: 'Ruang Opini', slug: 'opini', bg: '#fffbeb', text: '#d97706' },
  { title: 'Pustaka Dokumen', slug: 'dokumen', bg: '#ecfdf5', text: '#059669' },
  { title: 'Serba-serbi', slug: 'serba-serbi', bg: '#f3f4f6', text: '#374151' },
];

export default function CategoryPills() {
  return (
    <div style={{ 
      padding: '20px 0', 
      borderTop: '1px solid #eee', 
      borderBottom: '1px solid #eee',
      marginTop: '20px'
    }}>
      <span style={{ 
        display: 'block',
        fontSize: '11px', 
        fontWeight: '800', 
        color: '#999', 
        textTransform: 'uppercase', 
        letterSpacing: '1.5px',
        marginBottom: '15px'
      }}>
        Eksplor Kategori:
      </span>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '12px' 
      }}>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="category-pill"
            style={{ 
              textDecoration: 'none',
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '13px',
              fontWeight: '700',
              backgroundColor: cat.bg,
              color: cat.text,
              transition: 'all 0.3s ease',
              border: '1px solid transparent',
              display: 'inline-block'
            }}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* Gunakan CSS murni untuk Hover agar tidak memicu Runtime Error */}
      <style jsx>{`
        .category-pill:hover {
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transform: translateY(-2px);
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}