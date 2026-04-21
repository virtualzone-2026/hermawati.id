import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'; // Ini ambil dari library resmi (Node Modules)
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schemaTypes';

// FIX DI SINI: Kita panggil 'deskStructure', bukan 'structure' lagi gaes!
import { structure } from './sanity/deskStructure'; 

export default defineConfig({
  name: 'default',
  title: 'Hermawati Blog',
  projectId: 'jrxdv4ry',
  dataset: 'production',
  basePath: '/studio', // Agar studio bisa diakses di /studio
  
  plugins: [
    // Kita masukkan kustom struktur dari file deskStructure tadi
    structureTool({ structure }), 
    visionTool()
  ],

  schema: {
    types: schema.types,
  },
});