CREATE TABLE IF NOT EXISTS department (
                                          department_id BIGINT PRIMARY KEY,
                                          korean_name VARCHAR(255),
                                          english_name VARCHAR(255),
                                          intro TEXT,
                                          phone VARCHAR(50),
                                          location VARCHAR(255),
                                          educational_objective TEXT,
                                          work_hour VARCHAR(50),
                                          map VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS admin (
                                     id BIGINT PRIMARY KEY,
                                     login_id VARCHAR(50),
                                     password VARCHAR(255),
                                     username VARCHAR(50),
                                     email VARCHAR(50),
                                     role VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS professor (
                                         professor_id BIGINT PRIMARY KEY,
                                         name VARCHAR(50) NOT NULL,
                                         major VARCHAR(50),
                                         phone VARCHAR(50) UNIQUE,
                                         email VARCHAR(50) UNIQUE,
                                         position VARCHAR(50),
                                         homepage VARCHAR(255),
                                         lab VARCHAR(50),
                                         profile_image VARCHAR(255), -- 누락된 필드 추가
                                         department_id BIGINT,
                                         FOREIGN KEY (department_id) REFERENCES department (department_id)
);

CREATE TABLE IF NOT EXISTS seminar (
                                       seminar_id BIGINT PRIMARY KEY,
                                       name VARCHAR(255),
                                       writer VARCHAR(50),
                                       place VARCHAR(255),
                                       start_date DATE,
                                       end_date DATE,
                                       speaker VARCHAR(50),
                                       company VARCHAR(50),
                                       department_id BIGINT,
                                       FOREIGN KEY (department_id) REFERENCES department (department_id)
);

CREATE TABLE IF NOT EXISTS thesis (
                                      thesis_id BIGINT PRIMARY KEY,
                                      author VARCHAR(50),
                                      journal VARCHAR(50),
                                      content TEXT,
                                      link VARCHAR(255),
                                      publication_date DATE,
                                      thesis_image VARCHAR(255),
                                      publication_collection VARCHAR(50),
                                      publication_issue VARCHAR(50),
                                      publication_page VARCHAR(50),
                                      issn VARCHAR(50),
                                      professor_id BIGINT,
                                      FOREIGN KEY (professor_id) REFERENCES professor (professor_id)
);

CREATE TABLE IF NOT EXISTS board (
                                     board_id BIGINT PRIMARY KEY,
                                     title VARCHAR(255),
                                     content TEXT,
                                     view_count INT,
                                     writer VARCHAR(50),
                                     file VARCHAR(255),
                                     create_date DATE,
                                     category VARCHAR(50),
                                     department_id BIGINT,
                                     FOREIGN KEY (department_id) REFERENCES department (department_id)
);