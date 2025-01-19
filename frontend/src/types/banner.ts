import { Video } from '../components/Banner/VideoBanner/types';

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

export interface MainBannerProps extends BannerBaseProps {
  videoSrc?: string;
  title?: string;
  logo?: string;
  videos?: Video[];
  autoPlayInterval?: number;
}

export interface PageBannerProps extends BannerBaseProps {
  content: PageContent;
}
