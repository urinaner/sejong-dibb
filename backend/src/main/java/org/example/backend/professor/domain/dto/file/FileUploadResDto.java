package org.example.backend.professor.domain.dto.file;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileUploadResDto {

    String fileName;
    String url;

    public FileUploadResDto(String fileName, String url) {
        this.fileName = fileName;
        this.url = url;
    }
}
