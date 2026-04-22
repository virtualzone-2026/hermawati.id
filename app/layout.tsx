import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 1. Konfigurasi Font Latin (Inter) - Untuk teks umum
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// 2. Konfigurasi Font Arab (Amiri) - Untuk kutipan ayat/teks Arab
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: 'swap',
});

/**
 * 3. METADATA API (Solusi Share Medsos)
 * Ini adalah "kartu nama" website kamu di dunia digital.
 */
export const metadata: Metadata = {
  // PENTING: Ganti dengan domain asli kamu agar link gambar absolut
  metadataBase: new URL('https://hermawati.web.id'), 
  
  title: {
    default: "Hermawati - Literasi Pendidikan & Parenting",
    template: "%s | Hermawati"
  },
  description: "Wadah literasi digital yang fokus pada dunia pendidikan, pola asuh anak, dan berbagi dokumen bermanfaat untuk keluarga Indonesia.",
  
  // Open Graph (Untuk WhatsApp, Facebook, Instagram)
  openGraph: {
    title: "Hermawati - Inspirasi Keluarga Indonesia",
    description: "Media literasi seputar pendidikan, parenting, dan dokumen bermanfaat.",
    url: 'https://hermawati.web.id',
    siteName: 'Hermawati Literasi',
    images: [
      {
        url: '/og-default.jpg', // Pastikan file ini ada di folder public/ gaes!
        width: 1200,
        height: 630,
        alt: 'Hermawati Literasi Digital',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Hermawati - Pendidikan & Parenting',
    description: 'Wadah literasi digital untuk keluarga cerdas.',
    images: ['/og-default.jpg'],
  },

  // Icon & Theme Color (Warna bar di browser HP)
  themeColor: '#5D427C',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${amiri.variable}`} suppressHydrationWarning>
      <head>
        {/* Global CSS Variables & Scrollbar Styling */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary-purple: #5D427C;     /* Ungu Tua Logo */
            --secondary-lavender: #B294D1;  /* Ungu Muda Logo */
            --bright-lavender: #D8B4FE;     /* Lavender Cerah untuk Hover */
            --accent-emerald: #10b981;      /* Hijau untuk Pustaka Dokumen */
            --bg-soft: #FDFCFD;             /* Background Bersih */
          }

          body {
            background-color: var(--bg-soft);
            color: #2D2438;
            margin: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Custom Scrollbar Premium */
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-track { background: #f8f6fa; }
          ::-webkit-scrollbar-thumb { 
            background: var(--secondary-lavender); 
            border-radius: 20px; 
            border: 2px solid #f8f6fa;
          }
          ::-webkit-scrollbar-thumb:hover { 
            background: var(--primary-purple); 
          }

          /* Utility class untuk teks Arab (Amiri) */
          .font-amiri {
            font-family: var(--font-amiri), serif;
          }

          /* Smooth Scroll */
          html { scroll-behavior: smooth; }
        `}} />
      </head>
      
      <body 
        className="antialiased" 
        suppressHydrationWarning={true} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
        {/* Navigasi Atas */}
        <Header />
        
        {/* Wrapper Konten Utama */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Footer Bawah */}
        <Footer />
      </body>
    </html>
  );
}