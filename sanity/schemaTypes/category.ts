export default {
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nama Kategori',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
    },
  ],
}