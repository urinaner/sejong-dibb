-- 예약 슬롯 테이블
CREATE TABLE IF NOT EXISTS slot
(
    slot_id               BIGINT NOT NULL AUTO_INCREMENT,
    room_id               BIGINT NOT NULL,
    reservation_id        BIGINT,
    start_time            DATETIME NOT NULL,
    end_time              DATETIME NOT NULL,
    created_date          DATETIME,
    updated_date          DATETIME,
    PRIMARY KEY (slot_id),
    FOREIGN KEY (room_id) REFERENCES room (room_id),
    FOREIGN KEY (reservation_id) REFERENCES reservation (reservation_id)
) ENGINE = InnoDB
DEFAULT CHARSET = utf8mb4;

