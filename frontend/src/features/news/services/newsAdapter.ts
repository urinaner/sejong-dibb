// src/features/news/services/newsAdapter.ts
import type { News, NewsFormData } from '../types';

export const newsAdapter = {
  toModel(apiResponse: any): News {
    return {
      id: apiResponse.id,
      title: apiResponse.title,
      content: apiResponse.content,
      view: apiResponse.view || 0,
      createDate: apiResponse.createDate,
      link: apiResponse.link || '',
      image: apiResponse.image || '',
    };
  },

  toFormData(news: Partial<News>): NewsFormData {
    return {
      title: news.title || '',
      content: news.content || '',
      link: news.link,
      createDate: news.createDate || new Date().toISOString().split('T')[0],
    };
  },

  createFormData(newsData: NewsFormData, imageFile?: File | null): FormData {
    const formData = new FormData();

    const newsReqDto = {
      title: newsData.title.trim(),
      content: newsData.content.trim(),
      link: newsData.link || '',
      image: '',
      createDate: newsData.createDate,
    };

    formData.append(
      'newsReqDto',
      new Blob([JSON.stringify(newsReqDto)], {
        type: 'application/json',
      }),
    );

    if (imageFile) {
      formData.append('newsImage', imageFile);
    }

    return formData;
  },
};
