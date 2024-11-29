DELETE
FROM board;
DELETE
FROM thesis;
DELETE
FROM timetable;
DELETE
FROM seminar_room;
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
INSERT INTO seminar_room (name, person_capacity, place, image)
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

-- Timetable 더미데이터
INSERT INTO timetable (start_date, end_date, start_time, end_time, seminar_room_id)
VALUES ('2024-03-04', '2024-06-21', '09:00:00', '10:30:00', 1),
       ('2024-03-04', '2024-06-21', '11:00:00', '12:30:00', 1),
       ('2024-03-04', '2024-06-21', '13:00:00', '14:30:00', 1),
       ('2024-03-11', '2024-06-14', '15:00:00', '17:00:00', 1),
       ('2024-03-11', '2024-06-14', '18:00:00', '20:00:00', 1),
       ('2024-03-04', '2024-06-21', '10:00:00', '11:30:00', 1),
       ('2024-03-04', '2024-06-21', '14:00:00', '15:30:00', 1),
       ('2024-03-11', '2024-06-14', '16:00:00', '18:00:00', 1),
       ('2024-03-11', '2024-06-14', '13:00:00', '15:00:00', 1),
       ('2024-03-04', '2024-06-21', '09:30:00', '11:00:00', 1);

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

-- Timetable WeekDays 더미데이터
INSERT INTO timetable_week_days (timetable_timetable_id, week_days)
VALUES
-- 1번 시간표 (월수금)
(1, 'MONDAY'),
(1, 'WEDNESDAY'),
(1, 'FRIDAY'),

-- 2번 시간표 (화목)
(2, 'TUESDAY'),
(2, 'THURSDAY'),

-- 3번 시간표 (월수)
(3, 'MONDAY'),
(3, 'WEDNESDAY'),

-- 4번 시간표 (목금)
(4, 'THURSDAY'),
(4, 'FRIDAY'),

-- 5번 시간표 (월수)
(5, 'MONDAY'),
(5, 'WEDNESDAY'),

-- 6번 시간표 (화)
(6, 'TUESDAY'),

-- 7번 시간표 (수)
(7, 'WEDNESDAY'),

-- 8번 시간표 (월목)
(8, 'MONDAY'),
(8, 'THURSDAY'),

-- 9번 시간표 (화금)
(9, 'TUESDAY'),
(9, 'FRIDAY'),

-- 10번 시간표 (월수금)
(10, 'MONDAY'),
(10, 'WEDNESDAY'),
(10, 'FRIDAY');



INSERT INTO users (name, major, phone, role)
VALUES ('장영재', '컴퓨터공학과', '010-2111-1111', 'USER'),
       ('이진', '원자력공학과', '010-3222-2222', 'USER'),
       ('박지민', '정보통신공학과', '010-4333-3333', 'USER'),
       ('최동훈', '컴퓨터공학과', '010-5444-4444', 'USER'),
       ('정미경', '소프트웨어학과', '010-6555-5555', 'USER');

-- 예약 더미 데이터 (승인된 예약 7개, 거절된 예약 3개)
INSERT INTO reservation (start_time,
                         end_time,
                         purpose,
                         etc,
                         repetition_type,
                         status,
                         seminar_room_id,
                         user_id,
                         created_at,
                         updated_at)
VALUES
-- 1. 승인된 세미나 예약
('2024-03-25 10:00:00', -- 월요일 오전
 '2024-03-25 12:00:00',
 'SEMINAR',
 '졸업프로젝트 중간발표',
 'DAILY',
 'APPROVED',
 1, -- 제1세미나실
 1, -- 장영재 (컴퓨터공학과)
 NOW(),
 NOW()),

-- 2. 승인된 회의 예약
('2024-03-26 14:00:00', -- 화요일 오후
 '2024-03-26 16:00:00',
 'MEETING',
 '소프트웨어학과 학생회 회의',
 'DAILY',
 'APPROVED',
 2, -- 제2세미나실
 2, -- 이진 (소프트웨어학과)
 NOW(),
 NOW()),

-- 3. 승인된 스터디 예약
('2024-03-27 09:00:00', -- 수요일 오전
 '2024-03-27 11:00:00',
 'STUDY',
 '정보통신 네트워크 스터디',
 'DAILY',
 'APPROVED',
 4, -- 스터디룸A
 3, -- 박지민 (정보통신공학과)
 NOW(),
 NOW()),

-- 4. 거절된 예약 (시간 중복)
('2024-03-27 09:00:00', -- 수요일 오전 (위의 예약과 중복)
 '2024-03-27 11:00:00',
 'MEETING',
 '컴퓨터공학과 조별모임',
 'DAILY',
 'REJECTED',
 4, -- 스터디룸A
 4, -- 최동훈 (컴퓨터공학과)
 NOW(),
 NOW()),

-- 5. 승인된 회의 예약
('2024-03-28 13:00:00', -- 목요일 오후
 '2024-03-28 15:00:00',
 'MEETING',
 '소프트웨어학과 멘토링',
 'DAILY',
 'APPROVED',
 5, -- 스터디룸B
 5, -- 정미경 (소프트웨어학과)
 NOW(),
 NOW()),

-- 6. 승인된 수업 예약
('2024-03-28 10:00:00', -- 목요일 오전
 '2024-03-28 12:00:00',
 'CLASS',
 '컴퓨터공학 특별세미나',
 'DAILY',
 'APPROVED',
 6, -- 대회의실
 1, -- 김철수 (컴퓨터공학과)
 NOW(),
 NOW()),

-- 7. 거절된 예약 (운영 시간 외)
('2024-03-29 08:00:00', -- 금요일 이른 아침
 '2024-03-29 10:00:00',
 'STUDY',
 '소프트웨어 프로젝트 미팅',
 'DAILY',
 'REJECTED',
 7, -- 소회의실
 2, -- 이영희 (소프트웨어학과)
 NOW(),
 NOW()),

-- 8. 승인된 스터디 예약
('2024-03-29 14:00:00', -- 금요일 오후
 '2024-03-29 16:00:00',
 'STUDY',
 '정보통신 자격증 스터디',
 'DAILY',
 'APPROVED',
 8, -- 프로젝트룸1
 3, -- 박지민 (정보통신공학과)
 NOW(),
 NOW()),

-- 9. 승인된 세미나 예약
('2024-03-25 15:00:00', -- 월요일 오후
 '2024-03-25 17:00:00',
 'SEMINAR',
 '컴퓨터공학 졸업작품 발표',
 'DAILY',
 'APPROVED',
 9, -- 프로젝트룸2
 4, -- 최동훈 (컴퓨터공학과)
 NOW(),
 NOW()),

-- 10. 거절된 예약 (정기 수업 시간과 중복)
('2024-03-26 09:00:00', -- 화요일 오전
 '2024-03-26 11:00:00',
 'OTHER',
 '소프트웨어학과 특강',
 'DAILY',
 'REJECTED',
 10, -- 강의실A
 5, -- 정미경 (소프트웨어학과)
 NOW(),
 NOW());
