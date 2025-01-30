export interface VideoSource {
  src: string;
  type: string;
  quality: string;
  default?: boolean;
  media?: string;
}

export interface Video {
  id: string;
  sources: VideoSource[];
  title: string[];
  poster?: string;
}

export interface MainBannerProps {
  videos: Video[];
  autoPlayInterval?: number;
  logo?: string;
}
