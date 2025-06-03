/*
SQLyog Ultimate v8.55 
MySQL - 5.5.5-10.1.32-MariaDB : Database - smc-webassistdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`smc-webassistdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `smc-webassistdb`;

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `categoryId` int(10) NOT NULL AUTO_INCREMENT,
  `categoryTitle` text,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `categories` */

insert  into `categories`(`categoryId`,`categoryTitle`) values (1,'School Resources'),(2,'Institutional Functionality'),(3,'School Policies & Governance'),(4,'School Environment & Infrastructure'),(5,'Student\'s Well-being & Stressors'),(6,'Equality & Fairness'),(7,'Inquire'),(8,'Other School Matter'),(9,'About Truck Van');

/*Table structure for table `conversations` */

DROP TABLE IF EXISTS `conversations`;

CREATE TABLE `conversations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `conversations` */

/*Table structure for table `enrolledids` */

DROP TABLE IF EXISTS `enrolledids`;

CREATE TABLE `enrolledids` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `student_id` text,
  `student_name` text,
  `student_course` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4;

/*Data for the table `enrolledids` */

insert  into `enrolledids`(`id`,`student_id`,`student_name`,`student_course`) values (1,'2024-7-97','ABDULLA, YASER SALASA','BSCPE'),(2,'2023-7-1195','ACEDO, MELJUNE LIBRE','BSCPE'),(3,'2023-7-309','AMOMONPON, IAN FAITH PAULIN','BSCPE'),(4,'2021-8-700','ANTIPALA, KATRINA BONTOG','BSCPE'),(5,'2024-7-395','ARANGES, FRANZEN JAY ROSALES','BSCPE'),(6,'2021-7-1047','ARCAYOS, CHRISTIAN PAUL MONEDA','BSCPE'),(7,'2024-7-1125','ASDALI, ABDUSALI AGCONG','BSCPE'),(8,'2021-8-29','ATES, EARL JANE CALUNOD','BSCPE'),(9,'2023-7-1018','BALATUCAL, NORHAJANA MANTOLINO','BSCPE'),(10,'2024-7-773','BALOYO, JAMES BEATRIX BELZA','BSCPE'),(11,'2023-7-310','BAUTISTA, ANALYN CRUZ','BSCPE'),(12,'2024-7-551','BELLAN, YSHAI OCAÑA','BSCPE'),(13,'2023-7-460','BERJENO, ELIEZA SALAMAT','BSCPE'),(14,'2023-7-871','BOAQUIÑA, PRINCE CEDRIC DILAO','BSCPE'),(15,'2021-0002','BONGCAWIL, ALYN GRACE LANADA','BSCPE'),(16,'2023-8-211','BUCOG, KLENT JEM ESTRADA','BSCPE'),(17,'2023-7-1181','BUDAY, ANTHONY JUSTINE GALE ACOTANZA','BSCPE'),(18,'2022-7-1071','BUSCAINO, KRIS ADRIAN PALANAS','BSCPE'),(19,'2021-7-786','CALABRIA, KHERBE JHON CADONDOY','BSCPE'),(20,'2020-1061','CARRILLO, RAYAN ADOC','BSCPE'),(21,'2023-7-909','CASANES, PRINCESS REABELLE BEBANGCO','BSCPE'),(22,'2024-7-892','CRUZ, DANIEL BAYADOG','BSCPE'),(23,'2024-7-687','CUBA, VIRGIL GERODIAS','BSCPE'),(24,'2022-7-117','DIASANA, JOEM FABRIGA','BSCPE'),(25,'2022-7-334','DILAO, LORENS RUBIO','BSCPE'),(26,'2021-1-933','DIMAIN, DARYL PAYABYAB','BSCPE'),(27,'2021-5-1501','DIRIGE, VINCENT JAMES BORNEA','BSCPE'),(28,'2023-7-220','4 DUHILAG, SEAN CLARENCE CAMPOS','BSCPE'),(29,'2024-7-709','EBORAN, MYLES DIALAGDON','BSCPE'),(30,'2023-7-927','EUDELLA, MICHAEL MAGAMAY','BSCPE'),(31,'2022-7-135','FERNANDEZ, JAYPEE ANDREI JUMANTO','BSCPE'),(32,'2024-7-114','FLORENDO, REYMAR NARCISO','BSCPE'),(33,'2024-7-474','GABO, KENT CHRYSLER TAGALOGON','BSCPE'),(34,'2023-7-1400','GALLO, ALLEN VIADOR','BSCPE'),(35,'2023-7-1158','GASPAR, SHEIKAH MILES LARUBIS','BSCPE'),(36,'2024-7-171','GAVENIA, JIRON RROJ BACHILLER','BSCPE'),(37,'2023-8-123','GOMEZ, RHONNIEL IVANNE YBAÑEZ','BSCPE'),(38,'2021-7-1406','LADANG, JUNRIL ANDAN','BSCPE'),(39,'2022-7-922','LOPEZ, CHRISTIAN JAY RECITAS','BSCPE'),(40,'2022-7-20','MACALISANG, HAMMERAH LEE ALCAZARIN','BSCPE'),(41,'2016-1534','MACAUMBOS, ARTHUR ANIVERSARIO','BSCPE'),(42,'2021-8-272','MADELO, RENJEL ROSE LABRADOR','BSCPE'),(43,'2022-7-247','MAGHANOY, JOHN LOYD SUMALPONG','BSCPE'),(44,'2022-8-310','MAGLANGIT, CHRISTEPHENE JHON ALBELDA','BSCPE'),(45,'2021-7-837','MAGLANGIT, LAVELIAH DEL ROSARIO','BSCPE'),(46,'2021-8-44','MANSUETO, FRESHYLLE GWENN ROCAMORA','BSCPE'),(47,'2021-8-49','MARIBONG, CHRISTIAN JADE TAYROS','BSCPE'),(48,'2024-7-490','MAROHOM, JADED KAILASH MALAYAS','BSCPE'),(49,'2023-7-468','MIMBALAWAG, MUHIDEN DIMASINDEL','BSCPE'),(50,'2022-8-450','MINOZA, ANA LEAH MALAUBANG','BSCPE'),(51,'2024-7-1198','MONIB, FAIRUDZ MUSTAPHA','BSCPE'),(52,'2021-8-12','MUYONG, ALFHADZ USOP','BSCPE'),(53,'2023-1-212','MZHER, ODHAI SARAEL','BSCPE'),(54,'2024-6-1155','NACARIO, DIRK DWYANE LAMBO','BSCPE'),(55,'2022-7-262','NOBLEZA, KIAN CARL BANSALAO','BSCPE'),(56,'2024-7-927','OBENZA, CHARLES GABRIEL GUILLAR','BSCPE'),(57,'2023-7-965','OCHAGABIA, ANGEL GRACE PRIETO','BSCPE'),(58,'2024-7-798','ORIEL, PHILIP RENIEL ABENOJA','BSCPE'),(59,'2021-8-849','ORTEGA, JOHN PAUL BELOCURA','BSCPE'),(60,'2023-8-265','PACATANG, LEANNA KHRISHA EJARA','BSCPE'),(61,'2021-8-281','PAGAYAO, AISHAH TUBALLA','BSCPE'),(62,'2024-7-553','PALABRICA, KIETH ANTHONY LACHICA','BSCPE'),(63,'2022-8-280','PANANGITAN, RENE MIGUEL MACALOLOOY','BSCPE'),(64,'2022-7-246','PARAS, KEENE GEOFFREY DIMPAS','BSCPE'),(65,'2024-7-984','PARRA, KIETHLY YADAO','BSCPE'),(66,'2024-7-795','PASTIDIO, LAURENCE CLAIRE FADRI','BSCPE'),(67,'2022-7-807','PELARCA, KRIZZEL GEICHA CHAVEZ','BSCPE'),(68,'2024-7-160','POBLADOR, FREDRICK CARL MELICOR','BSCPE'),(69,'2023-7-1282','POLIGRATES, ANDREW LEE GHLEEN TOMPONG','BSCPE'),(70,'2021-8-1437','QUEZON, JOHN PAUL POGAJA','BSCPE'),(71,'2023-7-583','QUEZON, JOSEPH POGAJA','BSCPE'),(72,'2022-8-11','RELOS, JUSTINE PAUL DELAGAN','BSCPE'),(73,'2023-7-1139','RIVERA, MARC DAN NIEL RAMOS','BSCPE'),(74,'2024-1-108','RUIZ, SMOOTH NATE CAMUS','BSCPE'),(75,'2023-7-1204','SAAVEDRA, RENZBY COLIN PARARUAN','BSCPE'),(76,'2024-7-712','SALCEDO, ROLAND ALEJO JR.','BSCPE'),(77,'2023-8-126','SALINAS, ARJONES ANGCAY','BSCPE'),(78,'2023-7-923','SAMIJON, MARY CLAIRE DEL VALLE','BSCPE'),(79,'2024-7-719','SANCHEZ, KIAN CLINT LECONG','BSCPE'),(80,'2024-7-966','SELIM, MA. JIANNE KYLA CAMPOREDONDO','BSCPE'),(81,'2024-7-493','SHIVELY, AURELIO VEST GUTANA','BSCPE'),(82,'2023-7-1326','SILVA, ANGELICA PRINCESS GAAN','BSCPE'),(83,'2023-7-1214','SORDILLA, JUSTINE JAY NAMOCATCAT','BSCPE'),(84,'2022-7-35','SUBIDO, ARJAY DEN LABAJOSA','BSCPE'),(85,'2023-7-1019','SUGANOB, HYZIEL SARCENA','BSCPE'),(86,'2022-7-578','SURBAN, JIMMY JAMILI JR','BSCPE'),(87,'2024-7-1101','TAMPAL, CLIFF HOWELL CAGAS','BSCPE'),(88,'2024-7-1284','TECHO, CHARISE MAE RAPIRAP','BSCPE'),(89,'2021-8-998','TEÑAFLOR, KIAN LIOYD QUITAYEN','BSCPE'),(90,'2023-7-581','TINGCANG, ANNELKHA BARTIANA','BSCPE'),(91,'2021-7-797','TOLEDO, DRAZILLE KNIGHT TAMAYO','BSCPE'),(92,'2024-8-461','TORMIS, GLORY VIE DANGAN','BSCPE'),(93,'2024-7-489','USOP, JASMIN TAHER','BSCPE'),(94,'2022-8-366','VELONTA, JASPHER DELA CRUZ','BSCPE'),(95,'2024-7-1072','VIADOR, JHASPER JHAMES PEDROZA','BSCPE'),(100,'E-001','Engineering Admin','Admin'),(101,'E-002','Engineering Admin','Admin'),(102,'C-001','College Admin','Admin'),(103,'SMC-001','SMC Head Admin','Head Admin');

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

/*Data for the table `feedbacks` */

insert  into `feedbacks`(`feedID`,`feedbackUID`,`feedbackTitle`,`feedbackDesc`,`feedbackFile`,`feedbackStatus`,`dateCreated`) values (1,'52','first feedback?','fIRST dasdkas odsakdo sakdos d','',1,'2025-04-13 21:23:56'),(2,'52','a','a','C:\\fakepath\\AnyDesk.exe',1,'2025-04-27 01:41:28'),(3,'52','Last Feedback','some descriptions','',1,'2025-05-02 01:23:19'),(4,'52','Last2 Feedback','asdasdsa dasd sads das dasd asdasdasdsa dasd sads das dasd asdasdasdsa dasd sads das dasd asdasdasdsa dasd sads das dasd asdasdasdsa dasd sads das dasd asdasdasdsa dasd sads das dasd asdasdasdsa dasd sads das dasd asdasdasdsa dasd sads das dasd asd','',1,'2025-05-02 01:25:29'),(5,'52','file feeds','uploading files','C:\\fakepath\\check.png',1,'2025-05-03 02:27:38'),(6,'52','viedo','asd','C:\\fakepath\\Mickey.17.2025.2160p.HDR10Plus.DV.WEBRip.DDP5 1.Atmos.X265.HEVC-PSA.mkv',1,'2025-05-04 00:39:26');

/*Table structure for table `files` */

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL,
  `mimetype` varchar(100) DEFAULT NULL,
  `data` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `files` */

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

/*Data for the table `messages` */

insert  into `messages`(`id`,`ticket_id`,`sender_id`,`content`,`sent_at`) values (1,4,4,'ffirstt reply','2025-05-08 23:44:28'),(2,4,4,'another 1','2025-05-08 23:44:41'),(3,4,4,'another 2','2025-05-08 23:46:04'),(4,4,4,'longer window','2025-05-08 23:46:15'),(5,4,4,'longer 1','2025-05-08 23:46:24'),(6,4,4,'even longer 1','2025-05-08 23:46:37'),(7,4,4,'another and last reply','2025-05-08 23:49:26'),(8,4,4,'sending reply','2025-05-09 00:22:23'),(9,4,4,'another reply','2025-05-09 00:23:18'),(10,4,4,'testing notification','2025-05-09 00:35:10'),(11,3,4,'Testing reply','2025-05-09 00:36:52'),(12,3,4,'testing','2025-05-09 00:39:46'),(13,3,4,'test','2025-05-09 00:41:15'),(14,3,3,'im the author','2025-05-09 00:45:18'),(15,3,4,'im the admin','2025-05-09 00:45:52'),(16,4,4,'replying','2025-05-09 01:31:26'),(17,4,4,'attempt 2','2025-05-09 01:31:56'),(18,1,3,'reply','2025-05-09 01:32:42'),(19,5,3,'testing reply','2025-05-09 01:35:49'),(20,2,4,'testing reply','2025-05-10 10:03:35'),(21,20,3,'authors reply','2025-05-10 11:03:07'),(22,1,3,'testt reply','2025-05-13 11:40:46'),(23,1,3,'reli','2025-05-13 11:41:13'),(24,1,3,'asd','2025-05-13 11:41:27'),(25,1,3,'asd','2025-05-13 11:41:43'),(26,1,3,'asd','2025-05-13 11:42:35'),(27,1,3,'asd','2025-05-13 11:42:42'),(28,1,3,'1231231232131231232123123123213213123213123213333123123123123123213213123123','2025-05-13 11:43:01'),(29,1,3,'asd, a;lsdkas;l dasdk ;alsdk a;lsdka;l dka;lsdk als;dk al;sdk a;lsdka;sldaskdjaslkdhjaksldkasgdkjhdgfhjsd gfsdhjfg uyfgwef fosd ywe ru','2025-05-13 11:43:23'),(30,4,2,'attempt 4','2025-05-14 20:14:58');

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

/*Data for the table `tickets` */

insert  into `tickets`(`tktID`,`tktUID`,`tktBuildCat`,`tktInqCat`,`tktOwner`,`tktOwnerDBid`,`tktSubj`,`tktDesc`,`tktTimestamp`,`tktFile`,`tktStatus`) values (1,'1','b2','6','Drazille Knight T. Toledo','2021-7-797','first ticket','some description about my first ticket','2025-05-08 12:45:46',NULL,3),(2,'1','b1','1','Drazille Knight T. Toledo','2021-7-797','2nd ticket','some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket some more dsecription about my 2nd ticket ','2025-05-08 12:46:21',NULL,1),(3,'1','b3','3','Drazille Knight T. Toledo','2021-7-797','3rd inquiry','some more dsecription about my 3rd ticket some more dsecription about my 3rd ticket ','2025-05-08 12:46:46',NULL,1),(4,'1','b1','3','Drazille Knight T. Toledo','2021-7-797','sample Ticket','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 16:47:59',NULL,1),(5,'1','b2','2','Drazille Knight T. Toledo','2021-7-797','Sample ticket','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 16:48:12',NULL,1),(6,'1','b3','7','Drazille Knight T. Toledo','2021-7-797','Sample Ticekt','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 16:48:22',NULL,2),(7,'1','b4','5','Drazille Knight T. Toledo','2021-7-797','Sample Ticket','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 16:48:35',NULL,3),(8,'1','b2','8','Drazille Knight T. Toledo','2021-7-797','Sample Ticekt','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 16:48:48',NULL,1),(9,'1','b2','2','Drazille Knight T. Toledo','2021-7-797','Sample Ticekt','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 16:49:00',NULL,1),(10,'1','b2','6','Drazille Knight T. Toledo','2021-7-797','Sample Ticket','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 16:49:13',NULL,1),(11,'1','b2','1','Drazille Knight T. Toledo','2021-7-797','Sample Ticekt','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 16:49:30',NULL,1),(12,'4','b1','1','admin','0000-0-000','Sample ticket','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 17:10:03',NULL,1),(13,'4','b1','2','admin','0000-0-000','Sample','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 17:10:12',NULL,1),(14,'4','b1','8','admin','0000-0-000','Sample','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 17:10:26',NULL,1),(15,'4','b3','8','admin','0000-0-000','sample ticket','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 17:10:43',NULL,1),(16,'4','b3','6','admin','0000-0-000','sample ticket','Sweet candy cupcake soufflé lemon drops donut shortbread cheesecake. Sesame snaps candy liquorice sugar plum cookie lemon drops cake oat cake gingerbread. Sesame snaps tart jujubes jelly beans oat cake caramels. Chocolate soufflé cake danish cake. Dessert jelly tootsie roll candy carrot cake candy canes macaroon macaroon tiramisu.','2025-05-08 17:10:53',NULL,3),(17,'4','b4','2','admin','0000-0-000','Annex Sample Ticket','Fruitcake cupcake pastry jelly-o oat cake jelly-o donut. Pudding chocolate cake icing chocolate cake macaroon topping jelly powder icing. Jelly beans chupa chups jelly beans jelly-o pudding soufflé jujubes cookie. Marshmallow cheesecake muffin cake tart donut bear claw bonbon marzipan.','2025-05-08 17:43:13',NULL,1),(18,'4','b1','3','admin','0000-0-000','Sample','some description','2025-05-08 18:58:07',NULL,3),(19,'4','b1','1','admin','0000-0-000','Sample','some description','2025-05-08 19:00:57',NULL,3),(20,'1','b2','7','Drazille Knight T. Toledo','2021-7-797','Inquiring about the Policy','some description about the school policy some description about the school policy some description about the school policy some description about the school policy some description about the school policy some description about the school policy some description about the school policy some description about the school policy some description about the school policy some description about the school policy','2025-05-10 11:00:51',NULL,1),(21,'1','b2','3','Drazille Knight T. Toledo','2021-7-797','asd','asd','2025-05-13 11:40:07',NULL,1);

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

/*Data for the table `users` */

insert  into `users`(`uid`,`username`,`stud_id`,`email`,`password`,`user_timestamp`,`user_status`,`token`,`user_level`) values (1,'Kevin','E-001','dummy@mail.com','asd','2025-05-14 23:45:12',1,'eyJhbGciOiJIUzI1NiJ9.S2V2aW4.U0rFG19e0Ny07dnBsA1dvUBkxKBNDhcwgyyj43gUAWU',4),(2,'Lucas','E-002','dummy@mail.com','asd','2025-05-14 23:46:07',1,'eyJhbGciOiJIUzI1NiJ9.THVjYXM.x2pSDuFl-PCCtVtdTFqgzF4ReNjUM89lBmfxNA3NtIw',4),(3,'John','C-001','dummy@mail.com','asd','2025-05-14 23:46:42',1,'eyJhbGciOiJIUzI1NiJ9.Sm9obg.66ib5n1Grqgocfam86iCMenYcBlIeoTZgEDp8UtAK-s',5),(4,'Hofilena','SMC-001','dummy@mail.com','asd','2025-05-14 23:48:38',1,'eyJhbGciOiJIUzI1NiJ9.SG9maWxlbmE.mkJm1EtqhCJSwarNAgJyTe-Y7yxjH40Yu4qzXZ35UVI',8),(5,'Drazille','2021-7-797','drazilletoledo@gmail.com','asd','2025-05-14 23:49:52',1,'eyJhbGciOiJIUzI1NiJ9.RHJhemlsbGU.pIQJsYuTM7QQoB5FutDCHPSglb5FS_AXKgAhDselM0M',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
