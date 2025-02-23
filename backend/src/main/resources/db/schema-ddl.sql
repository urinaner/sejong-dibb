-- TODO(sigmaith): 엔티티 변경이 더 이상 일어나지 않을 시점에 ddl 스크립트 작성
-- 운영(배포) 환경에서는 명시적인 스키마 관리(DDL 스크립트나 마이그레이션 도구)가 권장됨
-- 이유 1: ddl-auto=update로 운영 DB를 갱신하면, JPA 엔티티 구조 변경 시 어떤 DDL이 실행될지 명시적으로 관리하기 어렵습니다.
-- 이유 2: 컬럼 이름 변경, 제약조건 추가/삭제 등에서 예기치 않은 에러나 데이터 손실이 발생할 수 있습니다.
-- CREATE TABLE IF NOT EXISTS 형태로 작성해야 에러 없이 재실행 가능

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