'use client'

import Link from 'next/link'

export default function CategoryWidget() {
  // 🔥 Sesuaikan daftar kategori dengan image_1aa65f.png
  const categoriesList = [
    { name: "Pendidikan", slug: "pendidikan", icon: "🎓" },
    { name: "Parenting", slug: "parenting", icon: "👨‍👩‍👧‍👦" },
    { name: "Ruang Opini", slug: "ruang-opini", icon: "✍️" },
    { name: "Pustaka Dokumen", slug: "pustaka-dokumen", icon: "📁" },
    { name: "Serba-serbi", slug: "serba-serbi", icon: "✨" },
  ];

  return (
    <div style={{ marginBottom: 50 }}>
      {/* JUDUL WIDGET */}
      <h3 style={{ 
        fontSize: 20, 
        marginBottom: 25, 
        borderLeft: "5px solid #5D427C", 
        paddingLeft: 15, 
        color: '#5D427C', 
        fontWeight: 900,
        letterSpacing: '0.5px'
      }}>
        JELAJAH <span style={{color:'#B294D1'}}>KATEGORI</span>
      </h3>

      {/* LIST KATEGORI */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categoriesList.map((cat) => (
          <Link 
            key={cat.slug} 
            href={`/category/${cat.slug}`}
            className="cat-item-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              background: '#F9F6FB',
              borderRadius: '16px',
              textDecoration: 'none',
              transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid #F0EAF5'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <span className="cat-name" style={{ 
                fontSize: 15, 
                fontWeight: 700, 
                color: '#2D2438', 
                transition: '0.3s' 
              }}>
                {cat.name}
              </span>
            </div>
            <span className="cat-arrow" style={{ 
              color: '#B294D1', 
              fontSize: 14, 
              fontWeight: 'bold',
              transition: '0.3s' 
            }}>
              ➔
            </span>
          </Link>
        ))}
      </div>

      {/* STYLE KHUSUS HOVER */}
      <style jsx>{`
        :global(.cat-item-link:hover) {
          background: #5D427C !important;
          transform: translateX(8px);
          box-shadow: 0 10px 20px rgba(93, 66, 124, 0.15);
          border-color: #5D427C !important;
        }
        :global(.cat-item-link:hover .cat-name),
        :global(.cat-item-link:hover .cat-arrow) {
          color: #fff !important;
        }
        :global(.cat-item-link:active) {
          transform: scale(0.98) translateX(5px);
        }
      `}</style>
    </div>
  )
}