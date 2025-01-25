package org.example.backend.board.service;

import static org.example.backend.board.exception.BoardExceptionType.NOT_FOUND_BOARD;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
import org.example.backend.global.config.file.LocalFileUploader;
import org.springframework.beans.factory.annotation.Value;
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
    public Long saveBoard(BoardReqDto boardReqDto, List<MultipartFile> multipartFileList) {
        fileUpload(boardReqDto, multipartFileList);

        Board board = Board.of(boardReqDto);
        Board savedBoard = boardRepository.save(board);
        return savedBoard.getId();
    }
    public BoardResDto getBoard(Long boardId) {
        Board board = findBoardById(boardId);
        return BoardResDto.of(board);
    }

    public Page<BoardResDto> getAllBoards(Pageable pageable) {
        return boardRepository.findAll(pageable)
                .map(BoardResDto::of);
    }

    public Page<BoardResDto> getBoardsByCategory(Category category, Pageable pageable) {
        return boardRepository.findAllByCategory(category, pageable)
                .map(BoardResDto::of);
    }

    @Transactional
    public BoardResDto updateBoard(Long boardId, BoardReqDto boardReqDto, List<MultipartFile> multipartFileList) {
        fileUpload(boardReqDto, multipartFileList);

        Board board = findBoardById(boardId);
        board.update(boardReqDto);
        return BoardResDto.of(board);
    }

    @Transactional
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
    public void incrementViewCount(Long boardId, HttpServletRequest request, HttpServletResponse response) {
        Cookie oldCookie = null;
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("postView")) {
                    oldCookie = cookie;
                    break;
                }
            }
        }

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + boardId + "]")) {
                readCount(boardId);
                oldCookie.setValue(oldCookie.getValue() + "_[" + boardId + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                response.addCookie(oldCookie);
            }
        } else {
            readCount(boardId);
            Cookie newCookie = new Cookie("postView", "[" + boardId + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            response.addCookie(newCookie);
        }
    }

    @Transactional
    public void readCount(Long boardId) {
        boardRepository.incrementViewCount(boardId);
    }
}