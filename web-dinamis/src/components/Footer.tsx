import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="logo">RESTO NUSANTARA</Link>
          <p className="footer-tagline">Menu, Pesanan & Reservasi</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Menu</h4>
            <Link href="/#hero">Beranda</Link>
            <Link href="/#services">Layanan</Link>
            <Link href="/berita">Berita</Link>
            <Link href="/#vision">Visi</Link>
          </div>
          <div className="footer-col">
            <h4>Layanan</h4>
            <span>Katering & Prasmanan</span>
            <span>Reservasi Meja</span>
            <span>Layanan Antar Cepat</span>
            <span>Acara Keluarga & Kantor</span>
          </div>
          <div className="footer-col">
            <h4>Kontak</h4>
            <span>info@restonusantara.com</span>
            <span>+62 812 3456 7890</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 RESTO NUSANTARA. Semua hak dilindungi undang-undang.</p>
        <p className="footer-credit">Project by RESTO NUSANTARA</p>
      </div>
    </footer>
  );
}
