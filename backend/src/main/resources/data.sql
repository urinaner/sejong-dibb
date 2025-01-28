DELETE
FROM board;
DELETE
FROM thesis;
DELETE
FROM reservation;
DELETE
FROM room;
DELETE
FROM seminar;
DELETE
FROM professor;
DELETE
FROM department;
DELETE
FROM admin;
DELETE
FROM news;


-- Department 더미 데이터 (1개)
INSERT INTO department (department_id, korean_name, english_name, intro, phone, location, educational_objective, work_hour, map)
VALUES (1, '바이오융합공학과',
        'Bio-Fusion Engineering',
        '학과 소개',
        '02-143-747',
        '충무관 1128호',
        '바이오기술(BT)과 다른 분야와의 융합 연구를 통해 인류 복지에 기여하는 것을 목표로 한다.',
        '9:00 - 18:00',
        'https://home.sejong.ac.kr/~bioscidpt/map/24Ex');

-- Admin 더미 데이터 (1개)
INSERT INTO admin (admin_id, login_id, password, username, email, role)
VALUES (1, 'admin', '$2a$10$FKHTTHcEkAZZGW9XqGtPfOx.apKljbCLvYESM05YbLWzDynnacLPO', '관리자', 'admin@example.com', 'ADMIN');

-- Professor 더미 데이터 (10개)
INSERT INTO professor (professor_id, name, major, phone, email, position, homepage, lab, profile_image)
VALUES (1, '권병호', '신경생물학', '010-3178-5629', 'kwonbh@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/kwonbh', '충무관 1128호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+001.png'),
       (2, '허성문', '신경 과학', '010-4389-1276', 'heosm@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/heosm', '충무관 1126호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+002.png'),
       (3, '추은희', '분자세포생물학', '010-5291-8437', 'chueh@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/chueh', '충무관 212호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+003.png'),
       (4, '정재수', '세포분자생리학', '010-6142-3895', 'jungjs@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/jungjs', '충무관 214호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+004.png'),
       (5, '청하람', '생명화학', '010-7834-9261', 'cheonghr@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/cheonghr', '충무관 616호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-56+005.png'),
       (6, '최수진', '생물화공', '010-8394-2165', 'choisj@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/choisj', '충무관 602호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-56+006.png'),
       (7, '허병도', '분자생물학', '010-9412-6578', 'heobd@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/heobd', '충무관 306A호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-56+007.png'),
       (8, '한은하', '미생물학', '010-2578-3641', 'haneh@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/haneh', '충무관 614호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-56+008.png'),
       (9, '임종득', '생화학', '010-6471-8923', 'limjd@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/limjd', '충무관 506호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-57+009.png'),
       (10, '어재봉', '약물전달시스템', '010-3748-5296', 'eojb@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/eojb', '충무관 601호',
        'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-57+010.png');

-- Seminar 더미 데이터 (10개)
INSERT INTO seminar (seminar_id, name, writer, place, start_time, end_time, speaker, company)
VALUES (1, 'Genome-wide association study to identify QTL for fruit-related traits in a core collection of 287 tomato accessions',
        '이건', '충무관101A', '2024-11-29 09:00:00', '2024-11-29 10:00:00', '심성철', '세종대학교 바이오산업자원공학'),
       (2, 'HOW AL PREDICTS SEISMIC SHAKING', '이건', '충무관702', '2024-12-04 09:00:00', '2024-12-04 10:00:00', '이재홍', 'NIHON UNIVERSITY'),
       (3, 'CRISPR/Cas9-mediated genome editing for crop improvement', '이건', '충무관101A', '2024-11-30 09:00:00', '2024-11-30 10:00:00', '정다은',
        '서울대학교 농생명과학대학'),
       (4, 'Metabolomics in precision medicine: Current trends and applications', '이건', '충무관702', '2024-12-01 09:00:00',
        '2024-12-01 10:00:00', '김현지', '한국생명공학연구원'),
       (5, 'Advanced tissue engineering for regenerative medicine', '이건', '충무관101A', '2024-12-02 09:00:00', '2024-12-02 10:00:00', '박진우',
        'KAIST 바이오융합센터'),
       (6, 'Bioplastics: Sustainable solutions for the future', '이건', '충무관702', '2024-12-03 09:00:00', '2024-12-03 10:00:00', '이민아',
        'SK 바이오텍'),
       (7, 'Bioinformatics approaches to microbiome analysis', '이건', '충무관101A', '2024-12-04 09:00:00', '2024-12-04 10:00:00', '최영훈',
        '연세대학교 시스템생물학과'),
       (8, 'Nanotechnology for drug delivery in cancer treatment', '이건', '충무관702', '2024-12-05 09:00:00', '2024-12-05 10:00:00', '한지수',
        '삼성바이오로직스'),
       (9, 'Synthetic biology for biofuel production', '이건', '충무관101A', '2024-12-06 09:00:00', '2024-12-06 10:00:00', '김성민',
        'POSTECH 생명공학부'),
       (10, 'Next-generation sequencing in personalized medicine', '이건', '충무관702', '2024-12-07', '2024-12-07', '류정한',
        '이화여자대학교 바이오융합학과');

-- Thesis 더미 데이터 (총 50개)
INSERT INTO thesis (thesis_id, title, author, journal, content, link, publication_date, thesis_image, publication_collection,
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
     '1432-9876', 1),

    -- 허성문 관련 논문
    (6, 'AI-Based Neural Signal Analysis Study', '허성문', 'Neural Networks Journal', 'AI 기반 신경 신호 분석 연구 논문입니다.',
     'https://example.com/thesis2', '2024-02-10',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-10+001.png', '18',
     '2', '33-40', '2431-8934', 2),
    (7, 'Applications of AI Technology in Neuroscience', '허성문', 'Journal of Neuroscience', '신경과학의 AI 기술 활용 사례를 다룬 논문입니다.',
     'https://example.com/thesis12', '2024-11-02',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-11+002.png', '19',
     '12', '227-235', '1212-3344', 2),
    (8, 'Neuroscience Data Analysis Using Deep Learning', '허성문', 'Artificial Neural Studies',
     '딥러닝을 활용한 신경과학 데이터 분석 논문입니다.', 'https://example.com/thesis22', '2024-06-15',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-11+003.png', '22',
     '8', '57-64', '3456-2345', 2),
    (9, 'Integration of Medical AI and Neural Recovery Research', '허성문', 'AI in Neural Pathways',
     '의료용 AI와 신경 회복의 융합 연구를 다룬 논문입니다.', 'https://example.com/thesis32', '2024-09-20',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-12+004.png', '25',
     '11', '67-75', '4456-5678', 2),
    (10, 'Research on Data Normalization Techniques in Neural Networks', '허성문', 'Neurodata Science',
     '신경망에서 데이터 정규화 기법 연구를 다룬 논문입니다.', 'https://example.com/thesis42', '2024-03-10',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-12+005.png', '30',
     '5', '92-102', '5647-7869', 2),

    -- 추은희 관련 논문
    (11, 'Analysis of Gene Expression Regulation Mechanisms', '추은희', 'Molecular Cell Biology', '유전자 발현 조절 메커니즘을 분석한 논문입니다.',
     'https://example.com/thesis3', '2024-03-20',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-12+006.png', '21',
     '3', '55-62', '3241-9876', 3),
    (12, 'Molecular Technologies for Solving Protein Folding Problems', '추은희', 'Molecular Innovations',
     '단백질 접힘 문제를 해결하기 위한 분자 기술 연구 논문입니다.', 'https://example.com/thesis13', '2024-11-03',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-13+007.png', '25',
     '1', '237-245', '1313-4455', 3),
    (13, 'Medical Applications of Gene Editing Technologies', '추은희', 'CRISPR Advances', '유전자 편집 기술의 의학적 활용을 다룬 논문입니다.',
     'https://example.com/thesis23', '2024-07-15',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-13+008.png', '26',
     '6', '74-83', '5647-7842', 3),
    (14, 'Integration of Proteomics Technologies and Molecular Biology', '추은희', 'Genomics and Proteomics',
     '프로테오믹스 기술과 분자 생물학의 융합을 다룬 논문입니다.', 'https://example.com/thesis33', '2024-10-25',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-13+009.png', '29',
     '10', '102-111', '8756-3498', 3),
    (15, 'Trends in Gene Expression Regulation', '추은희', 'Gene Expression Horizons', '유전자 발현 조절의 최신 동향을 연구한 논문입니다.',
     'https://example.com/thesis43', '2024-04-18',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-14+010.png', '31',
     '7', '122-130', '7865-6578', 3),
    (16, 'Research on Cellular Signal Transduction Networks', '정재수', 'Signal Biology Today', '세포 신호 전달 네트워크 연구 논문입니다.',
     'https://example.com/thesis24', '2024-05-12',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-14+011.png', '12',
     '6', '45-52', '4567-2345', 4),
    (17, 'Analysis of Protein Roles in Intracellular Signal Pathways', '정재수', 'Cellular Dynamics',
     '세포 내 신호 전달 경로에서 단백질의 역할 분석.', 'https://example.com/thesis34', '2024-07-20',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-14+012.png', '14',
     '3', '67-74', '3456-5647', 4),
    (18, 'Mechanistic Study on Signal Transduction in Cell Membranes', '정재수', 'Membrane Biology Horizons',
     '세포막 신호 전달 메커니즘 연구.', 'https://example.com/thesis44', '2024-08-18',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-15+013.png', '17',
     '9', '95-104', '1234-6543', 4),
    (19, 'Drug Development through Enzyme Activity Control', '청하람', 'Biochemical Applications', '효소 활성 제어를 통한 약물 개발 연구.',
     'https://example.com/thesis25', '2024-05-20',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-15+014.png', '13',
     '2', '73-81', '7564-3456', 5),
    (20, 'Bio-material Research Using Enzyme Catalysts', '청하람', 'Enzyme Engineering', '효소 촉매를 활용한 바이오 소재 연구.',
     'https://example.com/thesis35', '2024-07-25',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-16+015.png', '20',
     '4', '102-110', '5647-7654', 5),
    (21, 'Biotechnological Applications Using Catalyst Technologies', '청하람', 'Catalyst Research Advances',
     '촉매 기술을 활용한 생명 공학 응용.', 'https://example.com/thesis45', '2024-09-01',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-17+016.png', '23',
     '7', '92-101', '8754-7865', 5),
    -- 최수진 및 허병도 관련 논문
    (22, 'Environmental Pollution Remediation Using Biochemical Engineering', '최수진', 'Chemical Biology Trends',
     '생물화공을 활용한 환경 오염 정화 기술.', 'https://example.com/thesis26', '2024-05-15',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-17+017.png', '19',
     '5', '63-72', '2345-9786', 6),
    (23, 'Process Improvement for Bioplastic Production', '최수진', 'Bioengineering Applications', '바이오플라스틱 생산 공정 개선 연구.',
     'https://example.com/thesis36', '2024-08-10',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-17+018.png', '21',
     '8', '82-90', '7456-3945', 6),
    (24, 'Development of Sustainable Biochemical Engineering Technologies', '최수진', 'Sustainable Bioengineering',
     '지속 가능한 생물화공 기술 개발 논문.', 'https://example.com/thesis46', '2024-09-25',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-18+019.png', '24',
     '10', '112-120', '5647-7865', 6),
    (25, 'Cancer Cell Suppression Based on Molecular Biology', '허병도', 'Molecular Innovations', '분자생물학 기반 암 세포 억제 연구.',
     'https://example.com/thesis27', '2024-06-01',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-18+020.png', '15',
     '6', '71-80', '1234-7890', 7),
    (26, 'Role of Non-Coding Regions in RNA', '허병도', 'RNA Pathway Studies', 'RNA의 비암호화 영역의 역할 분석.',
     'https://example.com/thesis37', '2024-07-20',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-18+021.png', '18',
     '9', '87-96', '6574-3456', 7),
    (27, 'Gene Therapy Technologies and Cancer Treatment Potential', '허병도', 'Gene Therapy Advances', '유전자 치료 기술과 암 치료 가능성.',
     'https://example.com/thesis47', '2024-10-05',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-19+022.png', '21',
     '11', '103-112', '7864-5678', 7),
    (28, 'Bio-Material Development Using Microorganisms', '한은하', 'Microbial Engineering', '미생물을 활용한 바이오 소재 개발.',
     'https://example.com/thesis28', '2024-05-25',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-19+023.png', '17',
     '3', '43-52', '3456-8790', 8),
    (29, 'Enzyme Production Using Industrial Microorganisms', '한은하', 'Industrial Microbiology', '산업 미생물을 활용한 효소 생산 연구.',
     'https://example.com/thesis38', '2024-08-05',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-19+024.png', '20',
     '6', '67-75', '4567-9087', 8),
    (30, 'New Applications of Microbial Metabolic Pathways', '한은하', 'Microbial Pathways', '미생물 대사 경로의 새로운 활용 가능성.',
     'https://example.com/thesis48', '2024-09-15',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-19+025.png', '22',
     '8', '83-92', '5674-9876', 8),
    (31, 'New Approaches to Protein Interactions', '임종득', 'Advanced Biochemistry', '단백질 상호작용의 새로운 접근 방식.',
     'https://example.com/thesis29', '2024-06-10',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-17+001.png', '16',
     '4', '53-62', '1234-8765', 9),
    (32, 'Mechanisms of Ligand-Protein Interactions', '임종득', 'Protein-Ligand Interactions', '리간드와 단백질의 상호작용 메커니즘.',
     'https://example.com/thesis39', '2024-07-15',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-18+002.png', '19',
     '7', '77-85', '4567-2345', 9),
    (33, 'Case Studies in Drug Development Based on Protein Structures', '임종득', 'Drug Design Insights',
     '단백질 구조 기반 신약 개발 사례.', 'https://example.com/thesis49', '2024-10-25',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-18+003.png', '22',
     '11', '98-107', '9876-1234', 9),
    (34, 'Applications of Nanotechnology in Drug Delivery Systems', '어재봉', 'Drug Delivery Systems', '약물전달시스템에서 나노기술 응용 사례.',
     'https://example.com/thesis30', '2024-06-25',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-19+004.png', '18',
     '5', '71-79', '4567-9087', 10),
    (35, 'Drug Delivery Potential Using Nanoparticles', '어재봉', 'Nanoparticle Drug Delivery', '나노입자를 활용한 약물 전달 가능성.',
     'https://example.com/thesis40', '2024-08-12',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-19+005.png', '20',
     '9', '87-94', '5678-2345', 10),
    (36, 'Next-Generation Drug Delivery Technologies', '어재봉', 'Advanced Drug Systems', '차세대 약물전달기술 연구.',
     'https://example.com/thesis50', '2024-10-30',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-19+006.png', '23',
     '12', '102-110', '2345-9087', 10);

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

INSERT INTO reservation (start_time, end_time, purpose, etc, room_id, user_id, created_at, updated_at)
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

INSERT INTO news (news_id, name, content, view, link, image, created_at)
VALUES
    (1, '세종대학교 바이오융합공학과, 혁신 연구 성과 발표',
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
