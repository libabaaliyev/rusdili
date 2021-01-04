-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3308
-- Üretim Zamanı: 02 Oca 2021, 18:14:32
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
-- Tablo için tablo yapısı `learning`
--

DROP TABLE IF EXISTS `learning`;
CREATE TABLE IF NOT EXISTS `learning` (
  `id` bigint(255) NOT NULL,
  `user_id` bigint(255) NOT NULL,
  `plan` text NOT NULL,
  `achieve` text NOT NULL,
  `skills` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `learning`
--

INSERT INTO `learning` (`id`, `user_id`, `plan`, `achieve`, `skills`) VALUES
(0, 1, '[{\"grade\":2,\"step\":1,\"exam\":3}]', '{\"grade-master\":0,\"crown-master\":6,\"full-aim\":309,\"unerror\":6,\"friendly\":0,\"knight\":0,\"week\":true,\"month\":true}', '{\"shield\":0,\"double\":0}'),
(0, 9, '[]', '', ''),
(0, 12, '[{\"grade\":0,\"step\":1,\"exam\":3},{\"grade\":0,\"step\":2,\"exam\":3}]', '', ''),
(0, 15, '[{\"grade\":0,\"step\":1,\"exam\":4},{\"grade\":0,\"step\":3,\"exam\":4}]', '{\"grade-master\":0,\"crown-master\":8,\"full-aim\":87,\"unerror\":8,\"friendly\":0,\"knight\":0,\"week\":true,\"month\":true}', '{\"shield\":0,\"double\":0}');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
