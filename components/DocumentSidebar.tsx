import { FileText, Download } from 'lucide-react'; // Pastikan install lucide-react atau ganti dengan icon lain
import Link from 'next/link';

interface DocumentProps {
  documents: any[]; // Sesuaikan dengan tipe data Sanity Anda
}

export default function DocumentSidebar({ documents }: DocumentProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-emerald-600 p-4">
        <h2 className="text-white font-bold flex items-center gap-2 uppercase tracking-wider text-sm">
          <FileText size={18} /> Pustaka Dokumen
        </h2>
      </div>
      
      <div className="p-2">
        {documents.length > 0 ? (
          documents.map((doc: any) => (
            <Link 
              key={doc._id} 
              href={`/post/${doc.slug.current}`}
              className="group flex items-center justify-between p-3 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-50 last:border-0"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 line-clamp-1">
                  {doc.title}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">
                  {new Date(doc.publishedAt).toLocaleDateString('id-ID')}
                </span>
              </div>
              <div className="text-emerald-500 group-hover:scale-110 transition-transform">
                <Download size={18} />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center py-6 text-sm text-gray-400 italic">
            Belum ada dokumen tersedia.
          </p>
        )}
      </div>
      
      <Link 
        href="/category/dokumen" 
        className="block text-center py-3 text-xs font-bold text-emerald-600 hover:bg-emerald-50 border-t border-gray-100"
      >
        LIHAT SEMUA DOKUMEN
      </Link>
    </div>
  );
}