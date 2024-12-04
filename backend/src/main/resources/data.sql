DELETE
FROM board;
DELETE
FROM thesis;
DELETE
FROM room;
DELETE
FROM reservation;
DELETE
FROM seminar;
DELETE
FROM professor;
DELETE
FROM department;
DELETE
FROM admin;
DELETE
FROM users;


-- Department 더미 데이터 (1개)
INSERT INTO department (korean_name, english_name, intro, phone, location, educational_objective, work_hour, map)
VALUES ('컴퓨터공학과', 'Computer Engineering', '컴퓨터공학과 소개', '010-1234-5678', '본관 101호', '컴퓨터 공학 인재 양성', '9:00 - 18:00',
        'https://example.com/map');

-- Admin 더미 데이터 (1개)
INSERT INTO admin (login_id, password, username, email, role)
VALUES ('admin', '$2a$10$FKHTTHcEkAZZGW9XqGtPfOx.apKljbCLvYESM05YbLWzDynnacLPO', '관리자', 'admin@example.com', 'ADMIN');

-- Professor 더미 데이터 (10개)
INSERT INTO professor (name, major, phone, email, position, homepage, lab, profile_image)
VALUES ('교수1', 'AI', '010-1111-1111', 'prof1@example.com', '교수', 'https://prof1-homepage.com', 'AI 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2024-11-21-17-36-18+008.png'),
       ('교수2', 'Machine Learning', '010-2222-2222', 'prof2@example.com', '교수', 'https://prof2-homepage.com', 'ML 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2024-11-21-17-36-18+007.png'),
       ('교수3', 'Computer Vision', '010-3333-3333', 'prof3@example.com', '교수', 'https://prof3-homepage.com', 'CV 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2024-11-21-17-36-18+006.png'),
       ('교수4', 'NLP', '010-4444-4444', 'prof4@example.com', '교수', 'https://prof4-homepage.com', 'NLP 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2024-11-21-17-36-18+005.png'),
       ('교수5', 'Data Science', '010-5555-5555', 'prof5@example.com', '교수', 'https://prof5-homepage.com', 'DS 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2024-11-21-17-36-18+004.png'),
       ('교수6', 'Software Engineering', '010-6666-6666', 'prof6@example.com', '교수', 'https://prof6-homepage.com',
        'SE 연구실', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2024-11-21-17-36-18+003.png'),
       ('교수7', 'Cyber Security', '010-7777-7777', 'prof7@example.com', '교수', 'https://prof7-homepage.com', 'CS 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2024-11-21-17-36-17+002.png'),
       ('교수8', 'Blockchain', '010-8888-8888', 'prof8@example.com', '교수', 'https://prof8-homepage.com', 'Blockchain 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_Photo_2024-11-21-17-36-17+001.png'),
       ('교수9', 'Cloud Computing', '010-9999-9999', 'prof9@example.com', '교수', 'https://prof9-homepage.com', 'Cloud 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dibb.png'),
       ('교수10', 'Computer Graphics', '010-1010-1010', 'prof10@example.com', '교수', 'https://prof10-homepage.com',
        'CG 연구실',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/profile/(1116)%E1%84%83%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%82%E1%85%A1%E1%84%86%E1%85%B5%E1%86%A8%E1%84%83%E1%85%B2%E1%84%8B%E1%85%A9+%E1%84%83%E1%85%A1%E1%86%AB%E1%84%8E%E1%85%A6%E1%84%8F%E1%85%A5%E1%86%BA(1).jpg');

-- Seminar 더미 데이터 (10개)
INSERT INTO seminar (name, writer, place, start_date, end_date, speaker, company)
VALUES ('세미나1', '작성자1', '세미나룸 A', '2024-01-01', '2024-01-02', '연사1', '기업1'),
       ('세미나2', '작성자2', '세미나룸 B', '2024-01-10', '2024-01-11', '연사2', '기업2'),
       ('세미나3', '작성자3', '세미나룸 C', '2024-02-01', '2024-02-02', '연사3', '기업3'),
       ('세미나4', '작성자4', '세미나룸 D', '2024-03-01', '2024-03-02', '연사4', '기업4'),
       ('세미나5', '작성자5', '세미나룸 E', '2024-04-01', '2024-04-02', '연사5', '기업5'),
       ('세미나6', '작성자6', '세미나룸 F', '2024-05-01', '2024-05-02', '연사6', '기업6'),
       ('세미나7', '작성자7', '세미나룸 G', '2024-06-01', '2024-06-02', '연사7', '기업7'),
       ('세미나8', '작성자8', '세미나룸 H', '2024-07-01', '2024-07-02', '연사8', '기업8'),
       ('세미나9', '작성자9', '세미나룸 I', '2024-08-01', '2024-08-02', '연사9', '기업9'),
       ('세미나10', '작성자10', '세미나룸 J', '2024-09-01', '2024-09-02', '연사10', '기업10');

-- Thesis 더미 데이터 (10개)
INSERT INTO thesis (author, journal, content, link, publication_date, thesis_image, publication_collection,
                    publication_issue, publication_page, issn, professor_id)
VALUES ('저자1', 'Journal A', '논문 내용 1', 'https://example.com/thesis1', '2024-01-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_540224b.jpg', 'Volume 1', 'Issue 1', 'Page 1',
        '1234-5678', 1),
       ('저자2', 'Journal B', '논문 내용 2', 'https://example.com/thesis2', '2024-02-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_587943b.jpg', 'Volume 2', 'Issue 2', 'Page 2',
        '2345-6789', 2),
       ('저자3', 'Journal C', '논문 내용 3', 'https://example.com/thesis3', '2024-03-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_590742b.jpg', 'Volume 3', 'Issue 3', 'Page 3',
        '3456-7890', 3),
       ('저자4', 'Journal D', '논문 내용 4', 'https://example.com/thesis4', '2024-04-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_590742b.jpg', 'Volume 4', 'Issue 4', 'Page 4',
        '4567-8901', 4),
       ('저자5', 'Journal E', '논문 내용 5', 'https://example.com/thesis5', '2024-05-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_590852b.jpg', 'Volume 5', 'Issue 5', 'Page 5',
        '5678-9012', 5),
       ('저자6', 'Journal F', '논문 내용 6', 'https://example.com/thesis6', '2024-06-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_593743b.jpg', 'Volume 6', 'Issue 6', 'Page 6',
        '6789-0123', 6),
       ('저자7', 'Journal G', '논문 내용 7', 'https://example.com/thesis7', '2024-07-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_593743b.jpg', 'Volume 7', 'Issue 7', 'Page 7',
        '7890-1234', 7),
       ('저자8', 'Journal H', '논문 내용 8', 'https://example.com/thesis8', '2024-08-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_596862b.jpg', 'Volume 8', 'Issue 8', 'Page 8',
        '8901-2345', 8),
       ('저자9', 'Journal I', '논문 내용 9', 'https://example.com/thesis9', '2024-09-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_598360b.jpg', 'Volume 9', 'Issue 9', 'Page 9',
        '9012-3456', 9),
       ('저자10', 'Journal J', '논문 내용 10', 'https://example.com/thesis10', '2024-10-01',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/is_598598b.jpg', 'Volume 10', 'Issue 10', 'Page 10',
        '0123-4567', 10);


-- Board 더미 데이터 (10개)
INSERT INTO board (title, content, view_count, writer, file_list, category)
VALUES ('첫 번째 게시글', '게시글 내용 1', 10, '작성자1',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_01%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_01%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'undergraduate'),
       ('두 번째 게시글', '게시글 내용 2', 20, '작성자2',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_01%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_02%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'graduate'),
       ('세 번째 게시글', '게시글 내용 3', 30, '작성자3',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_02%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_02%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'employment'),
       ('네 번째 게시글', '게시글 내용 4', 40, '작성자4',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'scholarship'),
       ('다섯 번째 게시글', '게시글 내용 5', 50, '작성자5',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'undergraduate'),
       ('여섯 번째 게시글', '게시글 내용 6', 60, '작성자6',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'graduate'),
       ('일곱 번째 게시글', '게시글 내용 7', 70, '작성자7',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'employment'),
       ('여덟 번째 게시글', '게시글 내용 8', 80, '작성자8',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'scholarship'),
       ('아홉 번째 게시글', '게시글 내용 9', 90, '작성자9',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'undergraduate'),
       ('열 번째 게시글', '게시글 내용 10', 100, '작성자10',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_07%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_07%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'graduate');


-- 세미나실 더미데이터
INSERT INTO room (name, person_capacity, place, image)
VALUES ('제1세미나실', 20, '본관 3층', 'seminar1.jpg'),
       ('제2세미나실', 15, '본관 3층', 'seminar2.jpg'),
       ('제3세미나실', 30, '본관 4층', 'seminar3.jpg'),
       ('스터디룸A', 8, '별관 2층', 'studyA.jpg'),
       ('스터디룸B', 8, '별관 2층', 'studyB.jpg'),
       ('대회의실', 50, '본관 5층', 'conference.jpg'),
       ('소회의실', 12, '본관 5층', 'meeting.jpg'),
       ('프로젝트룸1', 10, '별관 3층', 'project1.jpg'),
       ('프로젝트룸2', 10, '별관 3층', 'project2.jpg'),
       ('강의실A', 40, '본관 2층', 'lectureA.jpg');


-- User 더미 데이터 (10개)
INSERT INTO users (student_id, name, major, phone, role)
VALUES ('20180001', '사용자1', '컴퓨터공학과', '010-1111-1111', 'USER'),
       ('20180002', '사용자2', '컴퓨터공학과', '010-2222-2222', 'USER'),
       ('20180003', '사용자3', '컴퓨터공학과', '010-3333-3333', 'USER'),
       ('20180004', '사용자4', '컴퓨터공학과', '010-4444-4444', 'USER'),
       ('20180005', '사용자5', '컴퓨터공학과', '010-5555-5555', 'USER'),
       ('20180006', '사용자6', '컴퓨터공학과', '010-6666-6666', 'USER'),
       ('20180007', '사용자7', '컴퓨터공학과', '010-7777-7777', 'USER'),
       ('20180008', '사용자8', '컴퓨터공학과', '010-8888-8888', 'USER'),
       ('20180009', '사용자9', '컴퓨터공학과', '010-9999-9999', 'USER'),
       ('20180010', '사용자10', '컴퓨터공학과', '010-1010-1010', 'USER');



INSERT INTO users (name, major, phone, role)
VALUES ('장영재', '컴퓨터공학과', '010-2111-1111', 'USER'),
       ('이진', '원자력공학과', '010-3222-2222', 'USER'),
       ('박지민', '정보통신공학과', '010-4333-3333', 'USER'),
       ('최동훈', '컴퓨터공학과', '010-5444-4444', 'USER'),
       ('정미경', '소프트웨어학과', '010-6555-5555', 'USER');



INSERT INTO reservation (start_time, end_time, purpose, etc, repetition_type, room_id, user_id, created_at,
                         updated_at)
VALUES ('2024-11-01 09:00:00', '2024-11-01 11:00:00', 'CLASS', '프로그래밍 기초 수업', 'DAILY', 1, 1, NOW(), NOW()),
       ('2024-12-01 13:00:00', '2024-12-01 15:00:00', 'MEETING', '팀 프로젝트 미팅', 'WEEKLY', 1, 2, NOW(), NOW()),
       ('2024-12-02 10:00:00', '2024-12-02 12:00:00', 'SEMINAR', '신기술 세미나', 'DAILY', 1, 1, NOW(), NOW()),
       ('2024-12-03 14:00:00', '2024-12-03 16:00:00', 'CLASS', '알고리즘 수업', 'WEEKLY', 1, 3, NOW(), NOW()),
       ('2024-12-04 09:30:00', '2024-12-04 11:30:00', 'MEETING', '논문 리뷰 미팅', 'DAILY', 1, 2, NOW(), NOW()),
       ('2024-12-05 15:00:00', '2024-12-05 17:00:00', 'SEMINAR', '취업 특강', 'DAILY', 1, 3, NOW(), NOW()),
       ('2024-12-06 10:30:00', '2024-12-06 12:30:00', 'CLASS', '데이터베이스 수업', 'WEEKLY', 1, 1, NOW(), NOW()),
       ('2024-12-07 13:30:00', '2024-12-07 15:30:00', 'MEETING', '스터디 그룹 미팅', 'WEEKLY', 1, 2, NOW(), NOW()),
       ('2024-12-08 11:00:00', '2024-12-08 13:00:00', 'SEMINAR', '창업 세미나', 'DAILY', 1, 1, NOW(), NOW()),
       ('2024-12-09 16:00:00', '2024-12-09 18:00:00', 'CLASS', '웹 개발 수업', 'DAILY', 1, 3, NOW(), NOW());