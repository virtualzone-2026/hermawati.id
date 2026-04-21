import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 1. Konfigurasi Font Latin (Inter)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// 2. Konfigurasi Font Arab (Amiri)
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: 'swap',
});

// Update Metadata sesuai branding HERMAWATI
export const metadata: Metadata = {
  title: "Hermawati.web.id - Pendidikan, Parenting & Inspirasi Keluarga",
  description: "Wadah literasi digital yang fokus pada dunia pendidikan, pola asuh anak, dan berbagi dokumen bermanfaat untuk keluarga Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Tambahkan suppressHydrationWarning di sini karena extension browser sering mengubah atribut html
    <html lang="id" className={`${inter.variable} ${amiri.variable}`} suppressHydrationWarning>
      <head>
        {/* Konsistensi Tema Warna Ungu & Lavender */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --primary-purple: #5D427C;     /* Ungu Tua Logo */
            --secondary-lavender: #B294D1;  /* Ungu Muda Logo */
            --bright-lavender: #D8B4FE;     /* Lavender Cerah untuk Hover */
            --bg-soft: #FDFCFD;             /* Background Bersih */
          }

          body {
            background-color: var(--bg-soft);
            color: #2D2438;
            margin: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Global Link Styling */
          a { 
            transition: all 0.3s ease; 
            color: inherit;
            text-decoration: none;
          }
          
          /* Custom Scrollbar Lavender */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { 
            background: var(--secondary-lavender); 
            border-radius: 10px; 
          }
          ::-webkit-scrollbar-thumb:hover { 
            background: var(--primary-purple); 
          }

          /* Utility class untuk teks Arab */
          .font-amiri {
            font-family: var(--font-amiri), serif;
          }
        `}} />
      </head>
      <body 
        className="antialiased" 
        // FIX: Ini kunci agar error Hydration Mismatch dari Grammarly/Extension hilang!
        suppressHydrationWarning={true} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          fontFamily: 'var(--font-inter), sans-serif',
        }}
      >
        {/* Komponen Header */}
        <Header />
        
        {/* Konten Utama */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Komponen Footer */}
        <Footer />
      </body>
    </html>
  );
}