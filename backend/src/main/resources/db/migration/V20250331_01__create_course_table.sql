CREATE TABLE courses (
                         course_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         academic_year_semester VARCHAR(10) NOT NULL,
                         classification VARCHAR(50),
                         course_number VARCHAR(20) NOT NULL,
                         course_name VARCHAR(100) NOT NULL,
                         course_name_en VARCHAR(100),
                         credit_time VARCHAR(20),

                         created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         updated_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);