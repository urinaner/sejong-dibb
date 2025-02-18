-- Department 더미 데이터 (1개)
INSERT INTO department (department_id, korean_name, english_name, intro, phone, location, educational_objective,
                        work_hour, map)
VALUES (1, '바이오융합공학과',
        'Bio-Fusion Engineering',
        '학과 소개',
        '02-143-747',
        '충무관 1128호',
        '바이오기술(BT)과 다른 분야와의 융합 연구를 통해 인류 복지에 기여하는 것을 목표로 한다.',
        '9:00 - 18:00',
        'https://home.sejong.ac.kr/~bioscidpt/map/24Ex');

-- users 더미 데이터
INSERT INTO users (users_id, login_id, password, username, email, phoneN, role)
VALUES (1, 'admin', '$2a$10$FKHTTHcEkAZZGW9XqGtPfOx.apKljbCLvYESM05YbLWzDynnacLPO', '관리자', 'admin@example.com',
        '010-1234-5678', 'ROLE_ADMIN');

-- Professor 더미 데이터 (10개)
INSERT INTO professor (professor_id, name, major, phone, email, position, homepage, lab, profile_image, bachelor, master, doctor)
VALUES (1, '권병호', '신경생물학', '010-3178-5629', 'kwonbh@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/kwonbh', '충무관 1128호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+001.png',
        '서울대학교 생물학과', '서울대학교 신경생물학과', '서울대학교 신경과학과'),
       (2, '허성문', '신경 과학', '010-4389-1276', 'heosm@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/heosm', '충무관 1126호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+002.png',
        '고려대학교 생명과학과', '서울대학교 신경과학과', '서울대학교 의과대학'),
       (3, '추은희', '분자세포생물학', '010-5291-8437', 'chueh@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/chueh', '충무관 212호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+003.png',
        '연세대학교 생물학과', '서울대학교 분자세포생물학과', '서울대학교 분자생물학과');

-- Seminar 더미 데이터 (10개)
INSERT INTO seminar (seminar_id, name, writer, place, start_time, end_time, speaker, company)
VALUES (1,
        'Genome-wide association study to identify QTL for fruit-related traits in a core collection of 287 tomato accessions',
        '이건', '충무관101A', '2024-11-29 09:00:00', '2024-11-29 10:00:00', '심성철', '세종대학교 바이오산업자원공학'),
       (2, 'HOW AL PREDICTS SEISMIC SHAKING', '이건', '충무관702', '2024-12-04 09:00:00', '2024-12-04 10:00:00', '이재홍',
        'NIHON UNIVERSITY'),
       (3, 'CRISPR/Cas9-mediated genome editing for crop improvement', '이건', '충무관101A', '2024-11-30 09:00:00',
        '2024-11-30 10:00:00', '정다은',
        '서울대학교 농생명과학대학'),
       (4, 'Metabolomics in precision medicine: Current trends and applications', '이건', '충무관702', '2024-12-01 09:00:00',
        '2024-12-01 10:00:00', '김현지', '한국생명공학연구원'),
       (5, 'Advanced tissue engineering for regenerative medicine', '이건', '충무관101A', '2024-12-02 09:00:00',
        '2024-12-02 10:00:00', '박진우',
        'KAIST 바이오융합센터'),
       (6, 'Bioplastics: Sustainable solutions for the future', '이건', '충무관702', '2024-12-03 09:00:00',
        '2024-12-03 10:00:00', '이민아',
        'SK 바이오텍'),
       (7, 'Bioinformatics approaches to microbiome analysis', '이건', '충무관101A', '2024-12-04 09:00:00',
        '2024-12-04 10:00:00', '최영훈',
        '연세대학교 시스템생물학과'),
       (8, 'Nanotechnology for drug delivery in cancer treatment', '이건', '충무관702', '2024-12-05 09:00:00',
        '2024-12-05 10:00:00', '한지수',
        '삼성바이오로직스'),
       (9, 'Synthetic biology for biofuel production', '이건', '충무관101A', '2024-12-06 09:00:00', '2024-12-06 10:00:00',
        '김성민',
        'POSTECH 생명공학부'),
       (10, 'Next-generation sequencing in personalized medicine', '이건', '충무관702', '2024-12-07', '2024-12-07', '류정한',
        '이화여자대학교 바이오융합학과');

-- Thesis 더미 데이터 (총 50개)
INSERT INTO thesis (thesis_id, title, author, journal, content, link, publication_date, thesis_image,
                    publication_collection,
                    publication_issue, publication_page, issn, professor_id)
VALUES
    -- 권병호 관련 논문
    (1, 'A Proposal for a New Classification of Neurotransmitters', '권병호', 'Journal of Neurobiology',
     '신경 전달 물질의 새로운 분류를 제안한 논문입니다.', 'https://example.com/thesis1', '2024-01-15',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-20+026.png', '12',
     '1', '15-22',
     '1223-5671', 1),
    (2, 'Research on Neural Regeneration Mechanisms for Brain Function Recovery', '권병호', 'Neurobiology and Beyond',
     '뇌 기능 회복을 위한 신경 재생 메커니즘 연구 논문입니다.', 'https://example.com/thesis11', '2024-11-01',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-20+027.png', '14',
     '5', '23-31',
     '1111-2233', 1),
    (3, 'Study on the Correlation Between Neural Circuits and Brain Disorders', '권병호', 'Neurobiology Insights',
     '신경 회로와 뇌질환 상관 연구를 다룬 논문입니다.', 'https://example.com/thesis21', '2024-05-10',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-20+028.png', '17',
     '9', '45-52',
     '1011-1211', 1),
    (4, 'Research on Neural Plasticity and Behavioral Changes', '권병호', 'Advanced Neural Studies',
     '신경 플라스틱성과 행동 변화를 연구한 논문입니다.', 'https://example.com/thesis31', '2024-08-12',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-21+029.png', '23',
     '4', '33-40',
     '1212-1345', 1),
    (5, 'Study on the Potential for Neural Network Recovery in Alzheimer’s Models', '권병호', 'Journal of Brain Research',
     '알츠하이머 모델의 신경망 회복 가능성을 연구한 논문입니다.', 'https://example.com/thesis41', '2024-02-14',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-21+029.png', '28',
     '6', '75-85',
     '1432-9876', 1);

-- Board 더미 데이터 (10개)
INSERT INTO board (board_id, title, content, view_count, writer, file_list, category, created_date)
VALUES (1, '2024-1학기 연계융합전공 신청 및 포기 안내', '연계융합전공 정보는 아래 링크에서 확인 가능합니다.', 31, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_02%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_02%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'employment', '2024-04-10 10:00:00'),

       (2, '세종대 김준우 학부생, 한국바이오협회 장학생 선정', '세종대학교는 김준우(바이오융합공학과22) 학생이 장학생으로 선발됐다고 밝혔다.', 1002, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'scholarship', '2024-02-05 14:30:00'),

       (3, '세종대 유망학과, 바이오융합공학과 정시 모집', '세종대학교 바이오융합공학과가 2025학년도 정시 모집에서 주목 받고 있다.', 302, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'undergraduate', '2024-12-01 09:00:00'),

       (4, '세종대 전은지 대학원생, 아이디어 공모전서 최우수상', '전은지 대학원생이 공모전에서 최우수상을 수상했다고 밝혔다.', 140, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'graduate', '2024-12-05 10:30:00'),

       (5, '세종대 동문들의 꿈과 진로이야기!', '전은지 학생은 프린스턴 대학 박사과정에 합격하여 입학을 앞두고 있다.', 233, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'employment', '2024-03-30 11:00:00'),

       (6, '바이오분야 막강 경쟁력 자랑', '2024년 11월 세종대 바이오융합공학과 소개 기사입니다.', 2305, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'scholarship', '2024-04-20 15:00:00'),

       (7, '세종대 바이오융합공학과 연구개발 지원사업에 2개 과제 선정', '2024년 12월 세종소식 기사입니다.', 92, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'undergraduate', '2024-04-28 13:45:00'),

       (8, '세종대 학술대회 발표자 모집 안내', '세종대는 학술대회 발표자를 모집하고 있습니다.', 55, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_01%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_01%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'employment', '2024-05-05 09:30:00'),

       (9, '바이오융합공학과 연구 성과 발표회', '연구 성과를 공유하는 발표회가 개최됩니다.', 160, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_01%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_02%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'graduate', '2024-05-20 14:00:00'),

       (10, '학부생 연구 지원 프로그램 안내', '연구 지원 프로그램에 대한 세부 정보는 아래 링크를 참고하세요.', 78, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_07%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_07%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'undergraduate', '2024-06-01 16:00:00');


-- 세미나실 더미데이터
INSERT INTO room (room_id, name, person_capacity, place, image)
VALUES (1, '충507C 세미나실', 20, '충무관 507', 'seminar1.jpg'),
       (2, '충506C 세미나실', 20, '충무관 506', 'seminar2.jpg');

INSERT INTO reservation (start_time, end_time, purpose, etc, room_id, user_id, created_date, updated_date)
VALUES ('2024-12-01 09:00:00', '2024-12-01 11:00:00', 'MEETING', '홍성무교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-01 13:00:00', '2024-12-01 15:00:00', 'MEETING', '김은희교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-02 10:00:00', '2024-12-02 12:00:00', 'MEETING', '김민수교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-03 14:00:00', '2024-12-03 16:00:00', 'MEETING', '전종훈교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-04 09:30:00', '2024-12-04 11:30:00', 'MEETING', '서민석교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-05 15:00:00', '2024-12-05 17:00:00', 'MEETING', '홍성무교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-06 10:30:00', '2024-12-06 12:30:00', 'MEETING', '김은희교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-07 13:30:00', '2024-12-07 15:30:00', 'MEETING', '김민수교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-08 11:00:00', '2024-12-08 13:00:00', 'MEETING', '전종훈교수님 랩미팅', 1, 1, NOW(), NOW()),
       ('2024-12-09 16:00:00', '2024-12-09 18:00:00', 'MEETING', '서민석교수님 랩미팅', 1, 1, NOW(), NOW());

INSERT INTO news (news_id, name, content, view, link, image, created_date)
VALUES (1, '세종대학교 바이오융합공학과, 혁신 연구 성과 발표',
        '세종대학교 바이오융합공학과가 올해 혁신적인 연구 성과를 발표했습니다.',
        320,
        'https://example.com/news1',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-10+010.png',
        NOW()),

       (2, '바이오융합공학과, 신입생 환영회 개최',
        '세종대학교 바이오융합공학과가 신입생들을 위한 환영회를 열었습니다.',
        150,
        'https://example.com/news2',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-10+009.png',
        NOW()),

       (3, '세종대, 바이오 분야 특화 교육 프로그램 개설',
        '세종대학교가 바이오 분야를 중심으로 한 특화 교육 프로그램을 개설하였습니다.',
        200,
        'https://example.com/news3',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-10+008.png',
        NOW()),

       (4, '바이오융합공학과 졸업생, 글로벌 기업 취업 성공',
        '세종대학교 바이오융합공학과 졸업생이 글로벌 기업에 성공적으로 취업했습니다.',
        400,
        'https://example.com/news4',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-09+007.png',
        NOW()),

       (5, '바이오융합공학과, 국제 학술대회 논문 발표',
        '바이오융합공학과 교수진이 국제 학술대회에서 연구 논문을 발표했습니다.',
        280,
        'https://example.com/news5',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-09+006.png',
        NOW()),

       (6, '세종대, 바이오 산업 연구 지원 강화',
        '세종대학교는 바이오 산업 연구를 위한 지원을 강화하고 있습니다.',
        170,
        'https://example.com/news6',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-09+005.png',
        NOW()),

       (7, '세종대 바이오융합공학과, 혁신적인 실험실 설립',
        '세종대학교 바이오융합공학과가 혁신적인 실험실을 설립하였습니다.',
        310,
        'https://example.com/news7',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-08+004.png',
        NOW()),

       (8, '세종대 바이오융합공학과, 신약 개발 프로젝트 시작',
        '세종대학교 바이오융합공학과가 신약 개발 프로젝트를 시작했습니다.',
        250,
        'https://example.com/news8',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-08+002.png',
        NOW()),

       (9, '세종대학교, 바이오융합공학과 신임 교수 임용',
        '세종대학교는 바이오융합공학과에 새로운 교수님을 임용했습니다.',
        180,
        'https://example.com/news9',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-08+003.png',
        NOW()),

       (10, '세종대 바이오융합공학과, 학술 논문 출판',
        '바이오융합공학과 교수진이 학술 논문을 성공적으로 출판하였습니다.',
        210,
        'https://example.com/news10',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/KakaoTalk_Photo_2025-01-16-16-19-07+001.png',
        NOW());
