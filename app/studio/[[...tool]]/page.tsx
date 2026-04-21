/**
 * Ini adalah Server Component (Tanpa 'use client')
 */
import Studio from './Studio'

// Metadata & Viewport aman di sini karena ini Server Side
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <Studio />
}