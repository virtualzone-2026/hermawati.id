import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Konten Utama',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Konten',
      type: 'string',
      validation: (Rule) => Rule.required().error('Judul harus diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori Utama',
      type: 'reference', 
      to: [{ type: 'category' }], 
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'reference',      // FIX: Sekarang sinkron dengan menu Authors
      to: [{ type: 'author' }], // Merujuk ke skema author.ts
      validation: (Rule) => Rule.required().error('Pilih penulis dari daftar yang ada'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Gambar Utama (Thumbnail)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Tanggal Terbit',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Isi Konten',
      type: 'blockContent', // FIX: Menggunakan skema blockContent.ts yang baru
    }),
    defineField({
      name: 'attachment',
      title: 'Unggah File (Khusus Pustaka Dokumen)',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx' },
      // TIPS: Karena category sekarang reference, logika hidden lebih aman 
      // dikontrol secara manual atau biarkan muncul jika kategori dipilih.
      hidden: ({ document }) => !document?.category, 
      fields: [
        {
          name: 'description',
          type: 'string',
          title: 'Nama/Keterangan File',
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authorName: 'author.name', // Mengambil nama dari referensi author
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, authorName, media } = selection
      return {
        title: title,
        subtitle: authorName ? `Oleh: ${authorName}` : 'Tanpa Penulis',
        media: media,
      }
    },
  },
})