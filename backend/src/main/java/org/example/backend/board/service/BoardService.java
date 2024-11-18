package org.example.backend.board.service;

import static org.example.backend.board.exception.BoardExceptionType.NOT_FOUND_BOARD;

import lombok.RequiredArgsConstructor;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.board.domain.entity.Board;
import org.example.backend.board.domain.entity.Category;
import org.example.backend.board.exception.BoardException;
import org.example.backend.board.exception.BoardExceptionType;
import org.example.backend.board.repository.BoardRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional
    public Long saveBoard(BoardReqDto boardReqDto) {
        validateUserRequiredFields(boardReqDto);
        Board board = Board.of(boardReqDto);
        Board savedBoard = boardRepository.save(board);
        return savedBoard.getId();
    }

    private void validateUserRequiredFields(BoardReqDto dto) {
        if (dto.getTitle() == null || dto.getTitle().isEmpty()) {
            throw new BoardException(BoardExceptionType.REQUIRED_TITLE);
        }
        if (dto.getContent() == null || dto.getContent().isEmpty()) {
            throw new BoardException(BoardExceptionType.REQUIRED_CONTENT);
        }
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
    public BoardResDto updateBoard(Long boardId, BoardReqDto boardReqDto) {
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
}