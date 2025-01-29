export interface VideoSource {
  src: string;
  type: string;
  quality?: '480p' | '720p' | '1080p';
}

export interface Video {
  id: string;
  sources: VideoSource[];
  poster?: string;
  title: string[];
}

export interface MainBannerProps {
  videos: Video[];
  autoPlayInterval?: number;
  logo?: string;
}
