/*

SQLyog Ultimate v8.55 
MySQL - 5.5.5-10.1.32-MariaDB : Database - smc-webassistdb

*********************************************************************

*/
CREATE DATABASE /*!32312 IF NOT EXISTS*/`smc-webassistdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `smc-webassistdb`;

/*Table structure for table `categories` */
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `categoryId` int(10) NOT NULL AUTO_INCREMENT,
  `categoryTitle` text,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `conversations` */
DROP TABLE IF EXISTS `conversations`;
CREATE TABLE `conversations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `enrolledids` */
DROP TABLE IF EXISTS `enrolledids`;
CREATE TABLE `enrolledids` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `student_id` text,
  `student_name` text,
  `student_course` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `feedbacks` */
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks` (
  `feedID` int(10) NOT NULL AUTO_INCREMENT,
  `feedbackUID` text,
  `feedbackTitle` text,
  `feedbackDesc` text,
  `feedbackFile` blob,
  `feedbackStatus` tinyint(1) NOT NULL DEFAULT '1',
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `files` */
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL,
  `mimetype` varchar(100) DEFAULT NULL,
  `data` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Table structure for table `messages` */
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `tickets` */
DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets` (
  `tktID` int(10) NOT NULL AUTO_INCREMENT,
  `tktUID` text,
  `tktBuildCat` text,
  `tktInqCat` text,
  `tktOwner` text,
  `tktOwnerDBid` text,
  `tktSubj` text,
  `tktDesc` text,
  `tktTimestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tktFile` blob,
  `tktStatus` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`tktID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

/*Table structure for table `users` */
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `username` text,
  `stud_id` text,
  `email` text,
  `password` text,
  `user_timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_status` tinyint(1) DEFAULT '1',
  `token` text,
  `user_level` int(10) DEFAULT '1',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;