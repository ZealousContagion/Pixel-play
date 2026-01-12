import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pixel Play Creative Engine',
    short_name: 'Pixel Play',
    description: 'High-performance creative portfolio showcasing Web, Design, and 3D.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1b4c',
    theme_color: '#0f1b4c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
