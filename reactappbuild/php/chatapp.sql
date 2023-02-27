-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 06, 2022 at 01:44 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT,
  `incoming_msg_id` int(255) NOT NULL,
  `outgoing_msg_id` int(255) NOT NULL,
  `msg` varchar(1000) NOT NULL,
  PRIMARY KEY (`msg_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`msg_id`, `incoming_msg_id`, `outgoing_msg_id`, `msg`) VALUES
(15, 1, 659302352, 'Sveiki ar galite padeti'),
(14, 659302352, 1, 'Sveiki'),
(13, 1289257849, 1, 'Sveiki'),
(12, 1, 1289257849, 'Sveiki');

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
  `status` int(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `unique_id`, `username`, `email`, `password`, `status`) VALUES
(1, 1289257849, 'Martynas', 'martynasdzg@gmail.com', 'dbf9104bd04456e8a9ccbd98a00b631a', 1649203487),
(2, 1147048699, 'Zanas', 'zanas@pastas.com', 'dbf9104bd04456e8a9ccbd98a00b631a', 1648859545),
(3, 696570089, 'Guest#696570089', 'mail@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1648949676),
(4, 824471718, 'Guest#824471718', 'mail@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1648949683),
(5, 1502916341, 'Guest#1502916341', 'mail@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 1648949685),
(6, 347685439, 'Guest#347685439', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950165),
(7, 1605344144, 'Guest#1605344144', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950299),
(8, 1050266414, 'Guest#1050266414', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950308),
(9, 788093646, 'Guest#788093646', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950369),
(10, 1176003169, 'Guest#1176003169', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950390),
(11, 567434794, 'Guest#567434794', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950538),
(12, 1332398902, 'Guest#1332398902', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950548),
(13, 659411227, 'Guest#659411227', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648950550),
(14, 659302352, 'Guest#659302352', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1648953179),
(15, 694390450, 'martynas_dziugys', 'martynasdzgg@gmail.com', '42a92d3b636db32fef4edb3308e0804d', 1649125168),
(18, 569730431, 'aaaaaaaaaaaaaaaaaaaaaaaaa', 'martynasdzgerter@gmail.com', '40cbe470a593da614dd4d8add6423460', 1649125986),
(19, 1114990090, 'serfdt', 'martynasdzsdfsdfsdfg@gmail.com', 'c74118a6f03ebe3cf5aea0e44ecd6b89', 1649127189),
(20, 886243813, 'rdgyfghghj', 'martynasdzretertertg@gmail.com', '1f6199f36322ad2362816bd357ad5cae', 1649199323),
(21, 367969865, 'Guest#367969865', 'mail@mail.com', '29a2bbf3e835f946375e8530b266d04f', 1649203482);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
