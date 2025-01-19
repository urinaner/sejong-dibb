export interface NewsItem {
  id: number;
  title: string;
  content: string;
  createDate: string;
  image: string;
  view: number;
  category?: string;
}
