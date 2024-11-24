-- MySQL dump 10.13  Distrib 9.0.1, for macos14.4 (arm64)
--
-- Host: localhost    Database: dibb
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `login_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,NULL,NULL,'$2a$10$fefGsD1F964M.8IoYWtHZOaW/pnfZMEnUgPhQqU0Ysh5kUlnRATse','ROLE_ADMIN','admin',NULL),(2,NULL,NULL,'$2a$10$J1db/A68PsHkEtMy1O4WmuOvQLhDRsB8t3jIXTN9.2GXfd6jaU2xC','ROLE_ADMIN','admin2',NULL),(3,NULL,'admin','$2a$10$D4cEQvhPqy0AnfuUZFdX3OmVuQIIH1V/ogfbfdOWXFpSHti3fjs72','ROLE_ADMIN',NULL,NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_SEQ`
--

DROP TABLE IF EXISTS `admin_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_SEQ` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_SEQ`
--

LOCK TABLES `admin_SEQ` WRITE;
/*!40000 ALTER TABLE `admin_SEQ` DISABLE KEYS */;
INSERT INTO `admin_SEQ` VALUES (51);
/*!40000 ALTER TABLE `admin_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Department`
--

DROP TABLE IF EXISTS `Department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Department` (
  `department_id` bigint NOT NULL AUTO_INCREMENT,
  `educationalObjective` varchar(255) DEFAULT NULL,
  `englishName` varchar(255) DEFAULT NULL,
  `intro` varchar(255) DEFAULT NULL,
  `koreanName` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `map` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `workHour` varchar(255) DEFAULT NULL,
  `admin_id` bigint DEFAULT NULL,
  PRIMARY KEY (`department_id`),
  UNIQUE KEY `UKpbl5ktgq2g1ejptq90pxll1jw` (`englishName`),
  UNIQUE KEY `UK7li5p5h8ai3ff9tj9llkvywib` (`koreanName`),
  UNIQUE KEY `UKm3elt1h9rbkv9v7ngxuavlb5v` (`phone`),
  KEY `FKgw0wvmuysc912fvyj0fqvbi1v` (`admin_id`),
  CONSTRAINT `FKgw0wvmuysc912fvyj0fqvbi1v` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Department`
--

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;
INSERT INTO `Department` VALUES (1,NULL,NULL,NULL,'컴퓨터공학과',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `professor_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL,
  `lab` varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  PRIMARY KEY (`professor_id`),
  UNIQUE KEY `UKqjm28ojevoom770jyieljec3e` (`email`),
  UNIQUE KEY `UK7eo9f81hj74qjpuye6jfbaw2v` (`phone`),
  KEY `FKbxfygu3oo3yqctlu356dyn1ds` (`department_id`),
  CONSTRAINT `FKbxfygu3oo3yqctlu356dyn1ds` FOREIGN KEY (`department_id`) REFERENCES `Department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_SEQ`
--

DROP TABLE IF EXISTS `professor_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor_SEQ` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_SEQ`
--

LOCK TABLES `professor_SEQ` WRITE;
/*!40000 ALTER TABLE `professor_SEQ` DISABLE KEYS */;
INSERT INTO `professor_SEQ` VALUES (1);
/*!40000 ALTER TABLE `professor_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserEntity`
--

DROP TABLE IF EXISTS `UserEntity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserEntity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserEntity`
--

LOCK TABLES `UserEntity` WRITE;
/*!40000 ALTER TABLE `UserEntity` DISABLE KEYS */;
INSERT INTO `UserEntity` VALUES (1,'$2a$10$LfeIIvfSFD.soW/trPo0Y.CdxqMP5rycveWYyTXs2SByv5wcOgDBO','ROLE_ADMIN','admin'),(2,'$2a$10$yboxd7jGWBm7rVufr4B/3.Vu9aB1QvmXxWHwgcMNHWrUqAA.hTHay','ROLE_ADMIN','admin2');
/*!40000 ALTER TABLE `UserEntity` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11 16:04:22

-- Seminar 테이블 생성
CREATE TABLE IF NOT EXISTS `seminar` (
  `seminar_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `writer` varchar(255) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `speaker` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  PRIMARY KEY (`seminar_id`),
  KEY `FK_seminar_department` (`department_id`),
  CONSTRAINT `FK_seminar_department` FOREIGN KEY (`department_id`) REFERENCES `Department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Thesis 테이블 생성
CREATE TABLE IF NOT EXISTS `thesis` (
  `thesis_id` bigint NOT NULL AUTO_INCREMENT,
  `author` varchar(255) DEFAULT NULL,
  `journal` varchar(255) DEFAULT NULL,
  `content` text,
  `link` varchar(255) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `thesis_image` varchar(255) DEFAULT NULL,
  `publication_collection` varchar(255) DEFAULT NULL,
  `publication_issue` varchar(255) DEFAULT NULL,
  `publication_page` varchar(255) DEFAULT NULL,
  `issn` varchar(20) DEFAULT NULL,
  `professor_id` bigint DEFAULT NULL,
  PRIMARY KEY (`thesis_id`),
  KEY `FK_thesis_professor` (`professor_id`),
  CONSTRAINT `FK_thesis_professor` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`professor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Board 테이블 생성
CREATE TABLE IF NOT EXISTS `board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `view_count` int DEFAULT '0',
  `writer` varchar(255) DEFAULT NULL,
  `fileList` TEXT DEFAULT NULL,
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(50) DEFAULT NULL,
  `department_id` bigint DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FK_board_department` (`department_id`),
  CONSTRAINT `FK_board_department` FOREIGN KEY (`department_id`) REFERENCES `Department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
