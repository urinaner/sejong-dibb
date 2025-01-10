export interface PageContent {
  title: string;
  description: string;
  image: string;
  path: string;
}

export interface BannerBaseProps {
  overlay?: boolean;
  overlayOpacity?: number;
}

export interface VideoContent {
  id: string;
  src: string;
  title: string[];
}

export interface MainBannerProps extends BannerBaseProps {
  videoSrc: string;
  logo?: string;
  title: string;
  videos?: VideoContent[];
  autoPlayInterval?: number;
}

export interface PageBannerProps extends BannerBaseProps {
  content: PageContent;
}
