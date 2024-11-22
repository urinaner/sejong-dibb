package org.example.backend.board.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.board.domain.entity.Category;
import org.example.backend.board.service.BoardService;
import org.example.backend.common.exception.dto.ResponseDto;
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

@RestController
@RequiredArgsConstructor
@Tag(name = "게시판", description = "게시판 API")
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;

    @Operation(summary = "게시판 생성 API", description = "게시판 생성입니다.")
    @PostMapping
    public ResponseEntity<Long> createBoard(@RequestBody BoardReqDto boardReqDto) {
        Long boardId = boardService.saveBoard(boardReqDto);
        return new ResponseEntity<>(boardId, HttpStatus.OK);
    }

    @Operation(summary = "모든 게시판 조회 API", description = "모든 게시판의 리스트 반환")
    @GetMapping
    public ResponseDto<List<BoardResDto>> getAllBoards(Pageable pageable) {
        Page<BoardResDto> boardList = boardService.getAllBoards(pageable);
        return ResponseDto.ok(boardList.getNumber(), boardList.getTotalPages(), boardList.getContent());
    }
    @Operation(summary = "카테고리별 게시판 조회 API", description = "카테고리별 게시판 리스트 반환")
    @GetMapping("/category/{category}")
    public ResponseDto<List<BoardResDto>> getBoardsByCategory(
            @PathVariable("category") Category category,
            Pageable pageable) {
        Page<BoardResDto> boardList = boardService.getBoardsByCategory(category, pageable);
        return ResponseDto.ok(boardList.getNumber(), boardList.getTotalPages(), boardList.getContent());
    }

    @Operation(summary = "게시판 상세 정보 반환 API", description = "게시판 상세 정보 반환")
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardResDto> getBoard(@PathVariable(name = "boardId") Long boardId) {
        BoardResDto boardResDto = boardService.getBoard(boardId);
        return new ResponseEntity<>(boardResDto, HttpStatus.OK);
    }

    @Operation(summary = "게시판 정보 업데이트 API", description = "게시판 정보 업데이트")
    @PostMapping("/{boardId}")
    public ResponseEntity<BoardResDto> updateBoard(@PathVariable(name = "boardId") Long boardId,
                                                   @RequestBody BoardReqDto boardReqDto) {
        BoardResDto boardResDto = boardService.updateBoard(boardId, boardReqDto);
        return new ResponseEntity<>(boardResDto, HttpStatus.OK);
    }

    @Operation(summary = "게시판 삭제 API", description = "게시판 삭제")
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable(name = "boardId") Long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
