export default {
  name: 'post',
  title: 'Konten Utama',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Konten',
      type: 'string',
      validation: (Rule) => Rule.required().error('Judul harus diisi'),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori Utama',
      type: 'string',
      options: {
        list: [
          { title: 'Pendidikan', value: 'pendidikan' },
          { title: 'Parenting', value: 'parenting' },
          { title: 'Ruang Opini', value: 'opini' },
          { title: 'Pustaka Dokumen', value: 'dokumen' },
          { title: 'Serba-serbi', value: 'serba-serbi' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Penulis',
      type: 'string',
      initialValue: 'Admin', // Silakan ganti sesuai nama Anda
    },
    {
      name: 'mainImage',
      title: 'Gambar Utama (Thumbnail)',
      type: 'image',
      options: { hotspot: true },
      // Gambar opsional untuk Pustaka Dokumen, tapi wajib untuk kategori lain jika ingin tampilan rapi
    },
    {
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'body',
      title: 'Isi Konten',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' } // Menambahkan dukungan gambar di dalam teks
      ],
    },
    {
      name: 'attachment',
      title: 'Unggah File (Khusus Pustaka Dokumen)',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx' },
      // Field ini otomatis muncul hanya jika kategori 'Pustaka Dokumen' dipilih
      hidden: ({ document }) => document?.category !== 'dokumen',
      fields: [
        {
          name: 'description',
          type: 'string',
          title: 'Nama/Keterangan File',
        }
      ]
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
    },
  },
}