export interface Video {
  id: string;
  src: string;
  title: string[];
}

export interface VideoBannerProps {
  videos: Video[];
  autoPlayInterval?: number;
}
