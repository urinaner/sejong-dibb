CREATE TABLE courses (
                         course_id BIGINT AUTO_INCREMENT PRIMARY KEY,

                         course_type ENUM('UNDERGRADUATE', 'GRADUATE') NOT NULL,

                         course_number VARCHAR(20) NOT NULL,
                         course_name VARCHAR(100) NOT NULL,
                         course_name_en VARCHAR(100),
                         credit_time VARCHAR(20),

                         academic_year_semester VARCHAR(10),
                         classification VARCHAR(50),
                         course_description TEXT,
                         course_description_en TEXT,

                         target_program VARCHAR(50),

                         created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         updated_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
