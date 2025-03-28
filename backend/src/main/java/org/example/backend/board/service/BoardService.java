package org.example.backend.board.service;

import static org.example.backend.board.exception.BoardExceptionType.NOT_FOUND_BOARD;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.board.domain.entity.Board;
import org.example.backend.board.domain.entity.Category;
import org.example.backend.board.exception.BoardException;
import org.example.backend.board.exception.BoardExceptionType;
import org.example.backend.board.repository.BoardRepository;
import org.example.backend.common.utils.PersonalInfoFilterUtil;
import org.example.backend.global.config.file.LocalFileUploader;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {
    private final BoardRepository boardRepository;
    private final LocalFileUploader localFileUploader;
    private static final String dirName = "image";

    @Value("${server.url}")
    private String serverUrl;

    @Transactional
    @CacheEvict(value = "boards", allEntries = true)
    public Long saveBoard(BoardReqDto boardReqDto, List<MultipartFile> multipartFileList) {
        PersonalInfoFilterUtil.validatePersonalInfo(boardReqDto.getContent());

        fileUpload(boardReqDto, multipartFileList);

        Board board = Board.of(boardReqDto);
        Board savedBoard = boardRepository.save(board);
        return savedBoard.getId();
    }

    public BoardResDto getBoard(Long boardId) {
        Board board = findBoardById(boardId);
        return BoardResDto.of(board);
    }

    @Cacheable(value = "boards", key = "{#pageable.pageNumber, #pageable.pageSize}")
    public Page<BoardResDto> getAllBoards(Pageable pageable) {
        return boardRepository.findAll(pageable)
                .map(BoardResDto::of);
    }

    public Page<BoardResDto> getBoardsByCategory(Category category, Pageable pageable) {
        return boardRepository.findAllByCategory(category, pageable)
                .map(BoardResDto::of);
    }

    @Transactional
    @CacheEvict(value = "boards", allEntries = true)
    public BoardResDto updateBoard(Long boardId, BoardReqDto boardReqDto, List<MultipartFile> multipartFileList) {
        fileUpload(boardReqDto, multipartFileList);

        Board board = findBoardById(boardId);
        board.update(boardReqDto);
        return BoardResDto.of(board);
    }

    @Transactional
    @CacheEvict(value = "boards", allEntries = true)
    public void deleteBoard(Long boardId) {
        Board board = findBoardById(boardId);
        boardRepository.delete(board);
    }

    private Board findBoardById(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardException(NOT_FOUND_BOARD));
    }

    private void fileUpload(BoardReqDto boardReqDto, List<MultipartFile> multipartFileList) {
        List<String> updateImageUrlList = new ArrayList<>();
        if (multipartFileList != null && !multipartFileList.isEmpty()) {
            for (MultipartFile multipartFile : multipartFileList) {
                if (multipartFile == null || multipartFile.isEmpty()) {
                    throw new BoardException(BoardExceptionType.REQUIRED_FILE);
                }
                String uploadImageUrl = localFileUploader.upload(multipartFile, dirName);
                updateImageUrlList.add(serverUrl + uploadImageUrl);
            }
            boardReqDto.setFileList(updateImageUrlList);
        }
    }

    @Transactional
    public String incrementViewCount(Long boardId, String postViewCookie) {
        if (postViewCookie == null || !postViewCookie.contains("[" + boardId + "]")) {
            readCount(boardId);

            if (postViewCookie == null || postViewCookie.isEmpty()) {
                return "[" + boardId + "]";
            }
            return postViewCookie + "_[" + boardId + "]";
        }

        return postViewCookie;
    }

    @Transactional
    public void readCount(Long boardId) {
        boardRepository.incrementViewCount(boardId);
    }

    public Page<BoardResDto> searchBoard(String keyword, Pageable pageable) {
        return boardRepository.searchByKeywordFulltext(keyword, pageable)
                .map(BoardResDto::of);
    }
}