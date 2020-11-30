-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 24 Kas 2020, 13:48:30
-- Sunucu sürümü: 5.7.17
-- PHP Sürümü: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `chat`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `message`
--

CREATE TABLE `message` (
  `id` bigint(255) NOT NULL,
  `talk_id` varchar(100) NOT NULL,
  `send_id` bigint(255) NOT NULL,
  `receive_id` bigint(255) NOT NULL,
  `message_txt` text NOT NULL,
  `message_time` datetime NOT NULL,
  `seen` varchar(100) NOT NULL DEFAULT 'not-seen'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `message`
--

INSERT INTO `message` (`id`, `talk_id`, `send_id`, `receive_id`, `message_txt`, `message_time`, `seen`) VALUES
(1, '11111', 1, 2, 'Salam bu 1ci gonderilen', '2020-11-24 04:26:16', 'not-seen'),
(2, '11111', 2, 1, 'Salam bu cavab gonderilen', '2020-11-24 06:00:00', 'seen'),
(3, '11111', 2, 1, 'bu ikinci cavab gonderilen', '2020-11-24 08:05:00', 'seen'),
(4, '31124', 3, 1, 'salam bu yeni istifadeci ile gonderilen  mesaj', '2020-11-24 00:00:00', 'seen'),
(5, '31124', 3, 1, 'salam bu yeni istifadeci ile gonderilen  ikinci mesajdir', '2020-11-24 00:00:00', 'seen'),
(6, '31124', 1, 3, 'salam bu yeni istifadeciye cavab mesajdir', '2020-11-24 00:00:00', 'seen'),
(7, '31124', 3, 1, 'salam bu yeni istifadeci ile gonderilen  ucuncu mesajdir', '2020-11-24 00:00:00', 'seen'),
(8, '31124', 3, 1, 'salam bu yeni istifadeci ile gonderilen  dorduncu mesajdir', '2020-11-24 00:00:00', 'seen'),
(9, '11111', 1, 2, 'sasasa', '2020-11-24 01:37:38', 'not-seen'),
(10, '105fbd003d6f9ea', 1, 5, 'sasasas', '2020-11-24 01:44:45', 'not-seen'),
(11, '105fbd003d6f9ea', 1, 5, 'salam bu bir testdir', '2020-11-24 01:45:01', 'not-seen'),
(12, '105fbd003d6f9ea', 1, 5, 'testimiz', '2020-11-24 01:45:20', 'not-seen');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `message`
--
ALTER TABLE `message`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
