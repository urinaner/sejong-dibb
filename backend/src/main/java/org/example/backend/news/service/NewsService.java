package org.example.backend.news.service;

import static org.example.backend.news.exception.NewsExceptionType.NOT_FOUND_NEWS;

import lombok.RequiredArgsConstructor;
import org.example.backend.common.utils.PersonalInfoFilterUtil;
import org.example.backend.global.config.file.LocalFileUploader;
import org.example.backend.news.domain.dto.NewsReqDto;
import org.example.backend.news.domain.dto.NewsResDto;
import org.example.backend.news.domain.entity.News;
import org.example.backend.news.exception.NewsException;
import org.example.backend.news.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true) // JPA가 변경 감지(dirty checking)를 하지 않음 -> 조회 성능 최적화
public class NewsService {
    private final NewsRepository newsRepository;
    private final LocalFileUploader localFileUploader;
    private static final String dirName = "news";

    @Value("${server.url}")
    private String serverUrl;

    @Transactional
    public Long saveNews(NewsReqDto newsReqDto, MultipartFile multipartFile) {
        PersonalInfoFilterUtil.validatePersonalInfo(newsReqDto.getContent());

        if (multipartFile != null && !multipartFile.isEmpty()) {
            String uploadImageUrl = localFileUploader.upload(multipartFile, dirName);
            newsReqDto.setImage(serverUrl + uploadImageUrl);
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
            String uploadImageUrl = localFileUploader.upload(multipartFile, dirName);
            newsReqDto.setImage(uploadImageUrl);
        }

        News news = findNewsById(newsId);
        news.update(newsReqDto);
        return NewsResDto.of(news);
    }

    @Transactional
    public void deleteNews(Long newsId) {
        News news = findNewsById(newsId);
        newsRepository.delete(news);
    }

    private News findNewsById(Long newsId) {
        return newsRepository.findById(newsId)
                .orElseThrow(() -> new NewsException(NOT_FOUND_NEWS));
    }

    @Cacheable(value = "news", key = "{#pageable.pageNumber, #pageable.pageSize}")
    public Page<NewsResDto> getAllNews(Pageable pageable) {
        return newsRepository.findAll(pageable)
                .map(NewsResDto::of);
    }
    @Transactional
    public String incrementViewCount(Long newsId, String newsViewCookie) {
        if (newsViewCookie == null || !newsViewCookie.contains("[" + newsId + "]")) {
            readCount(newsId);

            if (newsViewCookie == null || newsViewCookie.isEmpty()) {
                return "[" + newsId + "]";
            }
            return newsViewCookie + "_[" + newsId + "]";
        }

        return newsViewCookie;
    }

    @Transactional
    public void readCount(Long newsId) {
        newsRepository.incrementViewCount(newsId);
    }

    public Page<NewsResDto> searchNews(String keyword, Pageable pageable) {
        return newsRepository.searchByKeyword(keyword, pageable)
                .map(NewsResDto::of);
    }
}