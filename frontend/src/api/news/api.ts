import axios from 'axios';
import { apiEndpoints, NewsReqDto } from '../../config/apiConfig';
import type { NewsFormRequest } from './types';
import type {
  NewsResponse,
  PaginationParams,
  ApiResponse,
  PaginatedResponse,
  NewsItem,
  NewsListResponse,
} from '../../types/api';

export const newsApi = {
  getNews: async (id: number): Promise<NewsResponse> => {
    const { data } = await axios.get<ApiResponse<NewsResponse>>(
      apiEndpoints.news.get(id),
    );
    return data.data;
  },

  getNewsList: async ({
    page,
    size,
  }: PaginationParams): Promise<NewsListResponse> => {
    const { data } = await axios.get<ApiResponse<NewsListResponse>>(
      apiEndpoints.news.listWithPage(page, size),
    );
    return data.data;
  },

  createNews: async (newsData: NewsFormRequest): Promise<number> => {
    const newsReqDto: NewsReqDto = {
      title: newsData.title,
      content: newsData.content,
      link: newsData.link || '',
      image: '',
      createDate: newsData.createDate,
    };

    const formData = apiEndpoints.news.create.getFormData(
      newsReqDto,
      newsData.image || null,
    );

    const { data } = await axios.post<ApiResponse<number>>(
      apiEndpoints.news.create.url,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );
    return data.data;
  },

  updateNews: async ({
    id,
    ...newsData
  }: NewsFormRequest & { id: number }): Promise<void> => {
    const newsReqDto: NewsReqDto = {
      title: newsData.title,
      content: newsData.content,
      link: newsData.link || '',
      image: '',
      createDate: newsData.createDate,
    };

    const formData = apiEndpoints.news.update.getFormData(
      newsReqDto,
      newsData.image || null,
    );

    await axios.post(apiEndpoints.news.update.url(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteNews: async (id: number): Promise<void> => {
    await axios.delete(apiEndpoints.news.delete(id));
  },
};
