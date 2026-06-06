-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Jun 2026 pada 14.06
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_uas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_pesanan`
--

CREATE TABLE `detail_pesanan` (
  `id_detail` int(11) NOT NULL,
  `id_pesanan` int(11) DEFAULT NULL,
  `id_menu` int(11) DEFAULT NULL,
  `jumlah` int(11) NOT NULL,
  `harga_satuan` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_menu`
--

CREATE TABLE `kategori_menu` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu_makanan`
--

CREATE TABLE `menu_makanan` (
  `id_menu` int(11) NOT NULL,
  `id_kategori` int(11) DEFAULT NULL,
  `nama_menu` varchar(150) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `harga` decimal(10,2) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `stok` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `id_pelanggan` int(11) DEFAULT NULL,
  `tanggal_pesanan` datetime DEFAULT current_timestamp(),
  `total_harga` decimal(12,2) DEFAULT NULL,
  `status_pesanan` enum('Menunggu','Diproses','Dikirim','Selesai','Batal') DEFAULT 'Menunggu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `reservasi_meja`
--

CREATE TABLE `reservasi_meja` (
  `id_reservasi` int(11) NOT NULL,
  `nama_pelanggan` varchar(100) NOT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `tanggal_reservasi` date DEFAULT NULL,
  `jam_reservasi` time DEFAULT NULL,
  `jumlah_orang` int(11) DEFAULT NULL,
  `status_reservasi` enum('Menunggu','Disetujui','Ditolak') DEFAULT 'Menunggu'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `layanan`
--

CREATE TABLE `layanan` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `icon` varchar(100) DEFAULT 'Sparkles',
  `deskripsi` text DEFAULT NULL,
  `urutan` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kontak`
--

CREATE TABLE `kontak` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `subjek` varchar(150) NOT NULL,
  `pesan` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `berita`
--

CREATE TABLE `berita` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `konten` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indeks untuk tabel `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indeks untuk tabel `kategori_menu`
--
ALTER TABLE `kategori_menu`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `menu_makanan`
--
ALTER TABLE `menu_makanan`
  ADD PRIMARY KEY (`id_menu`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indeks untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`),
  ADD KEY `id_pelanggan` (`id_pelanggan`);

--
-- Indeks untuk tabel `reservasi_meja`
--
ALTER TABLE `reservasi_meja`
  ADD PRIMARY KEY (`id_reservasi`);

ALTER TABLE `layanan`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `kontak`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `berita`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kategori_menu`
--
ALTER TABLE `kategori_menu`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `menu_makanan`
--
ALTER TABLE `menu_makanan`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `reservasi_meja`
--
ALTER TABLE `reservasi_meja`
  MODIFY `id_reservasi` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `layanan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `kontak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `berita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  ADD CONSTRAINT `detail_pesanan_ibfk_1` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE,
  ADD CONSTRAINT `detail_pesanan_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu_makanan` (`id_menu`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `menu_makanan`
--
ALTER TABLE `menu_makanan`
  ADD CONSTRAINT `menu_makanan_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_menu` (`id_kategori`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE CASCADE;

-- --------------------------------------------------------
-- Seed data agar website memiliki isi dari database
-- --------------------------------------------------------

INSERT INTO `admin` (`id_admin`, `nama`, `username`, `password`) VALUES
(1, 'Admin UAS', 'admin', '$2b$12$WHtYbOcuXx8DWWJCYhwogeULXbf/.oOv1WdVDi0qVHImAiwNmkwzS');

INSERT INTO `kategori_menu` (`id_kategori`, `nama_kategori`) VALUES
(1, 'Makanan Utama'),
(2, 'Minuman'),
(3, 'Dessert');

INSERT INTO `menu_makanan` (`id_menu`, `id_kategori`, `nama_menu`, `deskripsi`, `harga`, `gambar`, `stok`) VALUES
(1, 1, 'Nasi Goreng Spesial', 'Nasi goreng dengan ayam, telur, dan bumbu khas rumah.', 28000, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80', 12),
(2, 1, 'Sate Ayam Bumbu Kacang', 'Sate ayam dengan bumbu kacang, lontong, dan sambal.', 32000, 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80', 8),
(3, 2, 'Es Jeruk Segar', 'Minuman segar dengan jeruk asli dan sirup alami.', 12000, 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=900&q=80', 20),
(4, 2, 'Thai Tea Premium', 'Thai tea creamy dengan topping susu dan es batu.', 15000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80', 15),
(5, 3, 'Puding Cokelat', 'Puding cokelat lembut dengan topping whip cream.', 13000, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80', 10),
(6, 3, 'Es Krim Vanilla', 'Es krim vanilla premium dengan topping cokelat.', 14000, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80', 9);

INSERT INTO `pelanggan` (`id_pelanggan`, `nama`, `email`, `no_hp`, `alamat`) VALUES
(1, 'Budi Santoso', 'budi@example.com', '081234567890', 'Jl. Merdeka No. 10'),
(2, 'Siti Rahma', 'siti@example.com', '081345678901', 'Jl. Pahlawan No. 22');

INSERT INTO `pesanan` (`id_pesanan`, `id_pelanggan`, `tanggal_pesanan`, `total_harga`, `status_pesanan`) VALUES
(1, 1, '2026-06-05 10:30:00', 60000.00, 'Selesai'),
(2, 2, '2026-06-05 13:15:00', 45000.00, 'Diproses');

INSERT INTO `detail_pesanan` (`id_detail`, `id_pesanan`, `id_menu`, `jumlah`, `harga_satuan`, `subtotal`) VALUES
(1, 1, 1, 1, 28000.00, 28000.00),
(2, 1, 4, 2, 15000.00, 30000.00),
(3, 2, 3, 1, 12000.00, 12000.00),
(4, 2, 5, 2, 13000.00, 26000.00);

INSERT INTO `reservasi_meja` (`id_reservasi`, `nama_pelanggan`, `no_hp`, `tanggal_reservasi`, `jam_reservasi`, `jumlah_orang`, `status_reservasi`) VALUES
(1, 'Budi Santoso', '081234567890', '2026-06-07', '19:00:00', 4, 'Disetujui'),
(2, 'Siti Rahma', '081345678901', '2026-06-08', '18:30:00', 2, 'Menunggu');

INSERT INTO `layanan` (`id`, `nama`, `icon`, `deskripsi`, `urutan`) VALUES
(1, 'Menu Spesial', 'UtensilsCrossed', 'Pilihan menu andalan restoran kami.', 1),
(2, 'Reservasi Meja', 'CalendarDays', 'Reservasi cepat dan mudah untuk keluarga.', 2),
(3, 'Pelayanan Ramah', 'Smile', 'Layanan pelanggan yang hangat dan profesional.', 3);

INSERT INTO `kontak` (`id`, `nama`, `email`, `subjek`, `pesan`, `is_read`) VALUES
(1, 'Budi Santoso', 'budi@example.com', 'Pesan Menu', 'Saya ingin tahu menu spesial minggu ini.', 0),
(2, 'Siti Rahma', 'siti@example.com', 'Reservasi', 'Apakah masih tersedia meja untuk 2 orang malam ini?', 1);

INSERT INTO `berita` (`id`, `judul`, `slug`, `excerpt`, `konten`, `image`, `is_published`, `created_at`) VALUES
(1, 'Promo Spesial Weekend', 'promo-spesial-weekend', 'Nikmati potongan harga untuk menu favorit akhir pekan.', 'Dapatkan diskon khusus untuk menu utama dan minuman pilihan setiap akhir pekan di resto kami.', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80', 1, '2026-06-05 09:00:00'),
(2, 'Menu Baru Resto Nusantara', 'menu-baru-resto-nusantara', 'Coba sajian terbaru yang siap memanjakan lidah Anda.', 'Kami meluncurkan menu baru dengan cita rasa khas Nusantara dan bahan segar setiap harinya.', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80', 1, '2026-06-05 11:30:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
