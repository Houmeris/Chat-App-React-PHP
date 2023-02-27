-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 27, 2023 at 09:05 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `last_connected` int(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `username`, `email`, `password`, `status`, `last_connected`) VALUES
(1, 'Martynas Dziugys', 'martynasdzg@gmail.com', '42a92d3b636db32fef4edb3308e0804d', 'Offline now', 1649203475),
(2, 'Jonas Petravicius', 'jonas@gmail.com', 'defa9b33c34607e55160f2072e62f245', 'Offline now', 1648856984),
(3, 'Petras Kubaitis', 'petras@gmail.com', 'd220ebfb24d6685f54f109270ab33cf3', 'Offline now', 1648856999);

-- --------------------------------------------------------

--
-- Table structure for table `calls`
--

DROP TABLE IF EXISTS `calls`;
CREATE TABLE IF NOT EXISTS `calls` (
  `call_id` int(200) NOT NULL,
  `call_send_id` int(11) NOT NULL,
  `call_get_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `call_time` int(255) NOT NULL,
  PRIMARY KEY (`call_id`),
  KEY `call_send_id` (`call_send_id`),
  KEY `call_get_id` (`call_get_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `friend_list`
--

DROP TABLE IF EXISTS `friend_list`;
CREATE TABLE IF NOT EXISTS `friend_list` (
  `friend_id` int(11) NOT NULL AUTO_INCREMENT,
  `friend_send_id` int(11) NOT NULL,
  `friend_get_id` int(11) NOT NULL,
  `agreed` tinyint(1) NOT NULL,
  PRIMARY KEY (`friend_id`),
  KEY `friend_send_id` (`friend_send_id`),
  KEY `friend_get_id` (`friend_get_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friend_list`
--

INSERT INTO `friend_list` (`friend_id`, `friend_send_id`, `friend_get_id`, `agreed`) VALUES
(1, 1289257849, 1147048699, 1),
(5, 1147048699, 696570089, 0),
(6, 1147048699, 455560330, 1),
(8, 868704161, 1289257849, 1),
(9, 1289257849, 587913007, 1);

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_admin_id` int(200) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `call_room_id` varchar(255) NOT NULL,
  PRIMARY KEY (`group_id`) USING BTREE,
  KEY `group_admin_id` (`group_admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_admin_id`, `group_name`, `img`, `call_room_id`) VALUES
(1, 1289257849, 'Martyno grupe', '1664809201pav.png', '8dac6590-7188-11ed-a492-61e9316f775a'),
(2, 1289257849, 'Mano grupe', '1664809433lap.jpg', '94c67b40-7188-11ed-8b33-8b99dd0431d4'),
(3, 1147048699, 'Zano grupe', '1664809905kaln.jpg', '9b3a17c0-7188-11ed-a147-b376858150ea'),
(4, 868704161, 'bgrup', '1671899758download.png', '0b63e080-83a9-11ed-82f7-0b0cd6f53aa1');

-- --------------------------------------------------------

--
-- Table structure for table `group_list`
--

DROP TABLE IF EXISTS `group_list`;
CREATE TABLE IF NOT EXISTS `group_list` (
  `group_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `agreed` tinyint(1) NOT NULL,
  PRIMARY KEY (`group_list_id`),
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `group_list`
--

INSERT INTO `group_list` (`group_list_id`, `group_id`, `user_id`, `agreed`) VALUES
(2, 3, 1289257849, 1),
(3, 1, 1147048699, 1),
(6, 1, 587913007, 1);

-- --------------------------------------------------------

--
-- Table structure for table `group_msg_notification`
--

DROP TABLE IF EXISTS `group_msg_notification`;
CREATE TABLE IF NOT EXISTS `group_msg_notification` (
  `group_msg_notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `msg_geter_id` int(11) NOT NULL,
  PRIMARY KEY (`group_msg_notification_id`),
  KEY `group_id` (`group_id`),
  KEY `msg_geter_id` (`msg_geter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT,
  `incoming_msg_id` int(200) NOT NULL,
  `outgoing_msg_id` int(200) NOT NULL,
  `msg` varchar(1000) NOT NULL,
  `msg_img` varchar(255) NOT NULL,
  `msg_time` int(255) NOT NULL,
  `seen` tinyint(1) NOT NULL,
  PRIMARY KEY (`msg_id`),
  KEY `incoming_msg_id` (`incoming_msg_id`),
  KEY `outgoing_msg_id` (`outgoing_msg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`msg_id`, `incoming_msg_id`, `outgoing_msg_id`, `msg`, `msg_img`, `msg_time`, `seen`) VALUES
(16, 1289257849, 1147048699, 'Labas!', '', 0, 1),
(17, 1147048699, 1289257849, 'Sveikas', '', 0, 1),
(18, 1289257849, 1147048699, 'asd', '', 0, 1),
(20, 1147048699, 1289257849, 'Veikia', '', 0, 1),
(21, 1289257849, 1147048699, 'Taip', '', 0, 1),
(22, 1289257849, 1147048699, 'a', '', 0, 1),
(23, 1289257849, 1147048699, 'e', '', 0, 1),
(24, 1289257849, 1147048699, 'd', '', 0, 1),
(25, 1289257849, 1147048699, 's', '', 0, 1),
(26, 1289257849, 1147048699, 'h', '', 0, 1),
(27, 1289257849, 1147048699, 'd', '', 0, 1),
(28, 1289257849, 1147048699, 'f', '', 0, 1),
(29, 1289257849, 1147048699, 'f', '', 0, 1),
(30, 1289257849, 1147048699, 'f', '', 0, 1),
(31, 1289257849, 1147048699, 'o', '', 0, 1),
(32, 1289257849, 1147048699, 'l', '', 0, 1),
(34, 1289257849, 1147048699, 'b', '', 0, 1),
(35, 1289257849, 1147048699, 'g', '', 0, 1),
(44, 1289257849, 1147048699, 'j', '', 0, 1),
(45, 1289257849, 1147048699, '', '1664492990book.jpg', 0, 1),
(46, 1289257849, 1147048699, 'SVEIKI!', '1664493828book.jpg', 0, 1),
(47, 1289257849, 1147048699, 'testas ziurim kaip veikia tekstas su paveiksliuku', '1664494087book.jpg', 0, 1),
(48, 1147048699, 1289257849, 'labas', '1664494365asddsa.jpg', 0, 1),
(49, 1147048699, 1289257849, '', '1664494446asddsa.jpg', 0, 1),
(50, 1289257849, 1147048699, 'asd', '', 0, 1),
(51, 1, 1147048699, 'Hello', '', 0, 0),
(52, 1, 1289257849, 'Labas', '', 0, 0),
(53, 1, 1147048699, 'foto', '1664996428kjhg.jpg', 0, 0),
(54, 455560330, 1147048699, 'Labas', '', 0, 0),
(55, 1147048699, 455560330, 'Sveikas', '', 0, 1),
(56, 455560330, 1147048699, 'SiunÄiu paveiksliukÄ…', '1668464696book.jpg', 0, 0),
(57, 1147048699, 1289257849, 'a', '', 0, 1),
(58, 1147048699, 1289257849, 'b', '', 0, 1),
(59, 1289257849, 1147048699, 'asd', '', 1668554397, 1),
(60, 1289257849, 1147048699, 'Koks laikas', '', 1668559344, 1),
(61, 1, 1147048699, 'o', '', 1668711479, 0),
(62, 1289257849, 1147048699, 'aaaaaaaaa', '', 1668711898, 1),
(63, 1289257849, 1147048699, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '', 1668711900, 1),
(64, 1289257849, 1147048699, 'tekstasssssssssssss', '', 1668711918, 1),
(65, 1289257849, 1147048699, 'tekstassssssssssssssssssssssssssssssssssssssssssssssss', '', 1668711926, 1),
(66, 3, 1147048699, 'b', '', 1668718570, 0),
(67, 455560330, 1147048699, 'Labas', '', 1668720864, 0),
(68, 3, 1147048699, 'yop', '', 1668729312, 0),
(69, 1289257849, 1147048699, 'asd', '', 1668732463, 1),
(70, 1289257849, 1147048699, 'jkl', '', 1668732510, 1),
(71, 1147048699, 1289257849, 'message', '', 1668732693, 1),
(72, 1, 1147048699, 'l', '', 1668810114, 0),
(73, 1, 1147048699, 'test', '', 1668815102, 0),
(74, 1, 1147048699, 'm', '', 1668815298, 0),
(75, 1, 1289257849, 'a', '', 1668816057, 0),
(76, 1, 1147048699, 'ok', '', 1668816074, 0),
(77, 1, 1147048699, 'v', '', 1668816504, 0),
(78, 1, 1289257849, 'v', '', 1668816523, 0),
(79, 1, 1147048699, 'sdfg', '', 1668816659, 0),
(80, 1, 1289257849, 'bandom', '', 1668816908, 0),
(81, 1, 1289257849, 'b', '', 1668818683, 0),
(82, 1, 1147048699, 'ok', '', 1668818715, 0),
(83, 1, 1147048699, 'asd', '', 1668819124, 0),
(84, 1, 1147048699, 'ok', '', 1668819127, 0),
(85, 1, 1147048699, 'pl', '', 1668819128, 0),
(86, 3, 1147048699, 'yo', '', 1668819192, 0),
(87, 1289257849, 1147048699, 'ok', '', 1668819370, 1),
(88, 3, 1289257849, 'lol', '', 1668819388, 0),
(89, 1, 1147048699, 'oi', '', 1668819463, 0),
(90, 1, 1289257849, 'a', '', 1668819490, 0),
(91, 1289257849, 1147048699, 'f', '', 1668819512, 1),
(92, 3, 1289257849, 'c', '', 1668819528, 0),
(93, 1289257849, 1147048699, 'asd', '', 1668820103, 1),
(94, 3, 1289257849, 'b', '', 1668820112, 0),
(95, 1, 1289257849, 'o', '', 1668820126, 0),
(96, 1289257849, 1147048699, 'h', '', 1668820134, 1),
(97, 1, 1289257849, 'b', '', 1668820145, 0),
(102, 1289257849, 1147048699, 'm', '', 1669670486, 1),
(103, 1147048699, 1289257849, 'Labas', '', 1669926546, 1),
(104, 1147048699, 1289257849, 'a', '', 1669926548, 1),
(105, 1147048699, 1289257849, 'b', '', 1669926549, 1),
(106, 1147048699, 1289257849, 'c', '', 1669926550, 1),
(107, 1289257849, 1147048699, 'asd', '', 1671151786, 1),
(108, 4, 868704161, 'd', '', 1671900533, 0),
(109, 4, 868704161, 'v', '', 1671900549, 0),
(110, 1289257849, 868704161, 'e', '', 1671900604, 1),
(111, 868704161, 1289257849, 'v', '', 1671900638, 1),
(112, 1289257849, 868704161, 'v', '', 1671900653, 1),
(113, 1289257849, 868704161, 'asdasd', '', 1671900666, 1),
(114, 4, 868704161, 'e', '', 1671900958, 0),
(115, 1289257849, 868704161, 'j', '', 1671900984, 1),
(116, 1147048699, 1289257849, 'Labas', '', 1672944424, 1),
(117, 1289257849, 1147048699, 'Sveikas', '', 1672944430, 1),
(118, 1, 1289257849, 'm', '', 1672979771, 0),
(119, 1147048699, 1289257849, 'Labas', '', 1673444398, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` int(200) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_connected` int(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `unique_id` (`unique_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `unique_id`, `username`, `email`, `password`, `last_connected`, `status`, `img`) VALUES
(1, 1289257849, 'Martynas', 'martynasdzg@gmail.com', 'dbf9104bd04456e8a9ccbd98a00b631a', 1673445001, 'Offline now', '1663990534space.jpg'),
(2, 1147048699, 'Zanas', 'zanas@pastas.com', '1f6199f36322ad2362816bd357ad5cae', 1673444993, 'Offline now', 'pav.jpg'),
(3, 696570089, 'Guest#696570089', 'mail@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1648949676, 'Offline now', 'pav.jpg'),
(4, 824471718, 'Guest#824471718', 'mail@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1648949683, 'Offline now', 'pav.jpg'),
(5, 1502916341, 'Guest#1502916341', 'mail@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1648949685, 'Offline now', 'pav.jpg'),
(6, 347685439, 'Guest#347685439', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950165, 'Offline now', 'pav.jpg'),
(7, 1605344144, 'Guest#1605344144', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950299, 'Offline now', 'pav.jpg'),
(8, 1050266414, 'Guest#1050266414', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950308, 'Offline now', 'pav.jpg'),
(9, 788093646, 'Guest#788093646', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950369, 'Offline now', 'pav.jpg'),
(10, 1176003169, 'Guest#1176003169', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950390, 'Offline now', 'pav.jpg'),
(11, 567434794, 'Guest#567434794', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950538, 'Offline now', 'pav.jpg'),
(12, 1332398902, 'Guest#1332398902', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950548, 'Offline now', 'pav.jpg'),
(13, 659411227, 'Guest#659411227', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950550, 'Offline now', 'pav.jpg'),
(14, 659302352, 'Guest#659302352', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648953179, 'Offline now', 'pav.jpg'),
(15, 694390450, 'martynas_dziugys', 'martynasdzgg@gmail.com', '42a92d3b636db32fef4edb3308e0804d', 1649125168, 'Offline now', 'pav.jpg'),
(19, 1114990090, 'serfdt', 'martynasdzsdfsdfsdfg@gmail.com', 'c74118a6f03ebe3cf5aea0e44ecd6b89', 1649127189, 'Offline now', 'pav.jpg'),
(20, 886243813, 'rdgyfghghj', 'martynasdzretertertg@gmail.com', '1f6199f36322ad2362816bd357ad5cae', 1649199323, 'Offline now', 'pav.jpg'),
(21, 367969865, 'Guest#367969865', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1649203482, 'Offline now', 'pav.jpg'),
(22, 698984782, 'Martybas', 'martynas@pastas.com', '3200178d7e700e6f745dddd917c40cbe', 1663880372, 'Offline now', 'pav.jpg'),
(35, 455560330, 'Martis', 'martynasdzggg@gmail.com', '1f6199f36322ad2362816bd357ad5cae', 1668467275, 'Offline now', 'default.png'),
(37, 587913007, 'account1', 'account1@gmail.com', '1f6199f36322ad2362816bd357ad5cae', 1673445754, 'Active now', 'default.png'),
(38, 868704161, 'aaaaaaaaaa', 'elpastas@gmail.com', '1f6199f36322ad2362816bd357ad5cae', 1672593385, 'Offline now', 'default.png');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `calls`
--
ALTER TABLE `calls`
  ADD CONSTRAINT `calls_ibfk_1` FOREIGN KEY (`call_send_id`) REFERENCES `users` (`unique_id`),
  ADD CONSTRAINT `calls_ibfk_2` FOREIGN KEY (`call_get_id`) REFERENCES `users` (`unique_id`);

--
-- Constraints for table `friend_list`
--
ALTER TABLE `friend_list`
  ADD CONSTRAINT `friend_list_ibfk_1` FOREIGN KEY (`friend_send_id`) REFERENCES `users` (`unique_id`),
  ADD CONSTRAINT `friend_list_ibfk_2` FOREIGN KEY (`friend_get_id`) REFERENCES `users` (`unique_id`);

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`group_admin_id`) REFERENCES `users` (`unique_id`);

--
-- Constraints for table `group_list`
--
ALTER TABLE `group_list`
  ADD CONSTRAINT `group_list_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  ADD CONSTRAINT `group_list_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`unique_id`);

--
-- Constraints for table `group_msg_notification`
--
ALTER TABLE `group_msg_notification`
  ADD CONSTRAINT `group_msg_notification_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  ADD CONSTRAINT `group_msg_notification_ibfk_2` FOREIGN KEY (`msg_geter_id`) REFERENCES `users` (`unique_id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`outgoing_msg_id`) REFERENCES `users` (`unique_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
