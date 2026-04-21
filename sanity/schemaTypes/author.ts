import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Penulis',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      // Validasi agar nama tidak boleh kosong
      validation: (Rule) => Rule.required().error('Nama penulis wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true, // Memungkinkan kamu mengatur fokus foto (wajah)
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biografi Singkat',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          // Kita batasi hanya teks normal untuk biografi agar tidak terlalu ramai
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [], // Tanpa list (bullet points) untuk bio singkat
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})