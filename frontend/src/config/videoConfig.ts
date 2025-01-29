import { Video } from '../components/Banner/VideoBanner/types';

export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

export const mainVideos: Video[] = [
  {
    id: '1',
    sources: [
      {
        src: `${CDN_URL}/assets/videos/output_main_1080p.mp4`,
        type: 'video/mp4',
        quality: '1080p',
      },
      {
        src: `${CDN_URL}/assets/videos/output_main_720p.mp4`,
        type: 'video/mp4',
        quality: '720p',
      },
      {
        src: `${CDN_URL}/assets/videos/output_main.webm`,
        type: 'video/webm',
        quality: '1080p',
      },
    ],
    poster: `${CDN_URL}/assets/videos/main_poster.jpg`,
    title: ['integrative', 'bioscience', 'biotechnology'],
  },
  {
    id: '2',
    sources: [
      {
        src: `${CDN_URL}/assets/videos/output_main_2_1080p.mp4`,
        type: 'video/mp4',
        quality: '1080p',
      },
      {
        src: `${CDN_URL}/assets/videos/output_main_2_720p.mp4`,
        type: 'video/mp4',
        quality: '720p',
      },
      {
        src: `${CDN_URL}/assets/videos/output_main_2.webm`,
        type: 'video/webm',
        quality: '1080p',
      },
    ],
    poster: `${CDN_URL}/assets/videos/main_2_poster.jpg`,
    title: ['integrative', 'bioscience', 'biotechnology'],
  },
];
