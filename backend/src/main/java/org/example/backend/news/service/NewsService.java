package org.example.backend.news.service;

import static org.example.backend.news.exception.NewsExceptionType.NOT_FOUND_NEWS;

import lombok.RequiredArgsConstructor;
import org.example.backend.news.domain.dto.NewsReqDto;
import org.example.backend.news.domain.dto.NewsResDto;
import org.example.backend.news.domain.entity.News;
import org.example.backend.news.exception.NewsException;
import org.example.backend.news.exception.NewsExceptionType;
import org.example.backend.news.repository.NewsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsService {
    private final NewsRepository newsRepository;

    @Transactional
    public Long saveNews(NewsReqDto newsReqDto) {
        validateUserRequiredFields(newsReqDto);
        News news = News.of(newsReqDto);
        News savedNews = newsRepository.save(news);
        return savedNews.getId();
    }

    private void validateUserRequiredFields(NewsReqDto dto) {
        if (dto.getTitle() == null || dto.getTitle().isEmpty()) {
            throw new NewsException(NewsExceptionType.REQUIRED_TITLE);
        }
    }

    public NewsResDto getNews(Long newsId) {
        News news = findNewsById(newsId);
        return NewsResDto.of(news);
    }

    @Transactional
    public NewsResDto updateNews(Long newsId, NewsReqDto newsReqDto) {
        News news = findNewsById(newsId);
        news.update(newsReqDto);
        return NewsResDto.of(news);
    }

    public void deleteNews(Long newsId) {
        News news = findNewsById(newsId);
        newsRepository.delete(news);
    }

    private News findNewsById(Long newsId) {
        return newsRepository.findById(newsId)
                .orElseThrow(() -> new NewsException(NOT_FOUND_NEWS));
    }

    public Page<NewsResDto> getAllNewss(Pageable pageable) {
        return newsRepository.findAll(pageable)
                .map(NewsResDto::of);
    }
}