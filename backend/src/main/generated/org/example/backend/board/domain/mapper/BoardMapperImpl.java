package org.example.backend.board.domain.mapper;

import javax.annotation.processing.Generated;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.board.domain.entity.Board;
import org.example.backend.board.domain.entity.Category;
import org.example.backend.department.repository.DepartmentRepository;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-14T23:04:28+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.5 (Azul Systems, Inc.)"
)
@Component
public class BoardMapperImpl implements BoardMapper {

    @Override
    public Board toEntity(BoardReqDto boardReqDto, DepartmentRepository departmentRepository) {
        if ( boardReqDto == null ) {
            return null;
        }

        Board board = new Board();

        board.setTitle( boardReqDto.getTitle() );
        board.setContent( boardReqDto.getContent() );
        board.setWriter( boardReqDto.getWriter() );
        board.setFile( boardReqDto.getFile() );
        board.setCreateDate( boardReqDto.getCreateDate() );
        if ( boardReqDto.getCategory() != null ) {
            board.setCategory( Enum.valueOf( Category.class, boardReqDto.getCategory() ) );
        }

        board.setDepartment( mapDepartment(boardReqDto.getDepartmentId(), null, departmentRepository) );

        return board;
    }

    @Override
    public BoardResDto toBoardDto(Board board) {
        if ( board == null ) {
            return null;
        }

        BoardResDto boardResDto = new BoardResDto();

        boardResDto.setId( board.getId() );
        boardResDto.setTitle( board.getTitle() );
        boardResDto.setContent( board.getContent() );
        boardResDto.setViewCount( board.getViewCount() );
        boardResDto.setWriter( board.getWriter() );
        boardResDto.setFile( board.getFile() );
        boardResDto.setCreateDate( board.getCreateDate() );
        if ( board.getCategory() != null ) {
            boardResDto.setCategory( board.getCategory().name() );
        }

        return boardResDto;
    }

    @Override
    public void updateBoardFromDto(BoardReqDto boardReqDto, Board board, DepartmentRepository departmentRepository) {
        if ( boardReqDto == null ) {
            return;
        }

        if ( boardReqDto.getTitle() != null ) {
            board.setTitle( boardReqDto.getTitle() );
        }
        if ( boardReqDto.getContent() != null ) {
            board.setContent( boardReqDto.getContent() );
        }
        if ( boardReqDto.getWriter() != null ) {
            board.setWriter( boardReqDto.getWriter() );
        }
        if ( boardReqDto.getFile() != null ) {
            board.setFile( boardReqDto.getFile() );
        }
        if ( boardReqDto.getCreateDate() != null ) {
            board.setCreateDate( boardReqDto.getCreateDate() );
        }
        if ( boardReqDto.getCategory() != null ) {
            board.setCategory( Enum.valueOf( Category.class, boardReqDto.getCategory() ) );
        }

        board.setDepartment( mapDepartment(boardReqDto.getDepartmentId(), board.getDepartment(), departmentRepository) );
    }
}
