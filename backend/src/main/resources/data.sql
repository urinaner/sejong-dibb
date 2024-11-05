SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE Department AUTO_INCREMENT = 1;
ALTER TABLE professor AUTO_INCREMENT = 1;
ALTER TABLE seminar AUTO_INCREMENT = 1;
ALTER TABLE thesis AUTO_INCREMENT = 1;
ALTER TABLE board AUTO_INCREMENT = 1;

UPDATE Department
SET educationalObjective = '컴퓨터 공학 인재 양성',
    englishName = 'Computer Engineering',
    intro = '컴퓨터공학과 소개',
    koreanName = '컴퓨터공학과',
    location = '본관 101호',
    map = 'https://example.com/map',
    phone = '010-1234-5678',
    workHour = '9:00 - 18:00'
WHERE department_id = 1;

-- Admin 더미 데이터 (1개)
INSERT INTO admin (id, login_id, password, username, email, role)
VALUES (1, 'admin01', 'password123', '관리자', 'admin@example.com', 'ADMIN');

-- Professor 더미 데이터 (10개)
INSERT INTO professor (professor_id, name, major, phone, email, position, homepage, lab, profileImage, department_id)
VALUES
    (1, '교수1', 'AI', '010-1111-1111', 'prof1@example.com', '교수', 'https://prof1-homepage.com', 'AI 연구실', 'https://example.com/prof1.jpg', 1),
    (2, '교수2', 'Machine Learning', '010-2222-2222', 'prof2@example.com', '교수', 'https://prof2-homepage.com', 'ML 연구실', 'https://example.com/prof2.jpg', 1),
    (3, '교수3', 'Computer Vision', '010-3333-3333', 'prof3@example.com', '교수', 'https://prof3-homepage.com', 'CV 연구실', 'https://example.com/prof3.jpg', 1),
    (4, '교수4', 'NLP', '010-4444-4444', 'prof4@example.com', '교수', 'https://prof4-homepage.com', 'NLP 연구실', 'https://example.com/prof4.jpg', 1),
    (5, '교수5', 'Data Science', '010-5555-5555', 'prof5@example.com', '교수', 'https://prof5-homepage.com', 'DS 연구실', 'https://example.com/prof5.jpg', 1),
    (6, '교수6', 'Software Engineering', '010-6666-6666', 'prof6@example.com', '교수', 'https://prof6-homepage.com', 'SE 연구실', 'https://example.com/prof6.jpg', 1),
    (7, '교수7', 'Cyber Security', '010-7777-7777', 'prof7@example.com', '교수', 'https://prof7-homepage.com', 'CS 연구실', 'https://example.com/prof7.jpg', 1),
    (8, '교수8', 'Blockchain', '010-8888-8888', 'prof8@example.com', '교수', 'https://prof8-homepage.com', 'Blockchain 연구실', 'https://example.com/prof8.jpg', 1),
    (9, '교수9', 'Cloud Computing', '010-9999-9999', 'prof9@example.com', '교수', 'https://prof9-homepage.com', 'Cloud 연구실', 'https://example.com/prof9.jpg', 1),
    (10, '교수10', 'Computer Graphics', '010-1010-1010', 'prof10@example.com', '교수', 'https://prof10-homepage.com', 'CG 연구실', 'https://example.com/prof10.jpg', 1);

-- Seminar 더미 데이터 (10개)
INSERT INTO seminar (seminar_id, name, writer, place, start_date, end_date, speaker, company, department_id)
VALUES
    (1, '세미나1', '작성자1', '세미나룸 A', '2024-01-01', '2024-01-02', '연사1', '기업1', 1),
    (2, '세미나2', '작성자2', '세미나룸 B', '2024-01-10', '2024-01-11', '연사2', '기업2', 1),
    (3, '세미나3', '작성자3', '세미나룸 C', '2024-02-01', '2024-02-02', '연사3', '기업3', 1),
    (4, '세미나4', '작성자4', '세미나룸 D', '2024-03-01', '2024-03-02', '연사4', '기업4', 1),
    (5, '세미나5', '작성자5', '세미나룸 E', '2024-04-01', '2024-04-02', '연사5', '기업5', 1),
    (6, '세미나6', '작성자6', '세미나룸 F', '2024-05-01', '2024-05-02', '연사6', '기업6', 1),
    (7, '세미나7', '작성자7', '세미나룸 G', '2024-06-01', '2024-06-02', '연사7', '기업7', 1),
    (8, '세미나8', '작성자8', '세미나룸 H', '2024-07-01', '2024-07-02', '연사8', '기업8', 1),
    (9, '세미나9', '작성자9', '세미나룸 I', '2024-08-01', '2024-08-02', '연사9', '기업9', 1),
    (10, '세미나10', '작성자10', '세미나룸 J', '2024-09-01', '2024-09-02', '연사10', '기업10', 1);

-- Thesis 더미 데이터 (10개)
INSERT INTO thesis (thesis_id, author, journal, content, link, publication_date, thesis_image, publication_collection, publication_issue, publication_page, issn, professor_id)
VALUES
    (1, '저자1', 'Journal A', '논문 내용 1', 'https://example.com/thesis1', '2024-01-01', 'https://example.com/image1.jpg', 'Volume 1', 'Issue 1', 'Page 1', '1234-5678', 1),
    (2, '저자2', 'Journal B', '논문 내용 2', 'https://example.com/thesis2', '2024-02-01', 'https://example.com/image2.jpg', 'Volume 2', 'Issue 2', 'Page 2', '2345-6789', 2),
    (3, '저자3', 'Journal C', '논문 내용 3', 'https://example.com/thesis3', '2024-03-01', 'https://example.com/image3.jpg', 'Volume 3', 'Issue 3', 'Page 3', '3456-7890', 3),
    (4, '저자4', 'Journal D', '논문 내용 4', 'https://example.com/thesis4', '2024-04-01', 'https://example.com/image4.jpg', 'Volume 4', 'Issue 4', 'Page 4', '4567-8901', 4),
    (5, '저자5', 'Journal E', '논문 내용 5', 'https://example.com/thesis5', '2024-05-01', 'https://example.com/image5.jpg', 'Volume 5', 'Issue 5', 'Page 5', '5678-9012', 5),
    (6, '저자6', 'Journal F', '논문 내용 6', 'https://example.com/thesis6', '2024-06-01', 'https://example.com/image6.jpg', 'Volume 6', 'Issue 6', 'Page 6', '6789-0123', 6),
    (7, '저자7', 'Journal G', '논문 내용 7', 'https://example.com/thesis7', '2024-07-01', 'https://example.com/image7.jpg', 'Volume 7', 'Issue 7', 'Page 7', '7890-1234', 7),
    (8, '저자8', 'Journal H', '논문 내용 8', 'https://example.com/thesis8', '2024-08-01', 'https://example.com/image8.jpg', 'Volume 8', 'Issue 8', 'Page 8', '8901-2345', 8),
    (9, '저자9', 'Journal I', '논문 내용 9', 'https://example.com/thesis9', '2024-09-01', 'https://example.com/image9.jpg', 'Volume 9', 'Issue 9', 'Page 9', '9012-3456', 9),
    (10, '저자10', 'Journal J', '논문 내용 10', 'https://example.com/thesis10', '2024-10-01', 'https://example.com/image10.jpg', 'Volume 10', 'Issue 10', 'Page 10', '0123-4567', 10);

-- Board 더미 데이터 (10개)
INSERT INTO board (board_id, title, content, view_count, writer, file, create_date, category, department_id)
VALUES
    (1, '첫 번째 게시글', '게시글 내용 1', 10, '작성자1', 'file1.txt', '2024-01-01', 'undergraduate', 1),
    (2, '두 번째 게시글', '게시글 내용 2', 20, '작성자2', 'file2.txt', '2024-01-02', 'graduate', 1),
    (3, '세 번째 게시글', '게시글 내용 3', 30, '작성자3', 'file3.txt', '2024-01-03', 'employment', 1),
    (4, '네 번째 게시글', '게시글 내용 4', 40, '작성자4', 'file4.txt', '2024-01-04', 'scholarship', 1),
    (5, '다섯 번째 게시글', '게시글 내용 5', 50, '작성자5', 'file5.txt', '2024-01-05', 'undergraduate', 1),
    (6, '여섯 번째 게시글', '게시글 내용 6', 60, '작성자6', 'file6.txt', '2024-01-06', 'graduate', 1),
    (7, '일곱 번째 게시글', '게시글 내용 7', 70, '작성자7', 'file7.txt', '2024-01-07', 'employment', 1),
    (8, '여덟 번째 게시글', '게시글 내용 8', 80, '작성자8', 'file8.txt', '2024-01-08', 'scholarship', 1),
    (9, '아홉 번째 게시글', '게시글 내용 9', 90, '작성자9', 'file9.txt', '2024-01-09', 'undergraduate', 1),
    (10, '열 번째 게시글', '게시글 내용 10', 100, '작성자10', 'file10.txt', '2024-01-10', 'graduate', 1);

SET FOREIGN_KEY_CHECKS = 1;