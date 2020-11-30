-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 24 Kas 2020, 13:48:38
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
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` bigint(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL DEFAULT '--- --- -- --',
  `location` varchar(100) NOT NULL,
  `coin` int(255) NOT NULL DEFAULT '12',
  `photo` varchar(100) NOT NULL DEFAULT 'img/profiles/p1.png',
  `lastuserID` bigint(255) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'online',
  `security` varchar(100) NOT NULL DEFAULT 'public'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `gender`, `email`, `phone`, `location`, `coin`, `photo`, `lastuserID`, `status`, `security`) VALUES
(1, 'alibabaaliyev', '123', 'male', 'aliyev.alibaba@hotmail.com', '--- -- --', 'AZ', 12, 'img/profiles/p1.png', 5, 'online', 'public'),
(2, 'alibaba123', 'azerbaycan123', 'male', 'aliyev.alibaba@hotmail.om', '--- -- --', 'AZ', 12, 'img/profiles/p6.png', 0, 'online', 'public'),
(3, 'elcanrehimov', '123', 'male', 'elcan.rehimov@hotmail.com', '0509969696', 'AZ', 120, 'img/profiles/p3.png', 0, 'offline', 'public'),
(4, 'revanquliyev', '123', 'male', 'revan.gg@hotmail.com', '0501111111', 'AZ', 50, 'img/profiles/p4.png', 0, 'offline', 'public'),
(5, 'esqinqasimov', '123', 'male', 'esqin.qasimov@hotmail.com', '0504444444', 'AZ', 120, 'img/profiles/p5.png', 0, 'online', 'public'),
(6, 'aydinzeynalov', '123', 'male', 'aydin.zz@hotmail.com', '0503333333', 'AZ', 25, 'img/profiles/p6.png', 0, 'online', 'public');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
