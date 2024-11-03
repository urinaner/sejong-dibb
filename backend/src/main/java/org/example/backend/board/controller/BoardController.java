package org.example.backend.board.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.board.service.BoardService;
import org.example.backend.professor.domain.dto.ResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "게시판", description = "게시판 API")
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;

    @ApiOperation(value = "게시판 생성 API", notes = "게시판 생성")
    @PostMapping
    public ResponseEntity<Long> createBoard(@RequestBody BoardReqDto boardReqDto) {
        Long boardId = boardService.saveBoard(boardReqDto);
        return new ResponseEntity<>(boardId, HttpStatus.OK);
    }

    @ApiOperation(value = "모든 게시판 조회 API", notes = "모든 게시판의 리스트 반환")
    @GetMapping
    public ResponseDto<List<BoardResDto>> getAllBoards(Pageable pageable) {
        Page<BoardResDto> boardList = boardService.getAllBoards(pageable);
        return ResponseDto.ok(boardList.getNumber(), boardList.getTotalPages(), boardList.getContent());
    }

    @ApiOperation(value = "게시판 상세 정보 반환 API", notes = "게시판 상세 정보 반환")
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardResDto> getBoard(@PathVariable(name = "boardId") Long boardId) {
        BoardResDto boardResDto = boardService.getBoard(boardId);
        return new ResponseEntity<>(boardResDto, HttpStatus.OK);
    }

    @ApiOperation(value = "게시판 정보 업데이트 API", notes = "게시판 정보 업데이트")
    @PostMapping("/{boardId}")
    public ResponseEntity<BoardResDto> updateBoard(@PathVariable(name = "boardId") Long boardId, @RequestBody BoardReqDto boardReqDto) {
        BoardResDto boardResDto = boardService.updateBoard(boardId, boardReqDto);
        return new ResponseEntity<>(boardResDto, HttpStatus.OK);
    }

    @ApiOperation(value = "게시판 삭제 API", notes = "게시판 삭제")
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable(name = "boardId") Long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
