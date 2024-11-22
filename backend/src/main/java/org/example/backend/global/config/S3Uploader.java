package org.example.backend.global.config;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
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
import java.util.Objects;
import java.util.Optional;

import static org.example.backend.professor.exception.ProfessorExceptionType.NOT_FOUND_FILE;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {

    private static final String FILE_DELETE_SUCCESS = "파일이 삭제되었습니다.";
    private static final String FILE_DELETE_FAILURE = "파일 삭제에 실패했습니다.";
    private static final String FILE_CONVERSION_ERROR = "파일 변환 중 에러가 발생했습니다.";

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public String upload(MultipartFile multipartFile, String dirName) {
        File convertedFile = convertToFile(multipartFile)
                .orElseThrow(() -> new ProfessorException(NOT_FOUND_FILE));

        String fileName = generateFileName(dirName, convertedFile.getName());
        String uploadUrl = uploadToS3(convertedFile, fileName);

        deleteLocalFile(convertedFile);
        return uploadUrl;
    }

    private String generateFileName(String dirName, String originalFileName) {
        return String.format("%s/%s", dirName, originalFileName);
    }

    private String uploadToS3(File file, String fileName) {
        log.info("S3Uploader: 파일을 S3에 업로드 중 - 파일 이름: {}", fileName);
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, file));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void deleteLocalFile(File file) {
        if (file.delete()) {
            log.info(FILE_DELETE_SUCCESS);
        } else {
            log.warn(FILE_DELETE_FAILURE);
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