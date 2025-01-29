import { Video } from '../components/Banner/VideoBanner/types';

const CDN_URL = 'https://pub-e4ab6fbbf2154b7bb658f18011c1b707.r2.dev';

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
        src: `${CDN_URL}/output_main_720p.mp4`,
        type: 'video/mp4',
        quality: '720p',
      },
      {
        src: `${CDN_URL}/output_main.webm`,
        type: 'video/webm',
        quality: '1080p',
      },
    ],
    poster: `${CDN_URL}/main_poster.jpg`,
    title: ['integrative', 'bioscience', 'biotechnology'],
  },
  {
    id: '2',
    sources: [
      {
        src: `${CDN_URL}/output_main_2_1080p.mp4`,
        type: 'video/mp4',
        quality: '1080p',
      },
      {
        src: `${CDN_URL}/output_main_2_720p.mp4`,
        type: 'video/mp4',
        quality: '720p',
      },
      {
        src: `${CDN_URL}/output_main_2.webm`,
        type: 'video/webm',
        quality: '1080p',
      },
    ],
    poster: `${CDN_URL}/main_2_poster.jpg`,
    title: ['integrative', 'bioscience', 'biotechnology'],
  },
];
