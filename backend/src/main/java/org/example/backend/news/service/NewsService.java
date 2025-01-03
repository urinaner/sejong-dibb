package org.example.backend.news.service;

import static org.example.backend.news.exception.NewsExceptionType.NOT_FOUND_NEWS;

import lombok.RequiredArgsConstructor;
import org.example.backend.global.config.aws.S3Uploader;
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
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsService {
    private final NewsRepository newsRepository;
    private final S3Uploader s3Uploader;
    private static final String dirName = "news";

    @Transactional
    public Long saveNews(NewsReqDto newsReqDto, MultipartFile multipartFile) {

        if (multipartFile != null && !multipartFile.isEmpty()) {
            String uploadImageUrl = s3Uploader.upload(multipartFile, dirName);
            newsReqDto.setImage(uploadImageUrl);
        }
        News news = News.of(newsReqDto);
        News savedNews = newsRepository.save(news);
        return savedNews.getId();
    }

    public NewsResDto getNews(Long newsId) {
        News news = findNewsById(newsId);
        return NewsResDto.of(news);
    }

    @Transactional
    public NewsResDto updateNews(Long newsId, NewsReqDto newsReqDto, MultipartFile multipartFile) {
        if (multipartFile != null && !multipartFile.isEmpty()) {
            String uploadImageUrl = s3Uploader.upload(multipartFile, dirName);
            newsReqDto.setImage(uploadImageUrl);
        }

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