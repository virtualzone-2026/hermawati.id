import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import author from './author' // Import schema author yang baru dibuat

export const schema: { types: SchemaTypeDefinition[] } = {
  // Menampilkan menu Konten Utama dan Penulis di Dashboard
  types: [
    post, 
    author
  ],
}