DROP TABLE IF EXISTS courses;
-- 1) 부모 테이블: course
CREATE TABLE course (
                        course_id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- Discriminator 컬럼(문자열로 처리)
                        course_type VARCHAR(20) NOT NULL,

                        course_number VARCHAR(20) NOT NULL,
                        course_name   VARCHAR(100) NOT NULL,
                        course_name_en VARCHAR(100),
                        credit_time    VARCHAR(20),

    -- BaseEntity 공통 필드
                        created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2) 학부 전용 테이블: undergraduate_courses
CREATE TABLE undergraduate_courses (
    -- course와 1:1 매핑 → PK & FK
                                       course_id BIGINT NOT NULL,

                                       academic_year_semester VARCHAR(10),
                                       classification         VARCHAR(50),
                                       course_description     TEXT,
                                       course_description_en  TEXT,

                                       PRIMARY KEY (course_id),
                                       CONSTRAINT fk_undergraduate_course
                                           FOREIGN KEY (course_id) REFERENCES course (course_id)
                                               ON DELETE CASCADE
                                               ON UPDATE CASCADE
);

-- 3) 대학원 전용 테이블: graduate_courses
CREATE TABLE graduate_courses (
                                  course_id     BIGINT NOT NULL,
                                  target_program VARCHAR(50),

                                  PRIMARY KEY (course_id),
                                  CONSTRAINT fk_graduate_course
                                      FOREIGN KEY (course_id) REFERENCES course (course_id)
                                          ON DELETE CASCADE
                                          ON UPDATE CASCADE
);