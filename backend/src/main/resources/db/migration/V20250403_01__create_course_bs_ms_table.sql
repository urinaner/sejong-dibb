DROP TABLE IF EXISTS graduate_courses;
DROP TABLE IF EXISTS undergraduate_courses;
DROP TABLE IF EXISTS course;

-- 부모 테이블: course
CREATE TABLE course (
                        course_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        course_type VARCHAR(20) NOT NULL,
                        course_number VARCHAR(20) NOT NULL,
                        course_name   VARCHAR(100) NOT NULL,
                        course_name_en VARCHAR(100),
                        credit_time    INT,
                        year           INT,
                        semester       INT,
                        created_date   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_date   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 학부 전용 테이블: undergraduate_courses (BSCourse)
CREATE TABLE bs_courses (
                                       course_id BIGINT NOT NULL,
                                       grade INT,
                                       classification VARCHAR(50),
                                       course_description TEXT,
                                       course_description_en TEXT,
                                       PRIMARY KEY (course_id),
                                       CONSTRAINT fk_undergraduate_course
                                           FOREIGN KEY (course_id) REFERENCES course(course_id)
                                               ON DELETE CASCADE
                                               ON UPDATE CASCADE
);

-- 대학원 전용 테이블: graduate_courses (MSCourse)
CREATE TABLE ms_courses (
                                  course_id BIGINT NOT NULL,
                                  target_program VARCHAR(50),
                                  PRIMARY KEY (course_id),
                                  CONSTRAINT fk_graduate_course
                                      FOREIGN KEY (course_id) REFERENCES course(course_id)
                                          ON DELETE CASCADE
                                          ON UPDATE CASCADE
);
