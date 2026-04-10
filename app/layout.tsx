import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google"; // Import Inter untuk teks latin, Amiri untuk Arab
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 1. Konfigurasi Font Latin (Inter)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

// 2. Konfigurasi Font Arab (Amiri)
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri", // Kita simpan di CSS variable agar bisa dipanggil di mana saja
});

export const metadata: Metadata = {
  title: "Abah Saif - Menggali Ilmu, Membuka Cahaya",
  description: "Wadah edukasi dan literasi Islam yang menyajikan konten murni, menyejukkan, dan mencerahkan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${amiri.variable}`}>
      <body 
        className="antialiased" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          fontFamily: 'var(--font-inter), sans-serif' // Font default adalah latin
        }}
      >
        <Header />
        
        <main style={{ flex: 1 }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}