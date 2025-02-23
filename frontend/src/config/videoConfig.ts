import { Video } from '../components/Banner/VideoBanner/types';

const CDN_URL = 'https://video-cache-worker.pillow12360.workers.dev';

export const mainVideos: Video[] = [
  {
    id: '1',
    sources: [
      {
        src: `${CDN_URL}/output_main_720p.mp4`,
        type: 'video/mp4',
        quality: '720p',
        default: true,
      },
      {
        src: `${CDN_URL}/output_main_1080p.mp4`,
        type: 'video/mp4',
        quality: '1080p',
        media: '(min-width: 1080px)',
      },
      {
        src: `${CDN_URL}/output_main.webm`,
        type: 'video/webm',
        quality: '1080p',
        media: '(min-width: 1080px)',
      },
    ],
    poster: `${CDN_URL}/main_poster.jpg`,
    title: ['Integrative', 'Bioscience', 'Biotechnology'],
  },
  {
    id: '2',
    sources: [
      {
        src: `${CDN_URL}/output_main_2_720p.mp4`,
        type: 'video/mp4',
        quality: '720p',
        default: true,
      },
      {
        src: `${CDN_URL}/output_main_2_1080p.mp4`,
        type: 'video/mp4',
        quality: '1080p',
        media: '(min-width: 1080px)',
      },
      {
        src: `${CDN_URL}/output_main_2.webm`,
        type: 'video/webm',
        quality: '1080p',
        media: '(min-width: 1080px)',
      },
    ],
    poster: `${CDN_URL}/main_2_poster.jpg`,
    title: ['Integrative', 'Bioscience', 'Biotechnology'],
  },
];
