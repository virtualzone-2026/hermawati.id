import { type SchemaTypeDefinition } from 'sanity'

/** * PERBAIKAN: 
 * 1. Hapus kurung kurawal { } karena kita pakai 'export default' di file-nya.
 * 2. Sesuaikan nama file dari './blockContentType' ke './blockContent'.
 */
import blockContent from './blockContent' 
import category from './category'
import post from './post'
import author from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  // Masukkan variabel yang sudah diimport dengan benar ke sini
  types: [blockContent, category, post, author],
}