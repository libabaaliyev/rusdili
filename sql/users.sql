-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3308
-- Üretim Zamanı: 02 Oca 2021, 18:14:41
-- Sunucu sürümü: 8.0.18
-- PHP Sürümü: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `rusdili`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `photo` varchar(100) NOT NULL DEFAULT 'p1.png',
  `aim` varchar(100) NOT NULL DEFAULT 'easy',
  `level` varchar(100) NOT NULL,
  `grade` bigint(255) NOT NULL DEFAULT '0',
  `learning` varchar(100) NOT NULL,
  `using_lang` varchar(100) NOT NULL,
  `league` varchar(100) NOT NULL DEFAULT 'starter',
  `crown` bigint(255) NOT NULL DEFAULT '0',
  `heart` int(255) NOT NULL DEFAULT '5',
  `gem` bigint(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `name`, `password`, `email`, `photo`, `aim`, `level`, `grade`, `learning`, `using_lang`, `league`, `crown`, `heart`, `gem`) VALUES
(1, 'alibabaaliyev', 'Alibaba', 'azerbaycan1', 'aliyev.alibaba@hotmail.com', 'p3.png', 'average', 'zero', 2, 'ru', '\"az\"', 'starter', 47, 4, 332),
(16, 'alibaba12', 'Alibaba', 'azerbaycan1', 'alibaba.alibaba@al.com', 'p1.png', 'average', 'zero', 0, 'ru', '\"tr\"', 'starter', 0, 5, 0),
(15, 'alibaba123', 'Alibaba', 'azerbaycan1', 'alibabaalibaba@ali.com', 'p1.png', 'serious', 'elementary', 0, 'ru', '\"az\"', 'starter', 8, 5, 2367);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
