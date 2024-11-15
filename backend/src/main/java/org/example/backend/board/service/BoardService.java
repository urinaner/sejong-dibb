package org.example.backend.board.service;

import static org.example.backend.board.exception.BoardExceptionType.NOT_FOUND_BOARD;

import lombok.RequiredArgsConstructor;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.board.domain.entity.Board;
import org.example.backend.board.domain.mapper.BoardMapper;
import org.example.backend.board.exception.BoardException;
import org.example.backend.board.exception.BoardExceptionType;
import org.example.backend.board.repository.BoardRepository;
import org.example.backend.department.repository.DepartmentRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {
    private final BoardMapper boardMapper = Mappers.getMapper(BoardMapper.class);
    private final BoardRepository boardRepository;
    private final DepartmentRepository departmentRepository;

    @Transactional
    public Long saveBoard(BoardReqDto boardReqDto) {
        validateUserRequiredFields(boardReqDto);
        Board board = boardMapper.toEntity(boardReqDto, departmentRepository);
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

        if (dto.getDepartmentId() == null) {
            throw new BoardException(BoardExceptionType.REQUIRED_DEPARTMENT_ID);
        }
    }

    public BoardResDto getBoard(Long boardId) {
        Board board = findBoardById(boardId);

        return boardMapper.toBoardDto(board);
    }

    public Page<BoardResDto> getAllBoards(Pageable pageable) {
        return boardRepository.findAll(pageable)
                .map(boardMapper::toBoardDto);
    }

    @Transactional
    public BoardResDto updateBoard(Long boardId, BoardReqDto boardReqDto) {
        Board board = findBoardById(boardId);

        boardMapper.updateBoardFromDto(boardReqDto, board, departmentRepository);

        boardRepository.save(board);
        return boardMapper.toBoardDto(board);
    }

    public void deleteBoard(Long boardId) {
        Board board = findBoardById(boardId);
        boardRepository.delete(board);
    }

    private Board findBoardById(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardException(NOT_FOUND_BOARD));
    }
}
