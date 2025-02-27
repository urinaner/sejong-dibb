// src/features/news/services/newsService.ts
import { axiosInstance } from '../../../config/apiConfig';
import { apiEndpoints } from '../../../config/apiConfig';
import { newsAdapter } from './newsAdapter';
import type { News, NewsListResponse, NewsFormData } from '../types';

export const newsService = {
  async fetchList(params: {
    page: number;
    size: number;
  }): Promise<NewsListResponse> {
    const response = await axiosInstance.get<NewsListResponse>(
      apiEndpoints.news.listWithPage(params.page, params.size),
    );

    return {
      ...response.data,
      data: response.data.data.map(newsAdapter.toModel),
    };
  },

  async fetchDetail(id: number): Promise<News> {
    const response = await axiosInstance.get(apiEndpoints.news.get(id));
    return newsAdapter.toModel(response.data);
  },

  async create(data: NewsFormData, imageFile?: File | null): Promise<number> {
    const formData = newsAdapter.createFormData(data, imageFile);

    const response = await axiosInstance.post(
      apiEndpoints.news.create.url,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data;
  },

  async update(
    id: number,
    data: NewsFormData,
    imageFile?: File | null,
  ): Promise<number> {
    const formData = newsAdapter.createFormData(data, imageFile);

    const response = await axiosInstance.post(
      apiEndpoints.news.update.url(id),
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(apiEndpoints.news.delete(id));
  },
};
