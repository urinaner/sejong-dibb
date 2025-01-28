package org.example.backend.global.config.aws;

import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.professor.exception.ProfessorException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.Optional;

import static org.example.backend.professor.exception.ProfessorExceptionType.NOT_FOUND_FILE;

@Slf4j
@Component
@RequiredArgsConstructor
public class LocalFileUploader {

    private static final String FILE_SAVE_SUCCESS = "파일이 로컬에 저장되었습니다.";
    private static final String FILE_SAVE_FAILURE = "파일 저장에 실패했습니다.";
    private static final String FILE_CONVERSION_ERROR = "파일 변환 중 에러가 발생했습니다.";

    @Value("${local.file.storage.path}")
    private String storagePath;

    @Transactional
    public String upload(MultipartFile multipartFile, String dirName) {
        File convertedFile = convertToFile(multipartFile)
                .orElseThrow(() -> new ProfessorException(NOT_FOUND_FILE));

        String fileName = generateFileName(dirName, convertedFile.getName());
        String savedFilePath = saveToLocal(convertedFile, fileName);

        deleteLocalFile(convertedFile); // 임시 파일 삭제
        return savedFilePath;
    }

    private String generateFileName(String dirName, String originalFileName) {
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uuid = UUID.randomUUID().toString();
        return String.format("%s/%s_%s%s", dirName, originalFileName, uuid, fileExtension);
    }
    private String saveToLocal(File file, String fileName) {
        Path dirPath = Paths.get(storagePath, fileName).getParent();
        try {
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }
            Path targetPath = Paths.get(storagePath, fileName);
            Files.copy(file.toPath(), targetPath);
            log.info("파일 저장 성공: {}", targetPath);

            // URL 생성
            return "/uploads/" + fileName;
        } catch (IOException e) {
            log.error("파일 저장 실패: {}", fileName, e);
            throw new RuntimeException("파일 저장 실패", e);
        }
    }

    private void deleteLocalFile(File file) {
        if (file.delete()) {
            log.info("임시 파일이 삭제되었습니다.");
        } else {
            log.warn("임시 파일 삭제에 실패했습니다.");
        }
    }

    private Optional<File> convertToFile(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            log.warn("빈 파일입니다.");
            return Optional.empty();
        }

        String originalFileName = Objects.requireNonNull(multipartFile.getOriginalFilename());
        File file = new File(originalFileName);

        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
            return Optional.of(file);
        } catch (IOException e) {
            log.error(FILE_CONVERSION_ERROR, e);
            return Optional.empty();
        }
    }
}