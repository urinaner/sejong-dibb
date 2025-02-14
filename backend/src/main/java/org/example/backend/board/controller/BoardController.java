package org.example.backend.board.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.board.domain.dto.BoardReqDto;
import org.example.backend.board.domain.dto.BoardResDto;
import org.example.backend.board.domain.entity.Category;
import org.example.backend.board.service.BoardService;
import org.example.backend.common.dto.PageRequestDto;
import org.example.backend.common.dto.ResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "게시판", description = "게시판 API")
@RequestMapping("/api/board")
public class BoardController {
    private final BoardService boardService;

    @Operation(summary = "게시판 생성 API 입니다.", description = "게시판 생성입니다.")
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Long> createBoard(@RequestPart(value = "boardReqDto") @Valid BoardReqDto boardReqDto,
                                            @RequestPart(value = "boardFiles", required = false) List<MultipartFile> multipartFileList) {
        Long boardId = boardService.saveBoard(boardReqDto, multipartFileList);
        return new ResponseEntity<>(boardId, HttpStatus.OK);
    }

    @Operation(summary = "모든 게시판 조회 API", description = "모든 게시판의 리스트 반환")
    @GetMapping
    public ResponseDto<List<BoardResDto>> getAllBoards(@ModelAttribute @Valid PageRequestDto pageRequest) {

        Page<BoardResDto> boardList = boardService.getAllBoards(pageRequest.toPageable());
        return ResponseDto.ok(boardList.getNumber(), boardList.getTotalPages(), boardList.getContent());
    }
    @Operation(summary = "카테고리별 게시판 조회 API", description = "카테고리별 게시판 리스트 반환")
    @GetMapping("/category/{category}")
    public ResponseDto<List<BoardResDto>> getBoardsByCategory(@PathVariable("category") Category category,
                                                              @ModelAttribute @Valid PageRequestDto pageRequest) {

        Page<BoardResDto> boardList = boardService.getBoardsByCategory(category, pageRequest.toPageable());
        return ResponseDto.ok(boardList.getNumber(), boardList.getTotalPages(), boardList.getContent());
    }

    @Operation(summary = "게시판 상세 정보 반환 API", description = "게시판 상세 정보 반환")
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardResDto> getBoard(
            @PathVariable(name = "boardId") Long boardId,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        boardService.incrementViewCount(boardId, request, response);
        BoardResDto boardResDto = boardService.getBoard(boardId);
        return new ResponseEntity<>(boardResDto, HttpStatus.OK);
    }

    @Operation(summary = "게시판 정보 업데이트 API", description = "게시판 정보 업데이트")
    @PostMapping("/{boardId}")
    public ResponseEntity<BoardResDto> updateBoard(@PathVariable(name = "boardId") Long boardId,
                                                   @RequestPart(value = "boardReqDto") BoardReqDto boardReqDto,
                                                   @RequestPart(value = "boardFiles", required = false) List<MultipartFile> multipartFileList) {
        BoardResDto boardResDto = boardService.updateBoard(boardId, boardReqDto, multipartFileList);
        return new ResponseEntity<>(boardResDto, HttpStatus.OK);
    }

    @Operation(summary = "게시판 삭제 API", description = "게시판 삭제")
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable(name = "boardId") Long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
