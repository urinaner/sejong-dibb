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
VALUES (
           '바이오융합공학과',
           'Bio-Fusion Engineering',
           '학과 소개',
           '02-143-747',
           '충무관 1128호',
           '바이오기술(BT)과 다른 분야와의 융합 연구를 통해 인류 복지에 기여하는 것을 목표로 한다.',
           '9:00 - 18:00',
           'https://home.sejong.ac.kr/~bioscidpt/map/24Ex'
       );

-- Admin 더미 데이터 (1개)
INSERT INTO admin (login_id, password, username, email, role)
VALUES ('admin', '$2a$10$FKHTTHcEkAZZGW9XqGtPfOx.apKljbCLvYESM05YbLWzDynnacLPO', '관리자', 'admin@example.com', 'ADMIN');

-- Professor 더미 데이터 (10개)
INSERT INTO professor (name, major, phone, email, position, homepage, lab, profile_image)
VALUES
    ('권병호', '신경생물학', '010-3178-5629', 'kwonbh@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/kwonbh', '충무관 1128호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+001.png'),
    ('허성문', '신경 과학', '010-4389-1276', 'heosm@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/heosm', '충무관 1126호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+002.png'),
    ('추은희', '분자세포생물학', '010-5291-8437', 'chueh@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/chueh', '충무관 212호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+003.png'),
    ('정재수', '세포분자생리학', '010-6142-3895', 'jungjs@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/jungjs', '충무관 214호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-55+004.png'),
    ('청하람', '생명화학', '010-7834-9261', 'cheonghr@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/cheonghr', '충무관 616호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-56+005.png'),
    ('최수진', '생물화공', '010-8394-2165', 'choisj@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/choisj', '충무관 602호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-56+006.png'),
    ('허병도', '분자생물학', '010-9412-6578', 'heobd@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/heobd', '충무관 306A호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-56+007.png'),
    ('한은하', '미생물학', '010-2578-3641', 'haneh@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/haneh', '충무관 614호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-56+008.png'),
    ('임종득', '생화학', '010-6471-8923', 'limjd@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/limjd', '충무관 506호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-57+009.png'),
    ('어재봉', '약물전달시스템', '010-3748-5296', 'eojb@sju.ac.kr', '교수', 'https://home.sejong.ac.kr/eojb', '충무관 601호',
     'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/KakaoTalk_Photo_2024-12-05-14-44-57+010.png');

-- Seminar 더미 데이터 (10개)
INSERT INTO seminar (name, writer, place, start_date, end_date, speaker, company)
VALUES
    ('Genome-wide association study to identify QTL for fruit-related traits in a core collection of 287 tomato accessions', '이건', '충무관101A', '2024-11-29', '2024-11-29', '심성철', '세종대학교 바이오산업자원공학'),
    ('HOW AL PREDICTS SEISMIC SHAKING', '이건', '충무관702', '2024-12-04', '2024-12-04', '이재홍', 'NIHON UNIVERSITY'),
    ('CRISPR/Cas9-mediated genome editing for crop improvement', '이건', '충무관101A', '2024-11-30', '2024-11-30', '정다은', '서울대학교 농생명과학대학'),
    ('Metabolomics in precision medicine: Current trends and applications', '이건', '충무관702', '2024-12-01', '2024-12-01', '김현지', '한국생명공학연구원'),
    ('Advanced tissue engineering for regenerative medicine', '이건', '충무관101A', '2024-12-02', '2024-12-02', '박진우', 'KAIST 바이오융합센터'),
    ('Bioplastics: Sustainable solutions for the future', '이건', '충무관702', '2024-12-03', '2024-12-03', '이민아', 'SK 바이오텍'),
    ('Bioinformatics approaches to microbiome analysis', '이건', '충무관101A', '2024-12-04', '2024-12-04', '최영훈', '연세대학교 시스템생물학과'),
    ('Nanotechnology for drug delivery in cancer treatment', '이건', '충무관702', '2024-12-05', '2024-12-05', '한지수', '삼성바이오로직스'),
    ('Synthetic biology for biofuel production', '이건', '충무관101A', '2024-12-06', '2024-12-06', '김성민', 'POSTECH 생명공학부'),
    ('Next-generation sequencing in personalized medicine', '이건', '충무관702', '2024-12-07', '2024-12-07', '류정한', '이화여자대학교 바이오융합학과');

-- Thesis 더미 데이터 (총 50개)
INSERT INTO thesis (title, author, journal, content, link, publication_date, thesis_image, publication_collection,
                    publication_issue, publication_page, issn, professor_id)
VALUES
    -- 권병호 관련 논문
    ('신경 전달 물질의 새로운 분류', '권병호', 'Journal of Neurobiology', '신경 전달 물질의 새로운 분류를 제안한 논문입니다.', 'https://example.com/thesis1',
     '2024-01-15', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-20+026.png', 'Vol. 12', 'No. 1', 'pp. 15-22',
     '1223-5671', 1),
    ('뇌 기능 회복을 위한 신경 재생 연구', '권병호', 'Neurobiology and Beyond', '뇌 기능 회복을 위한 신경 재생 메커니즘 연구 논문입니다.', 'https://example.com/thesis11',
     '2024-11-01', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-20+027.png', 'Vol. 14', 'No. 5', 'pp. 23-31',
     '1111-2233', 1),
    ('신경 회로와 뇌질환 연구', '권병호', 'Neurobiology Insights', '신경 회로와 뇌질환 상관 연구를 다룬 논문입니다.', 'https://example.com/thesis21',
     '2024-05-10', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-20+028.png', 'Vol. 17', 'No. 9', 'pp. 45-52',
     '1011-1211', 1),
    ('신경 플라스틱성과 행동 변화', '권병호', 'Advanced Neural Studies', '신경 플라스틱성과 행동 변화를 연구한 논문입니다.', 'https://example.com/thesis31',
     '2024-08-12', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-21+029.png', 'Vol. 23', 'No. 4', 'pp. 33-40',
     '1212-1345', 1),
    ('알츠하이머 모델의 신경망 회복', '권병호', 'Journal of Brain Research', '알츠하이머 모델의 신경망 회복 가능성을 연구한 논문입니다.', 'https://example.com/thesis41',
     '2024-02-14', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-21+029.png', 'Vol. 28', 'No. 6', 'pp. 75-85',
     '1432-9876', 1),

    -- 허성문 관련 논문
    ('AI 기반 신경 신호 분석', '허성문', 'Neural Networks Journal', 'AI 기반 신경 신호 분석 연구 논문입니다.', 'https://example.com/thesis2',
     '2024-02-10', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-10+001.png', 'Vol. 18', 'No. 2', 'pp. 33-40',
     '2431-8934', 2),
    ('신경과학의 AI 기술 활용 사례', '허성문', 'Journal of Neuroscience', '신경과학의 AI 기술 활용 사례를 다룬 논문입니다.', 'https://example.com/thesis12',
     '2024-11-02', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-11+002.png', 'Vol. 19', 'No. 12', 'pp. 227-235',
     '1212-3344', 2),
    ('딥러닝 기반 신경 데이터 분석', '허성문', 'Artificial Neural Studies', '딥러닝을 활용한 신경과학 데이터 분석 논문입니다.', 'https://example.com/thesis22',
     '2024-06-15', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-11+003.png', 'Vol. 22', 'No. 8', 'pp. 57-64',
     '3456-2345', 2),
    ('의료용 AI와 신경 회복 융합 연구', '허성문', 'AI in Neural Pathways', '의료용 AI와 신경 회복의 융합 연구를 다룬 논문입니다.', 'https://example.com/thesis32',
     '2024-09-20', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-12+004.png', 'Vol. 25', 'No. 11', 'pp. 67-75',
     '4456-5678', 2),
    ('신경망 데이터 정규화 기법 연구', '허성문', 'Neurodata Science', '신경망에서 데이터 정규화 기법 연구를 다룬 논문입니다.', 'https://example.com/thesis42',
     '2024-03-10', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-12+005.png', 'Vol. 30', 'No. 5', 'pp. 92-102',
     '5647-7869', 2),

    -- 추은희 관련 논문
    ('유전자 발현 조절 메커니즘 분석', '추은희', 'Molecular Cell Biology', '유전자 발현 조절 메커니즘을 분석한 논문입니다.', 'https://example.com/thesis3',
     '2024-03-20', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-12+006.png', 'Vol. 21', 'No. 3', 'pp. 55-62',
     '3241-9876', 3),
    ('단백질 접힘 문제 해결 연구', '추은희', 'Molecular Innovations', '단백질 접힘 문제를 해결하기 위한 분자 기술 연구 논문입니다.', 'https://example.com/thesis13',
     '2024-11-03', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-13+007.png', 'Vol. 25', 'No. 1', 'pp. 237-245',
     '1313-4455', 3),
    ('유전자 편집 기술의 의학적 활용', '추은희', 'CRISPR Advances', '유전자 편집 기술의 의학적 활용을 다룬 논문입니다.', 'https://example.com/thesis23',
     '2024-07-15', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-13+008.png', 'Vol. 26', 'No. 6', 'pp. 74-83',
     '5647-7842', 3),
    ('프로테오믹스와 분자 생물학 융합', '추은희', 'Genomics and Proteomics', '프로테오믹스 기술과 분자 생물학의 융합을 다룬 논문입니다.', 'https://example.com/thesis33',
     '2024-10-25', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-13+009.png', 'Vol. 29', 'No. 10', 'pp. 102-111',
     '8756-3498', 3),
    ('유전자 발현 조절 최신 동향', '추은희', 'Gene Expression Horizons', '유전자 발현 조절의 최신 동향을 연구한 논문입니다.', 'https://example.com/thesis43',
     '2024-04-18', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-14+010.png', 'Vol. 31', 'No. 7', 'pp. 122-130',
     '7865-6578', 3),

    -- 정재수 관련 논문
    ('세포 신호 전달 네트워크 연구', '정재수', 'Signal Biology Today', '세포 신호 전달 네트워크 연구 논문입니다.', 'https://example.com/thesis24',
     '2024-05-12', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-14+011.png', 'Vol. 12', 'No. 6', 'pp. 45-52',
     '4567-2345', 4),
    ('단백질의 역할 분석', '정재수', 'Cellular Dynamics', '세포 내 신호 전달 경로에서 단백질의 역할 분석.', 'https://example.com/thesis34',
     '2024-07-20', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-14+012.png', 'Vol. 14', 'No. 3', 'pp. 67-74',
     '3456-5647', 4),
    ('세포막 신호 전달 메커니즘', '정재수', 'Membrane Biology Horizons', '세포막 신호 전달 메커니즘 연구.', 'https://example.com/thesis44',
     '2024-08-18', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-15+013.png', 'Vol. 17', 'No. 9', 'pp. 95-104',
     '1234-6543', 4),

    -- 청하람 관련 논문
    ('효소 활성 제어와 약물 개발', '청하람', 'Biochemical Applications', '효소 활성 제어를 통한 약물 개발 연구.', 'https://example.com/thesis25',
     '2024-05-20', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-15+014.png', 'Vol. 13', 'No. 2', 'pp. 73-81',
     '7564-3456', 5),
    ('효소 촉매 활용 바이오 소재 연구', '청하람', 'Enzyme Engineering', '효소 촉매를 활용한 바이오 소재 연구.', 'https://example.com/thesis35',
     '2024-07-25', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-16+015.png', 'Vol. 20', 'No. 4', 'pp. 102-110',
     '5647-7654', 5),
    ('촉매 기술과 생명 공학 응용', '청하람', 'Catalyst Research Advances', '촉매 기술을 활용한 생명 공학 응용.', 'https://example.com/thesis45',
     '2024-09-01', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-17+016.png', 'Vol. 23', 'No. 7', 'pp. 92-101',
     '8754-7865', 5),
    -- 최수진 관련 논문
    ('생물화공을 활용한 환경 오염 정화', '최수진', 'Chemical Biology Trends', '생물화공을 활용한 환경 오염 정화 기술.', 'https://example.com/thesis26',
     '2024-05-15', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-17+017.png', 'Vol. 19', 'No. 5', 'pp. 63-72',
     '2345-9786', 6),
    ('바이오플라스틱 생산 공정 개선', '최수진', 'Bioengineering Applications', '바이오플라스틱 생산 공정 개선 연구.', 'https://example.com/thesis36',
     '2024-08-10', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-17+018.png', 'Vol. 21', 'No. 8', 'pp. 82-90',
     '7456-3945', 6),
    ('지속 가능한 생물화공 기술 개발', '최수진', 'Sustainable Bioengineering', '지속 가능한 생물화공 기술 개발 논문.', 'https://example.com/thesis46',
     '2024-09-25', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-18+019.png', 'Vol. 24', 'No. 10', 'pp. 112-120',
     '5647-7865', 6),

    -- 허병도 관련 논문
    ('분자생물학 기반 암 세포 억제', '허병도', 'Molecular Innovations', '분자생물학 기반 암 세포 억제 연구.', 'https://example.com/thesis27',
     '2024-06-01', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-18+020.png', 'Vol. 15', 'No. 6', 'pp. 71-80',
     '1234-7890', 7),
    ('RNA 비암호화 영역의 역할 분석', '허병도', 'RNA Pathway Studies', 'RNA의 비암호화 영역의 역할 분석.', 'https://example.com/thesis37',
     '2024-07-20', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-18+021.png', 'Vol. 18', 'No. 9', 'pp. 87-96',
     '6574-3456', 7),
    ('유전자 치료 기술과 암 치료', '허병도', 'Gene Therapy Advances', '유전자 치료 기술과 암 치료 가능성.', 'https://example.com/thesis47',
     '2024-10-05', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-19+022.png', 'Vol. 21', 'No. 11', 'pp. 103-112',
     '7864-5678', 7),

    -- 한은하 관련 논문
    ('미생물을 활용한 바이오 소재 개발', '한은하', 'Microbial Engineering', '미생물을 활용한 바이오 소재 개발.', 'https://example.com/thesis28',
     '2024-05-25', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-19+023.png', 'Vol. 17', 'No. 3', 'pp. 43-52',
     '3456-8790', 8),
    ('산업 미생물 효소 생산 연구', '한은하', 'Industrial Microbiology', '산업 미생물을 활용한 효소 생산 연구.', 'https://example.com/thesis38',
     '2024-08-05', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-19+024.png', 'Vol. 20', 'No. 6', 'pp. 67-75',
     '4567-9087', 8),
    ('미생물 대사 경로 활용 가능성', '한은하', 'Microbial Pathways', '미생물 대사 경로의 새로운 활용 가능성.', 'https://example.com/thesis48',
     '2024-09-15', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-07-19+025.png', 'Vol. 22', 'No. 8', 'pp. 83-92',
     '5674-9876', 8),

    -- 임종득 관련 논문
    ('단백질 상호작용의 새로운 접근', '임종득', 'Advanced Biochemistry', '단백질 상호작용의 새로운 접근 방식.', 'https://example.com/thesis29',
     '2024-06-10', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-17+001.png', 'Vol. 16', 'No. 4', 'pp. 53-62',
     '1234-8765', 9),
    ('리간드와 단백질의 상호작용', '임종득', 'Protein-Ligand Interactions', '리간드와 단백질의 상호작용 메커니즘.', 'https://example.com/thesis39',
     '2024-07-15', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-18+002.png', 'Vol. 19', 'No. 7', 'pp. 77-85',
     '4567-2345', 9),
    ('단백질 구조 기반 신약 개발', '임종득', 'Drug Design Insights', '단백질 구조 기반 신약 개발 사례.', 'https://example.com/thesis49',
     '2024-10-25', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-18+003.png', 'Vol. 22', 'No. 11', 'pp. 98-107',
     '9876-1234', 9),

    -- 어재봉 관련 논문
    ('나노기술 활용 약물전달 시스템', '어재봉', 'Drug Delivery Systems', '약물전달시스템에서 나노기술 응용 사례.', 'https://example.com/thesis30',
     '2024-06-25', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-19+004.png', 'Vol. 18', 'No. 5', 'pp. 71-79',
     '4567-9087', 10),
    ('나노입자 활용 약물 전달 연구', '어재봉', 'Nanoparticle Drug Delivery', '나노입자를 활용한 약물 전달 가능성.', 'https://example.com/thesis40',
     '2024-08-12', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-19+005.png', 'Vol. 20', 'No. 9', 'pp. 87-94',
     '5678-2345', 10),
    ('차세대 약물전달 기술 연구', '어재봉', 'Advanced Drug Systems', '차세대 약물전달기술 연구.', 'https://example.com/thesis50',
     '2024-10-30', 'https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/thesis/KakaoTalk_Photo_2024-12-08-00-29-19+006.png', 'Vol. 23', 'No. 12', 'pp. 102-110',
     '2345-9087', 10);



-- Board 더미 데이터 (10개)
INSERT INTO board (title, content, view_count, writer, file_list, category)
VALUES ('2024-1학기 연계융합전공 신청 및 포기 안내', '연계융합전공 정보는 아래 링크에서 확인 가능합니다.', 31, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_02%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_02%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'employment'),
       ('세종대 김준우 학부생, 한국바이오협회 장학생 선정', '세종대학교는 김준우(바이오융합공학과22) 학생이 최근 열린 한국바이오협회 학술발표회에서 장학생으로 선발됐다고 밝혔다.', 1002, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'scholarship'),
       ('세종대 유망학과, 바이오융합공학과 정시 모집', '세종대학교 바이오융합공학과가 2025학년도 정시 모집에서 유망학과로 주목 받고 있다.', 302, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_03%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'undergraduate'),
       ('세종대 전은지 대학원생, 아이디어 공모전서 최우수상', '세종대는 세종대 전은지 대학원생이 한국연구재단이 주최한 대학(원)생 아이디어 공모전에서 최우수상을 수상했다고 밝혔다.', 140, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_04%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'graduate'),
       ('세종대 동문들의 꿈과 진로이야기!', '전은지 학생은 프린스턴 대학 대학원 박사과정에 합격하여 9월에 입학을 앞두고 있다.', 233, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'employment'),
       ('바이오분야 막강 경쟁력 자랑', '2024년 11월 20일자 뉴스에 작성된 세종대 바이오융합공학과 소개 기사입니다.', 2305, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_05%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(01%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'scholarship'),
       ('세종대 바이오융합공학과 연구개발 지원사업에 2개 과제 선정', '2024년 12월 세종소식기사입니다.', 92, '이건',
        '["https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(02%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf", "https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/dummy/%5B%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%5D+%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%A8_06%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1(03%E1%84%8E%E1%85%A1%E1%84%89%E1%85%B5).pdf"]',
        'undergraduate');


-- 세미나실 더미데이터
INSERT INTO room (name, person_capacity, place, image)
VALUES ('충507C 세미나실', 20, '충무관 507', 'seminar1.jpg'),
       ('충506C 세미나실', 20, '충무관 506', 'seminar2.jpg');


-- User 더미 데이터 (10개)
INSERT INTO users (student_id, name, major, phone, role)
VALUES ('22010321', '정석민', '바이오융합공학과', '010-4523-7819', 'USER'),
       ('22010322', '박종호', '바이오융합공학과', '010-5634-8920', 'USER'),
       ('22010323', '최병준', '바이오융합공학과', '010-6745-9031', 'USER'),
       ('22010324', '이서준', '바이오융합공학과', '010-7856-0142', 'USER'),
       ('22010325', '윤서영', '바이오융합공학과', '010-8967-1253', 'USER'),
       ('22010326', '정우진', '바이오융합공학과', '010-9178-2364', 'USER'),
       ('22010327', '한유진', '바이오융합공학과', '010-1289-3475', 'USER'),
       ('22010328', '임태환', '바이오융합공학과', '010-2390-4586', 'USER'),
       ('22010329', '서윤아', '바이오융합공학과', '010-3401-5697', 'USER'),
       ('22010330', '문준호', '바이오융합공학과', '010-4512-6708', 'USER');


INSERT INTO reservation (start_time, end_time, purpose, etc, repetition_type, room_id, user_id, created_at,
                         updated_at)
VALUES ('2024-12-01 09:00:00', '2024-12-01 11:00:00', 'MEETING', '홍성무교수님 랩미팅', 'DAILY', 1, 1, NOW(), NOW()),
       ('2024-12-01 13:00:00', '2024-12-01 15:00:00', 'MEETING', '김은희교수님 랩미팅', 'WEEKLY', 1, 2, NOW(), NOW()),
       ('2024-12-02 10:00:00', '2024-12-02 12:00:00', 'MEETING', '김민수교수님 랩미팅', 'DAILY', 1, 1, NOW(), NOW()),
       ('2024-12-03 14:00:00', '2024-12-03 16:00:00', 'MEETING', '전종훈교수님 랩미팅', 'WEEKLY', 1, 3, NOW(), NOW()),
       ('2024-12-04 09:30:00', '2024-12-04 11:30:00', 'MEETING', '서민석교수님 랩미팅', 'DAILY', 1, 2, NOW(), NOW()),
       ('2024-12-05 15:00:00', '2024-12-05 17:00:00', 'MEETING', '홍성무교수님 랩미팅', 'DAILY', 1, 3, NOW(), NOW()),
       ('2024-12-06 10:30:00', '2024-12-06 12:30:00', 'MEETING', '김은희교수님 랩미팅', 'WEEKLY', 1, 1, NOW(), NOW()),
       ('2024-12-07 13:30:00', '2024-12-07 15:30:00', 'MEETING', '김민수교수님 랩미팅', 'WEEKLY', 1, 2, NOW(), NOW()),
       ('2024-12-08 11:00:00', '2024-12-08 13:00:00', 'MEETING', '전종훈교수님 랩미팅', 'DAILY', 1, 1, NOW(), NOW()),
       ('2024-12-09 16:00:00', '2024-12-09 18:00:00', 'MEETING', '서민석교수님 랩미팅', 'DAILY', 1, 4, NOW(), NOW());