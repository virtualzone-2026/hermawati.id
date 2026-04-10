export default {
  name: 'post',
  title: 'Konten Utama',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Konten',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori Induk',
      type: 'string',
      options: {
        list: [
          { title: 'Berita', value: 'berita' },
          { title: 'Artikel', value: 'artikel' },
          { title: 'Qur\'an Hadits', value: 'quran-hadits' }, // Pengganti Tafsir
          { title: 'Adab dan Fawaid', value: 'adab-fawaid' }, // Pengganti Hadits Pilihan
          { title: 'Fiqih Praktis', value: 'fiqih' },
          { title: 'Mutiara Hikmah', value: 'hikmah' },
          { title: 'Khutbah', value: 'khutbah' },
          { title: 'Dzikir & Doa', value: 'dzikir-doa' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    // SUB-KATEGORI DINAMIS
    {
      name: 'subCategory',
      title: 'Sub-Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Qur\'an', value: 'quran' },
          { title: 'Hadits', value: 'hadits' },
          { title: 'Adab', value: 'adab' },
          { title: 'Fawaid', value: 'fawaid' },
        ],
      },
      // Logika agar Sub-Kategori hanya muncul jika Kategori Induk yang sesuai dipilih
      hidden: ({ document }: any) => 
        !['quran-hadits', 'adab-fawaid'].includes(document?.category)
    },
    {
      name: 'author',
      title: 'Penulis/Narasumber',
      type: 'string',
      initialValue: 'Abah Saif',
    },
    {
      name: 'mainImage',
      title: 'Gambar Utama',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'body',
      title: 'Isi Konten',
      type: 'array',
      of: [{ type: 'block' }], 
    },
    {
      name: 'attachment',
      title: 'Lampiran Materi (PDF/PPT)',
      type: 'file',
      options: { accept: '.pdf,.ppt,.pptx' },
      fields: [
        {
          name: 'description',
          type: 'string',
          title: 'Keterangan File',
        }
      ]
    },
  ],
}