package org.example.backend.news.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.common.dto.PageRequestDto;
import org.example.backend.common.dto.ResponseDto;
import org.example.backend.news.domain.dto.NewsReqDto;
import org.example.backend.news.domain.dto.NewsResDto;
import org.example.backend.news.service.NewsService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Tag(name = "뉴스", description = "뉴스 API")
@RequestMapping("/api/news")
public class NewsController {
    private final NewsService newsService;

    @Operation(summary = "뉴스 생성 API", description = "뉴스 생성")
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Long> createNews(
            @RequestPart(value = "newsReqDto") @Valid NewsReqDto newsReqDto,
            @RequestPart(value = "newsImage", required = false) MultipartFile multipartFile
    ) {
        Long newsId = newsService.saveNews(newsReqDto, multipartFile);
        return new ResponseEntity<>(newsId, HttpStatus.OK);
    }

    @Operation(summary = "모든 뉴스 조회 API", description = "모든 뉴스의 리스트 반환")
    @GetMapping
    public ResponseDto<List<NewsResDto>> getAllNews(@ModelAttribute @Valid PageRequestDto pageRequest) {

        Page<NewsResDto> newsList = newsService.getAllNews(pageRequest.toPageable());
        return ResponseDto.ok(newsList.getNumber(), newsList.getTotalPages(), newsList.getContent());
    }

    @Operation(summary = "단일 뉴스 조회 API", description = "단일 뉴스의 리스트 반환")
    @GetMapping("/{newsId}")
    public ResponseEntity<NewsResDto> getNews(@PathVariable(name = "newsId") Long newsId) {
        NewsResDto newsResDto = newsService.getNews(newsId);
        return new ResponseEntity<>(newsResDto, HttpStatus.OK);
    }

    @Operation(summary = "뉴스 정보 업데이트 API", description = "뉴스 정보 업데이트")
    @PostMapping("/{newsId}")
    public ResponseEntity<NewsResDto> updateNews(@PathVariable(name = "newsId") Long newsId,
                                                 @RequestPart(value = "newsReqDto") NewsReqDto newsReqDto,
                                                 @RequestPart(value = "newsImage", required = false) MultipartFile multipartFile) {
        NewsResDto newsResDto = newsService.updateNews(newsId, newsReqDto, multipartFile);
        return new ResponseEntity<>(newsResDto, HttpStatus.OK);
    }

    @Operation(summary = "뉴스 삭제 API", description = "뉴스 삭제")
    @DeleteMapping("/{newsId}")
    public ResponseEntity<?> deleteNews(@PathVariable(name = "newsId") Long newsId) {
        newsService.deleteNews(newsId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "키워드 검색 API", description = "키워드 검색")
    @GetMapping("/search")
    public ResponseDto<List<NewsResDto>> searchNews(@RequestParam String keyword,
                                                    @Valid @ModelAttribute PageRequestDto pageRequest) {
        Page<NewsResDto> newsList = newsService.searchNews(keyword, pageRequest.toPageableUnsorted());
        return ResponseDto.ok(newsList.getNumber(), newsList.getTotalPages(), newsList.getContent());
    }
}
