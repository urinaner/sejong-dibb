export interface PageContent {
  title: string;
  description: string;
  image: string;
  path: string;
  subPages?: {
    [key: string]: Omit<PageContent, 'subPages'>;
  };
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
