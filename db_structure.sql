# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: mysql1.it.nuigalway.ie (MySQL 5.7.33-0ubuntu0.18.04.1-log)
# Database: mydb3940
# Generation Time: 2021-04-29 21:55:58 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table accounts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `accounts`;

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compound_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `provider_type` varchar(255) NOT NULL,
  `provider_id` varchar(255) NOT NULL,
  `provider_account_id` varchar(255) NOT NULL,
  `refresh_token` text,
  `access_token` text,
  `access_token_expires` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `compound_id` (`compound_id`),
  KEY `provider_account_id` (`provider_account_id`),
  KEY `provider_id` (`provider_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table lesson_completions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lesson_completions`;

CREATE TABLE `lesson_completions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `lesson` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`,`lesson`),
  KEY `lesson` (`lesson`),
  CONSTRAINT `lesson_completions_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lesson_completions_ibfk_2` FOREIGN KEY (`lesson`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table lesson_parts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lesson_parts`;

CREATE TABLE `lesson_parts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson` int(11) NOT NULL,
  `content` text NOT NULL,
  `type` enum('proceed','yesNo','endOfLesson') NOT NULL DEFAULT 'proceed',
  `proceedTo` int(11) DEFAULT NULL,
  `onYes` int(11) DEFAULT NULL,
  `onNo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lesson` (`lesson`),
  KEY `proceedTo` (`proceedTo`),
  KEY `onYes` (`onYes`),
  KEY `onNo` (`onNo`),
  CONSTRAINT `lesson_parts_ibfk_1` FOREIGN KEY (`lesson`) REFERENCES `lessons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lesson_parts_ibfk_2` FOREIGN KEY (`proceedTo`) REFERENCES `lesson_parts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lesson_parts_ibfk_3` FOREIGN KEY (`onYes`) REFERENCES `lesson_parts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lesson_parts_ibfk_4` FOREIGN KEY (`onNo`) REFERENCES `lesson_parts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table lessons
# ------------------------------------------------------------

DROP TABLE IF EXISTS `lessons`;

CREATE TABLE `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT '',
  `title` varchar(255) NOT NULL,
  `description` text,
  `firstPart` int(11) DEFAULT NULL,
  `nextLesson` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `topic` (`topic`),
  KEY `firstPart` (`firstPart`),
  KEY `nextLesson` (`nextLesson`),
  CONSTRAINT `lessons_ibfk_1` FOREIGN KEY (`topic`) REFERENCES `topics` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lessons_ibfk_2` FOREIGN KEY (`firstPart`) REFERENCES `lesson_parts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lessons_ibfk_3` FOREIGN KEY (`nextLesson`) REFERENCES `lessons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table sessions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `expires` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `session_token` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_token` (`session_token`),
  UNIQUE KEY `access_token` (`access_token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table topics
# ------------------------------------------------------------

DROP TABLE IF EXISTS `topics`;

CREATE TABLE `topics` (
  `id` varchar(255) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` mediumtext,
  `firstLesson` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `firstLesson` (`firstLesson`),
  CONSTRAINT `topics_ibfk_1` FOREIGN KEY (`firstLesson`) REFERENCES `lessons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table verification_requests
# ------------------------------------------------------------

DROP TABLE IF EXISTS `verification_requests`;

CREATE TABLE `verification_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
