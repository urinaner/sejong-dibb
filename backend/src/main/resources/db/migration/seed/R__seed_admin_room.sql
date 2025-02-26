-- users 더미 데이터
INSERT IGNORE INTO users (users_id, login_id, password, username, email, phoneN, role)
VALUES (1, 'admin', '$2a$10$FKHTTHcEkAZZGW9XqGtPfOx.apKljbCLvYESM05YbLWzDynnacLPO', '관리자', 'admin@example.com',
        '010-1234-5678', 'ROLE_ADMIN');

-- 세미나실 더미데이터
INSERT IGNORE INTO room (room_id, name, person_capacity, place, image)
VALUES (1, '충507C 세미나실', 20, '충무관 507', 'seminar1.jpg'),
       (2, '충506C 세미나실', 20, '충무관 506', 'seminar2.jpg');