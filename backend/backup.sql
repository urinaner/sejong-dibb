-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (arm64)
--
-- Host: localhost    Database: dibb
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

-- Drop existing tables (to maintain foreign key integrity)
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `seminar`;
DROP TABLE IF EXISTS `seminar_room`;
DROP TABLE IF EXISTS `reservation`;
DROP TABLE IF EXISTS `board`;
DROP TABLE IF EXISTS `thesis`;
DROP TABLE IF EXISTS `professor`;
DROP TABLE IF EXISTS `Department`;
DROP TABLE IF EXISTS `admin_SEQ`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `UserEntity`;
DROP TABLE IF EXISTS `professor_SEQ`;

-- Admin table
CREATE TABLE `admin` (
                         `id`       bigint NOT NULL AUTO_INCREMENT,
                         `email`    varchar(255) DEFAULT NULL,
                         `login_id` varchar(255) DEFAULT NULL,
                         `password` varchar(255) DEFAULT NULL,
                         `role`     varchar(255) DEFAULT NULL,
                         `username` varchar(255) DEFAULT NULL,
                         `name`     varchar(255) DEFAULT NULL,
                         PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `admin` VALUES
                        (1, NULL, NULL, '$2a$10$fefGsD1F964M.8IoYWtHZOaW/pnfZMEnUgPhQqU0Ysh5kUlnRATse', 'ROLE_ADMIN', 'admin', NULL),
                        (2, NULL, NULL, '$2a$10$J1db/A68PsHkEtMy1O4WmuOvQLhDRsB8t3jIXTN9.2GXfd6jaU2xC', 'ROLE_ADMIN', 'admin2', NULL),
                        (3, NULL, 'admin', '$2a$10$D4cEQvhPqy0AnfuUZFdX3OmVuQIIH1V/ogfbfdOWXFpSHti3fjs72', 'ROLE_ADMIN', NULL, NULL);

-- Admin Sequence
CREATE TABLE `admin_SEQ` (
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `admin_SEQ` VALUES (51);

-- Department table
CREATE TABLE `Department` (
                              `department_id`        bigint NOT NULL AUTO_INCREMENT,
                              `educationalObjective` varchar(255) DEFAULT NULL,
                              `englishName`          varchar(255) DEFAULT NULL,
                              `intro`                varchar(255) DEFAULT NULL,
                              `koreanName`           varchar(255) DEFAULT NULL,
                              `location`             varchar(255) DEFAULT NULL,
                              `map`                  varchar(255) DEFAULT NULL,
                              `phone`                varchar(255) DEFAULT NULL,
                              `workHour`             varchar(255) DEFAULT NULL,
                              `admin_id`             bigint DEFAULT NULL,
                              PRIMARY KEY (`department_id`),
                              UNIQUE KEY `UKpbl5ktgq2g1ejptq90pxll1jw` (`englishName`),
                              UNIQUE KEY `UK7li5p5h8ai3ff9tj9llkvywib` (`koreanName`),
                              UNIQUE KEY `UKm3elt1h9rbkv9v7ngxuavlb5v` (`phone`),
                              CONSTRAINT `FKgw0wvmuysc912fvyj0fqvbi1v` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `Department` VALUES (1, NULL, NULL, NULL, '컴퓨터공학과', NULL, NULL, NULL, NULL, NULL);

-- Professor table
CREATE TABLE `professor` (
                             `professor_id`  bigint NOT NULL AUTO_INCREMENT,
                             `email`         varchar(255) DEFAULT NULL,
                             `homepage`      varchar(255) DEFAULT NULL,
                             `lab`           varchar(255) DEFAULT NULL,
                             `major`         varchar(255) DEFAULT NULL,
                             `name`          varchar(255) NOT NULL,
                             `phone`         varchar(255) DEFAULT NULL,
                             `position`      varchar(255) DEFAULT NULL,
                             `profileImage`  varchar(255) DEFAULT NULL,
                             `department_id` bigint DEFAULT NULL,
                             PRIMARY KEY (`professor_id`),
                             UNIQUE KEY `UKqjm28ojevoom770jyieljec3e` (`email`),
                             UNIQUE KEY `UK7eo9f81hj74qjpuye6jfbaw2v` (`phone`),
                             CONSTRAINT `FKbxfygu3oo3yqctlu356dyn1ds` FOREIGN KEY (`department_id`) REFERENCES `Department` (`department_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 32 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Other tables (UserEntity, seminar, thesis, board, seminar_room, reservation)

-- Seminar Room Table
CREATE TABLE `seminar_room` (
                                `seminar_room_id` BIGINT NOT NULL AUTO_INCREMENT,
                                `name` VARCHAR(255) NOT NULL,
                                `person_capacity` INT NOT NULL,
                                `place` VARCHAR(255) NOT NULL,
                                `image` VARCHAR(255),
                                PRIMARY KEY (`seminar_room_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Reservation Table
CREATE TABLE `reservation` (
                               `reservation_id` BIGINT NOT NULL AUTO_INCREMENT,
                               `start_time` DATETIME NOT NULL,
                               `end_time` DATETIME NOT NULL,
                               `purpose` VARCHAR(50) NOT NULL,
                               `etc` VARCHAR(255),
                               `repetition_type` VARCHAR(50) DEFAULT NULL,
                               `status` VARCHAR(50) NOT NULL,
                               `seminar_room_id` BIGINT,
                               `user_id` BIGINT,
                               PRIMARY KEY (`reservation_id`),
                               CONSTRAINT `FK_reservation_seminar_room` FOREIGN KEY (`seminar_room_id`) REFERENCES `seminar_room` (`seminar_room_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Continue for other tables like `thesis`, `board`, and `users`