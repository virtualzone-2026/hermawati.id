"use client"; // WAJIB: Agar styled-jsx bisa berjalan

export default function CategoryHero({ title, description }: { title: string, description: string }) {
  // Logika warna garis bawah dinamis berdasarkan judul (opsional)
  const getLineColor = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('parenting')) return '#d63384'; // Pink untuk Parenting
    if (lower.includes('dokumen')) return '#198754';   // Hijau untuk Dokumen
    return '#d4af37'; // Emas standar untuk Pendidikan/Opini/Lainnya
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-desc">{description}</p>
        <div className="hero-line" style={{ background: getLineColor(title) }}></div>
      </div>

      <style jsx>{`
        .hero-container {
          background: #ffffff;
          padding: 60px 20px;
          border-bottom: 1px solid #f0f0f0;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }
        
        /* Memberikan sedikit tekstur background agar tidak terlalu flat */
        .hero-container::before {
          content: "";
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: #1a365d05;
          border-radius: 50%;
        }

        .hero-content { 
          max-width: 1200px; 
          margin: 0 auto; 
          position: relative;
          z-index: 1;
        }

        .hero-title {
          font-size: 42px;
          font-weight: 900;
          color: #1a365d; /* Biru Navy */
          margin-bottom: 15px;
          letter-spacing: -1.5px;
          text-transform: uppercase;
        }

        .hero-desc { 
          font-size: 18px; 
          color: #555; 
          line-height: 1.6; 
          max-width: 800px; 
          margin-bottom: 25px; 
        }

        .hero-line { 
          width: 80px; 
          height: 5px; 
          border-radius: 10px; 
        }

        @media (max-width: 768px) {
          .hero-container { padding: 40px 20px; }
          .hero-title { font-size: 32px; }
          .hero-desc { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}