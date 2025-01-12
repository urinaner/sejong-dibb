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
  videoSrc: string;
  logo?: string;
  title: string;
}

export interface PageBannerProps extends BannerBaseProps {
  content: PageContent;
}
export interface MainBannerProps {
  videoSrc: string;
  title: string;
  logo?: string;
}
export interface PageBannerProps {
  content: PageContent;
}
