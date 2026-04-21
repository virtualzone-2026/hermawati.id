'use client'

import { NextStudio } from 'next-sanity/studio'
// FIX: Cukup naik 3 tingkat (../../../) untuk sampai ke Root
import config from '../../../sanity.config' 

export default function Studio() {
  return <NextStudio config={config} />
}