# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: mysql1.it.nuigalway.ie (MySQL 5.7.33-0ubuntu0.18.04.1-log)
# Database: mydb3940
# Generation Time: 2021-04-29 23:44:52 +0000
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

LOCK TABLES `lesson_completions` WRITE;
/*!40000 ALTER TABLE `lesson_completions` DISABLE KEYS */;

INSERT INTO `lesson_completions` (`id`, `user`, `lesson`)
VALUES
	(4,1,0);

/*!40000 ALTER TABLE `lesson_completions` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `lesson_parts` WRITE;
/*!40000 ALTER TABLE `lesson_parts` DISABLE KEYS */;

INSERT INTO `lesson_parts` (`id`, `lesson`, `content`, `type`, `proceedTo`, `onYes`, `onNo`)
VALUES
	(1,0,'This is an example lesson. It is used to demonstrate the features available for lessons in Conversant.','proceed',2,NULL,NULL),
	(2,0,'In Conversant, lesson parts are stored in the database as markdown text. They are then rendered on-the-fly by the client. Conversant supports all features of common mark, and Github flavoured markdown.','proceed',3,NULL,NULL),
	(3,0,'Example: _Italic text_.','proceed',4,NULL,NULL),
	(4,0,'Example: **Bold text**.','proceed',5,NULL,NULL),
	(5,0,'Example: [Link to example.com](http://example.com).','proceed',6,NULL,NULL),
	(6,0,'Example: ~strikethrough text~','proceed',7,NULL,NULL),
	(7,0,'Example: blockquote.\n\n> Hello, World!','proceed',8,NULL,NULL),
	(8,0,'Example: ordered list:\n1. ordered item 1,\n2. ordered item 2,\n3. ordered item 3,\n\nExample: unordered list:\n* list item 1\n* list item 2\n* list item 3','proceed',9,NULL,NULL),
	(9,0,'Example: `inline code`.\n\nExample: code block\n\n```typescript\nconst i = \"am a code block\";\nvar a = 1 + 3;\n```\n','proceed',10,NULL,NULL),
	(10,0,'Example: Headers 1-6\n\n# Header 1\n\n## Header 2\n\n### Header 3\n\n#### Header 4\n\n##### Header 5\n\n###### Header 6\n\n','proceed',11,NULL,NULL),
	(11,0,'Example: inline math, $x^y = z_q$.\n\nExample: math block\n$$$\ne^{i \\pi} - 1 = 0\n$$$','proceed',12,NULL,NULL),
	(12,0,'Example: Image\n\n![Image](https://getconversant.io/icons/logo-128.png)','proceed',13,NULL,NULL),
	(13,0,'Example: Check list\n- [x] checked\n- [ ] unchecked\n- [x] checked again\n','proceed',14,NULL,NULL),
	(14,0,'Example: Table\n\n| a | b  |  c |  d  |\n| - | :- | -: | :-: |\n| 1 | 2 | 3 | 4 |','proceed',15,NULL,NULL),
	(15,0,'And that\'s about it!','endOfLesson',NULL,NULL,NULL);

/*!40000 ALTER TABLE `lesson_parts` ENABLE KEYS */;
UNLOCK TABLES;


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

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;

INSERT INTO `lessons` (`id`, `topic`, `title`, `description`, `firstPart`, `nextLesson`)
VALUES
	(0,'example','Example Lesson','See all the wonderful features that lessons in Conversant can offer.',1,NULL);

/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sessions
# ------------------------------------------------------------

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

LOCK TABLES `topics` WRITE;
/*!40000 ALTER TABLE `topics` DISABLE KEYS */;

INSERT INTO `topics` (`id`, `label`, `description`, `firstLesson`)
VALUES
	('example','Example Topic','This is an example topic created to store a sample lesson for the purposes of demonstrating the Conversant platform.',0);

/*!40000 ALTER TABLE `topics` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

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
