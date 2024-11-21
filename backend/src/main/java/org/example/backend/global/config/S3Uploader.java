package org.example.backend.global.config;

import static org.example.backend.professor.exception.ProfessorExceptionType.NOT_FOUND_FILE;
import static org.example.backend.professor.exception.ProfessorExceptionType.NOT_FOUND_PROFESSOR;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.professor.domain.dto.file.FileUploadResDto;
import org.example.backend.professor.domain.entity.Professor;
import org.example.backend.professor.exception.ProfessorException;
import org.example.backend.professor.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;
    private final ProfessorRepository userRepository;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    @Transactional
    public FileUploadResDto upload(Long userId, MultipartFile multipartFile, String dirName) {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new ProfessorException(NOT_FOUND_FILE));

        return upload(userId, uploadFile, dirName);
    }

    private FileUploadResDto upload(Long userId, File uploadFile, String dirName) {
        String fileName = dirName + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile);

        Professor user = userRepository.findById(userId)
                .orElseThrow(() -> new ProfessorException(NOT_FOUND_PROFESSOR));

        user.updateProfilePhoto(uploadImageUrl);

        return FileUploadResDto.builder()
                .fileName(fileName)
                .url(uploadImageUrl)
                .build();
    }

    private String putS3(File uploadFile, String fileName) {
        log.info("S3Uploader putS3");
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile) {
        log.info("S3Uploader removeNewFile");
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) {
        if (file.isEmpty()) {
            return Optional.empty();
        }

        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("파일 전환 중 에러 발생", e);
            return Optional.empty();
        }

        return Optional.of(convertedFile);
    }
}
