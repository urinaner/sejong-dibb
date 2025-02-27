CREATE TABLE IF NOT EXISTS department
(
    created_date          DATETIME,
    updated_date          DATETIME,
    department_id         BIGINT NOT NULL AUTO_INCREMENT,
    korean_name           VARCHAR(255) UNIQUE,
    english_name          VARCHAR(255) UNIQUE,
    intro                 VARCHAR(255),
    phone                 VARCHAR(255) UNIQUE,
    location              VARCHAR(255),
    educational_objective VARCHAR(255),
    work_hour             VARCHAR(255),
    map                   VARCHAR(255),
    PRIMARY KEY (department_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS users
(
    users_id   BIGINT       NOT NULL AUTO_INCREMENT,
    login_id   VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    username   VARCHAR(255),
    email      VARCHAR(255),
    phone      VARCHAR(255),
    department VARCHAR(255),
    role       VARCHAR(50)  NOT NULL,
    PRIMARY KEY (users_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


CREATE TABLE professor
(
    professor_id  BIGINT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    major         VARCHAR(255),
    phone         VARCHAR(255) UNIQUE,
    email         VARCHAR(255) UNIQUE,
    position      VARCHAR(255),
    bachelor      VARCHAR(255),
    master        VARCHAR(255),
    doctor        VARCHAR(255),
    homepage      VARCHAR(255),
    lab           VARCHAR(255),
    profile_image VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS news
(
    created_date DATETIME,
    updated_date DATETIME,
    news_id      BIGINT NOT NULL AUTO_INCREMENT,
    title        VARCHAR(255),
    content      TEXT,
    view         INT DEFAULT 0,
    link         VARCHAR(255),
    image        VARCHAR(1000),
    PRIMARY KEY (news_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS board
(
    created_date DATETIME,
    updated_date DATETIME,
    board_id     BIGINT NOT NULL AUTO_INCREMENT,
    title        VARCHAR(255),
    content      VARCHAR(5000),
    view_count   INT DEFAULT 0,
    writer       VARCHAR(255),
    file_list    VARCHAR(1000),
    category     VARCHAR(50),
    PRIMARY KEY (board_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS thesis
(
    thesis_id              BIGINT NOT NULL AUTO_INCREMENT,
    title                  VARCHAR(255),
    author                 VARCHAR(255),
    journal                VARCHAR(255),
    content                TEXT,
    link                   VARCHAR(255),
    publication_date       VARCHAR(255),
    thesis_image           VARCHAR(1000),
    publication_collection VARCHAR(255),
    publication_issue      VARCHAR(255),
    publication_page       VARCHAR(255),
    issn                   VARCHAR(255),
    professor_id           BIGINT,
    PRIMARY KEY (thesis_id),
    FOREIGN KEY (professor_id) REFERENCES professor (professor_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


CREATE TABLE IF NOT EXISTS seminar
(
    seminar_id BIGINT NOT NULL AUTO_INCREMENT,
    name       VARCHAR(255),
    writer     VARCHAR(255),
    place      VARCHAR(255),
    start_time DATETIME,
    end_time   DATETIME,
    speaker    VARCHAR(255),
    company    VARCHAR(255),
    PRIMARY KEY (seminar_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS room
(
    room_id         BIGINT NOT NULL AUTO_INCREMENT,
    name            VARCHAR(255),
    person_capacity INT,
    place           VARCHAR(255),
    image           VARCHAR(255),
    PRIMARY KEY (room_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS reservation
(
    created_date   DATETIME,
    updated_date   DATETIME,
    reservation_id BIGINT NOT NULL AUTO_INCREMENT,
    start_time     DATETIME,
    end_time       DATETIME,
    purpose        VARCHAR(50),
    etc            VARCHAR(255),
    room_id        BIGINT,
    login_id       VARCHAR(255),
    PRIMARY KEY (reservation_id),
    FOREIGN KEY (room_id) REFERENCES room (room_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS jwt_blacklist
(
    jwt_blacklist_id BIGINT       NOT NULL AUTO_INCREMENT,
    token            VARCHAR(255) NOT NULL UNIQUE,
    expired_time     DATETIME     NOT NULL,
    PRIMARY KEY (jwt_blacklist_id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS request_response_log
(
    id              BIGINT NOT NULL AUTO_INCREMENT,
    method          VARCHAR(255),
    path            VARCHAR(255),
    request_body    VARCHAR(255),
    response_status VARCHAR(255),
    response_body   VARCHAR(10000),
    created_at      DATETIME,
    client_ip       VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

ALTER TABLE news
    ADD FULLTEXT INDEX ft_news_title_content (title, content)
        WITH PARSER ngram;

ALTER TABLE board
    ADD FULLTEXT INDEX ft_board_title_content (title, content)
        WITH PARSER ngram;

ALTER TABLE seminar
    ADD FULLTEXT INDEX ft_seminar_name_speaker_company_place (name, speaker, company, place)
        WITH PARSER ngram;

ALTER TABLE thesis
    ADD FULLTEXT INDEX ft_index_title_author_journal_content (title, author, journal, content)
        WITH PARSER ngram;

-- users 더미 데이터
INSERT INTO users (users_id, login_id, password, username, email, phone, role)
VALUES (1, 'admin', '$2a$10$FKHTTHcEkAZZGW9XqGtPfOx.apKljbCLvYESM05YbLWzDynnacLPO', '관리자', 'admin@example.com',
        '010-1234-5678', 'ROLE_ADMIN');

-- 세미나실 더미데이터
INSERT INTO room (room_id, name, person_capacity, place, image)
VALUES (1, '충507C 세미나실', 20, '충무관 507', 'seminar1.jpg'),
       (2, '충506C 세미나실', 20, '충무관 506', 'seminar2.jpg');