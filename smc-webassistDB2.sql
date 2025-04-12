/*
SQLyog Ultimate v8.55 
MySQL - 5.5.5-10.4.32-MariaDB : Database - smc-webassistdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`smc-webassistdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `smc-webassistdb`;

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `categoryId` int(10) NOT NULL AUTO_INCREMENT,
  `categoryTitle` text DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categories` */

insert  into `categories`(`categoryId`,`categoryTitle`) values (1,'About Banana'),(2,'About Gorilla'),(3,'About Monkeys'),(4,'About Jungles'),(5,'About Orangutans'),(6,'About SkyScrapers'),(7,'About Logics'),(8,'About Cargo'),(9,'About Truck Van');

/*Table structure for table `conversations` */

DROP TABLE IF EXISTS `conversations`;

CREATE TABLE `conversations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `conversations` */

/*Table structure for table `feedbacks` */

DROP TABLE IF EXISTS `feedbacks`;

CREATE TABLE `feedbacks` (
  `feedID` int(10) NOT NULL AUTO_INCREMENT,
  `feedbackUID` text DEFAULT NULL,
  `feedbackTitle` text DEFAULT NULL,
  `feedbackDesc` text DEFAULT NULL,
  `feedbackFile` blob DEFAULT NULL,
  `feedbackStatus` tinyint(1) NOT NULL DEFAULT 1,
  `dateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`feedID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `feedbacks` */

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `messages` */

insert  into `messages`(`id`,`ticket_id`,`sender_id`,`content`,`sent_at`) values (1,1,8,'Thanks for your help!','2025-04-11 23:15:39'),(2,NULL,52,'msgBox.value','2025-04-12 00:35:23'),(3,NULL,52,'msgBox.value','2025-04-12 00:35:51'),(4,NULL,52,'123 123 123 1223 123','2025-04-12 00:37:01'),(5,NULL,52,'123 123 123 1223 123','2025-04-12 00:37:11'),(6,NULL,52,'123 123 123 1223 123','2025-04-12 00:45:45'),(7,NULL,52,'123 123 123 1223 123','2025-04-12 00:46:18'),(8,NULL,52,'123 123 123 1223 123','2025-04-12 00:46:38'),(9,NULL,52,'asd asd asd asd','2025-04-12 00:47:20'),(10,1,52,'asdasd asd asd asd asdasdsad asd','2025-04-12 00:47:35'),(11,1,52,'lklk lklk lklklkl kllk lklk lk lklk','2025-04-12 00:49:51'),(12,0,1,'hellow','2025-04-12 00:58:59'),(13,14,52,'lololololololo','2025-04-12 01:26:20'),(14,14,52,'lololololololololololololololololololololo','2025-04-12 01:26:48'),(15,14,52,'asdasdsadsdasdasda 123 123 123 12 123 123','2025-04-12 01:26:54');

/*Table structure for table `tickets` */

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE `tickets` (
  `tktID` int(10) NOT NULL AUTO_INCREMENT,
  `tktUID` text DEFAULT NULL,
  `tktCategoryID` text DEFAULT NULL,
  `tktOwner` text DEFAULT NULL,
  `tktOwnerDBid` text DEFAULT NULL,
  `tktSubj` text DEFAULT NULL,
  `tktDesc` text DEFAULT NULL,
  `tktTimestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `tktFile` blob DEFAULT NULL,
  `tktStatus` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`tktID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tickets` */

insert  into `tickets`(`tktID`,`tktUID`,`tktCategoryID`,`tktOwner`,`tktOwnerDBid`,`tktSubj`,`tktDesc`,`tktTimestamp`,`tktFile`,`tktStatus`) values (1,'14','1','Jack','1233-3123-311','Jack the nimble','I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick I am jack the nimble, jack be quick ','2025-03-21 20:02:41',NULL,1),(2,'14','8','Jack','1233-3123-311','Jackie Chans opinion','ivamus sollicitudin elit et nisi pellentesque pretium id at augue. Pellentesque dignissim eros nec aliquam tristique. Morbi sit amet pharetra tortor. In nisi libero, euismod vel hendrerit et, feugiat eu nulla. Aliquam ut gravida lorem. Donec in pharetra mauris. Nam luctus magna id massa finibus pulvinar. Sed ornare accumsan ipsum, vel imperdiet lacus sollicitudin accumsan.','2025-03-21 20:04:57',NULL,1),(3,'14','5','Jack','1233-3123-311','Cookies','neque id ligula dapibus vehicula. Quisque fermentum orci magna, eu malesuada nibh aliquam eleifend. Morbi blandit nisi id eros consectetur volutpat. Mauris eleifend turpis nibh, et tincidunt libero efficitur in. Sed quis nunc pulvinar, viverra nibh sed, volutpat nibh. Phasellus aliquet scelerisque massa. Sed feugiat mollis egestas.','2025-03-21 20:05:13',NULL,1),(4,'14','5','Jack','1233-3123-311','Cheese Cakes','A cookie (American English) or biscuit (British English) is a baked snack or dessert that is typically small, flat, and sweet. It usually contains flour, sugar, egg, and some type of oil, fat, or butter. It may include other ingredients such as raisins, oats, chocolate chips, or nuts.','2025-03-21 20:05:40',NULL,0),(5,'15','1','Rose','453-7-475','BMW Rider','The acronym BMW stands for Bayerische Motoren Werke GmbH, which roughly translates to the Bavarian Engine Works Company. The name harks back to the company\'s origin in the German state of Bavaria. It also indicates BMW\'s original product range: engines for various applications.','2025-03-21 20:06:34',NULL,0),(6,'15','7','Rose','453-7-475','Suzuki','Classic beauty with athletic traits\nThe Audi A6 Sedan in the advanced equipment line is sporty and elegant from front to back: from the Audi Singleframe with a new structure to the newly designed rear diffuser.','2025-03-21 20:07:34',NULL,1),(7,'15','4','Rose','453-7-475','F1 Cars','Red Bull were no strangers to F1 - as sponsors - prior to formally entering as a works team in 2004. Nonetheless, the scale of their success over the following decade was staggering. After a first podium in 2006, the team hit their stride in 2009, claiming six victories and second in the constructors\' standings. Over the next four seasons they were a tour de force, claiming consecutive title doubles between 2010 and 2013, with Sebastian Vettel emerging as the sport\'s youngest quadruple champion. Now they are recapturing that glory with an equally exciting talent – one named Max Verstappen…','2025-03-21 20:08:16',NULL,0),(8,'15','1','Rose','453-7-475','Toyota GR Supra','Engine Type	6-cylinder, In-Line, 24-Valve DOHC, chain drive, with VVT (IN/EX)\nEngine Displacement (cc)	2,998\nMaximum Output (ps/rpm)	387/5,800 - 6,500\nMaximum Torque (Nm/Rpm)	500/1,800 - 5,000\nFuel Type	Gasoline','2025-03-21 20:09:32',NULL,1),(9,'16','1','Clyde','87-746431-1','Ferry Boats','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris interdum, metus quis molestie aliquet, ipsum mauris convallis eros, ut auctor purus enim eu risus. Proin vulputate vulputate nisl, nec feugiat metus venenatis vel. Etiam euismod tincidunt dolor, et porttitor ex condimentum ac. Donec at elit sed enim iaculis tristique. Quisque malesuada tellus quis felis finibus, a ullamcorper lectus tincidunt. Integer consectetur rutrum justo, ut cursus ligula tempor ut. Aliquam erat volutpat proin.','2025-03-21 20:11:36',NULL,0),(10,'16','3','Clyde','87-746431-1','Airplanes','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis vestibulum convallis. Maecenas vulputate nisi eget malesuada auctor. Mauris mi nisl, posuere et eleifend at, varius non quam. Cras ullamcorper finibus purus, eget imperdiet velit tincidunt et. Praesent vel enim metus. Quisque sed urna a risus dignissim venenatis. Duis velit.','2025-03-21 20:12:12',NULL,0),(11,'16','2','Clyde','87-746431-1','Fast Craft','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis vestibulum convallis. Maecenas vulputate nisi eget malesuada auctor. Mauris mi nisl, posuere et eleifend at, varius non quam. Cras ullamcorper finibus purus, eget imperdiet velit tincidunt et. Praesent vel enim metus. Quisque sed urna a risus dignissim venenatis. Duis velit.','2025-03-21 20:12:25',NULL,1),(12,'15','4','Rose','453-7-475','Porche 911','Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow\'s nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.\n\nDeadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.','2025-03-21 22:05:58',NULL,1),(13,'1','1','Drazille Toledo','2021-7-797','Stranger Things','Just wait till we tell Will that Jennifer Hayes was crying at his funeral. You’re right. You are a freak…. Who would you rather be friends with: Bowie or Kenny Rogers? It\'s just, sometimes... people don\'t really say what they\'re really thinking. But when you capture the right moment, it says more.','2025-03-21 22:32:30',NULL,1),(14,'52','7','admin','pasdpdspaddpp','My 7th ticket','This is my const cat6 = document.getElementById(\"ticketCategory6\") vconst cat6 = document.getElementById(\"ticketCategory6\")const cat6 = document.getElementById(\"ticketCategory6\")const cat6 = document.getElementById(\"ticketCategory6\")const cat6 = document.getElementById(\"ticketCategory6\")const cat6 = document.getElementById(\"ticketCategory6\")const cat6 = document.getElementById(\"ticketCategory6\")','2025-03-22 06:58:15',NULL,1),(15,'52','6','admin','pasdpdspaddpp','6th ticket','asdasd p-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 borderp-0 pt-2 pb-2 mt-1 border','2025-03-22 07:09:27',NULL,1),(16,'52','6','admin','pasdpdspaddpp','SkyScrapers','sad asdasd asdas dsa dsad sad asdas dasd asd adasd sad asdasd asdas dsa dsad sad asdas dasd asd adasd sad asdasd asdas dsa dsad sad asdas dasd asd adasd sad asdasd asdas dsa dsad sad asdas dasd asd adasd sad asdasd asdas dsa dsad sad asdas dasd asd adasd sad asdasd asdas dsa dsad sad asdas dasd asd adasd sad asdasd asdas dsa dsad sad asdas dasd asd adasd ','2025-04-11 19:03:12',NULL,1);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `uid` int(10) NOT NULL AUTO_INCREMENT,
  `username` text DEFAULT NULL,
  `stud_id` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `user_timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `user_status` tinyint(1) DEFAULT 1,
  `user_level` int(10) DEFAULT 1,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`uid`,`username`,`stud_id`,`password`,`user_timestamp`,`user_status`,`user_level`) values (1,'Drazille Toledo','2021-7-797','Knight410','2025-03-16 21:49:01',1,1),(2,'MRCHOI','122-11-3','riotKnight410','2025-03-16 21:50:17',1,1),(3,'Knight','11-41233-3','asdasdasdadasd','2025-03-17 19:00:00',1,1),(4,'KnightytyYY','11-41233-31','asdasdasdadasd','2025-03-17 19:02:27',1,1),(5,'Knightytyty','11-41233','asdasdasdadasd','2025-03-17 19:03:16',1,1),(6,'Jimmy','1221-33-000','jimmyswiener','2025-03-18 16:31:31',1,1),(7,'Drazille Toledo12312','1231232133212','asdasdasd','2025-03-19 18:15:09',1,1),(8,'John Doe','001-00001-9182','johnny1','2025-03-19 18:25:52',1,1),(9,'Komo','11111111111111','huhsushsushshu','2025-03-19 18:38:03',1,1),(10,'asd','123','123','2025-03-20 02:12:48',1,1),(11,'fgh','456','456','2025-03-20 02:15:43',1,1),(12,'Shanielle','202-7101','shan123','2025-03-20 15:02:10',1,1),(13,'George','09-090-111','real1','2025-03-20 18:36:05',1,1),(14,'Jack','1233-3123-311','password','2025-03-21 20:00:54',1,1),(15,'Rose','453-7-475','password','2025-03-21 20:01:06',1,1),(16,'Clyde','87-746431-1','password','2025-03-21 20:01:28',1,1),(17,'Drazille Toledo','123','1232','2025-03-22 01:46:28',1,1),(18,'Drazille Toledo','asd','asd','2025-03-22 01:47:29',1,1),(19,'Drazille Toledo','1231','123','2025-03-22 01:48:16',1,1),(20,'Tango','133','asd13','2025-03-22 02:02:57',1,1),(21,'Tangos','123123','123','2025-03-22 02:03:55',1,1),(22,'Blob1','65773454314','123','2025-03-22 02:05:03',1,1),(23,'peepeo','0101010101010100101','asdasd','2025-03-22 02:08:07',1,1),(24,'MEEMICS','37581448974287','123','2025-03-22 02:09:57',1,1),(25,'meemmss','452355','123','2025-03-22 02:11:17',1,1),(26,'Drazille Toledo0000000','1231232321313213','asdasdadasd','2025-03-22 02:13:05',1,1),(27,'Kevin1123','QWEQEWQ','SAD','2025-03-22 02:13:56',1,1),(28,'Kevinasdasd','1232131321321321321311','asd','2025-03-22 02:14:14',1,1),(29,'ANYTA12','888888888888888888','123123','2025-03-22 02:16:16',1,1),(30,'ANYTA121','8888888888888888882','123123','2025-03-22 02:16:31',1,1),(31,'ANYTA1211','88888888888888888821','123123','2025-03-22 02:17:14',1,1),(32,'Lolipops','7474744747','PASSWORD123','2025-03-22 02:18:55',1,1),(33,'Kevinaaa','1237546351321','asd','2025-03-22 02:20:57',1,1),(34,'Sir Dean','6969-69-6969','leonidas','2025-03-22 02:23:42',1,1),(35,'Sir Dean II','69-69-696969','Leonidas@1','2025-03-22 02:25:47',1,1),(36,'testAdmin','4343434223443342','123','2025-03-22 02:27:06',1,NULL),(37,'admin1','asdmin','123123123','2025-03-22 02:27:57',1,NULL),(38,'admin2','sexybabes','123','2025-03-22 02:30:13',1,4),(39,'admin3','sexy1','qwe','2025-03-22 02:30:52',1,4),(40,'stilladmin','hehehe','asd','2025-03-22 02:31:12',1,1),(41,'Dr Mary','09090909090909','asd','2025-03-22 02:31:49',1,4),(42,'Dr Anasdad','32132321321321321321132','asd','2025-03-22 02:32:43',1,4),(43,'Dr yyyyyy','fgddsggggds','asd','2025-03-22 02:33:10',1,4),(44,'popopopopop','jhgjghj','123','2025-03-22 02:34:24',1,4),(45,'kjlkllkj','123asdasdads','asdadd','2025-03-22 02:35:07',1,4),(46,'PIPES','mario','luigi','2025-03-22 02:40:07',1,4),(47,'penelope','oddy','12324','2025-03-22 02:41:28',1,4),(48,'oddy','the great','123123','2025-03-22 02:41:56',1,4),(49,'oddyys','123123fghadf','fgh','2025-03-22 02:42:34',1,4),(50,'Zeus','thunder','adkalksd','2025-03-22 02:43:45',1,4),(51,'nobdy','0','1','2025-03-22 02:44:20',1,1),(52,'admin','pasdpdspaddpp','asd','2025-03-22 04:13:59',1,4);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
