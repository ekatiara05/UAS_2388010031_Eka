import { query } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const beritaCount = await query<any>("SELECT COUNT(*) as total FROM berita");
  const layananCount = await query<any>("SELECT COUNT(*) as total FROM layanan");
  const unreadKontak = await query<any>("SELECT COUNT(*) as total FROM kontak WHERE is_read = 0");
  const totalKontak = await query<any>("SELECT COUNT(*) as total FROM kontak");

  const stats = [
    { name: "Total Layanan", value: layananCount[0]?.total ?? 0, href: "/admin/layanan", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.2)" },
    { name: "Total Berita", value: beritaCount[0]?.total ?? 0, href: "/admin/berita", color: "#ea580c", bg: "rgba(234, 88, 12, 0.1)", border: "rgba(234, 88, 12, 0.2)" },
    { name: "Pesan Belum Dibaca", value: unreadKontak[0]?.total ?? 0, href: "/admin/kontak", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)", border: "rgba(245, 158, 11, 0.2)" },
    { name: "Total Pesan Masuk", value: totalKontak[0]?.total ?? 0, href: "/admin/kontak", color: "#ea580c", bg: "rgba(234, 88, 12, 0.1)", border: "rgba(234, 88, 12, 0.2)" },
  ];

  const recentBerita = await query<any>(
    "SELECT id, judul, is_published, created_at FROM berita ORDER BY created_at DESC LIMIT 5"
  );
  const recentKontak = await query<any>(
    "SELECT id, nama, email, subjek, is_read, created_at FROM kontak ORDER BY created_at DESC LIMIT 5"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Welcome Card banner */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(234, 88, 12, 0.12) 100%)",
        border: "1px solid rgba(234, 88, 12, 0.25)",
        borderRadius: "20px",
        padding: "32px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "26px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px", fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Selamat Datang Kembali, Administrator 👋
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: "15px", maxWidth: "600px", lineHeight: "1.6" }}>
            Panel kontrol Resto Nusantara aktif dan berjalan. Anda memiliki <strong style={{ color: "var(--accent-blue)" }}>{unreadKontak[0]?.total ?? 0} pesan baru</strong> yang belum dibaca dari pelanggan.
          </p>
        </div>
        {/* Decorative glowing orb */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "150px",
          height: "150px",
          background: "var(--accent-purple)",
          filter: "blur(60px)",
          borderRadius: "50%",
          opacity: 0.3
        }} />
      </div>

      {/* Main Split Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2.1fr 1fr", gap: "28px" }} className="admin-split-grid">
        
        {/* Left Column: Stats & Messages */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Stats Grid inside Left Column */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {stats.map((s) => (
              <Link key={s.name} href={s.href} className="admin-stat-card" style={{ textDecoration: "none" }}>
                <div>
                  <div style={{ fontSize: "13px", color: "var(--text-dim)", fontWeight: 500, marginBottom: "8px" }}>{s.name}</div>
                  <div style={{ fontSize: "32px", fontWeight: 800, color: "var(--text-main)", lineHeight: 1 }}>{s.value}</div>
                </div>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: s.bg, border: `1px solid ${s.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color, fontSize: "22px", fontWeight: 800,
                }}>
                  {String(s.value).padStart(1, "0")}
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Messages (Pesan Terbaru) */}
          <div className="admin-card">
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-main)", fontFamily: "var(--font-playfair), Georgia, serif" }}>Pesan Pelanggan Terbaru</div>
              <Link href="/admin/kontak" className="admin-btn admin-btn-secondary" style={{ padding: "6px 14px", fontSize: "12px" }}>Lihat Semua Pesan</Link>
            </div>
            <div>
              {recentKontak.length === 0 ? (
                <div style={{ padding: "32px", textAlign: "center", color: "var(--text-dim)", fontSize: "14px" }}>Belum ada pesan masuk.</div>
              ) : recentKontak.map((k: any) => (
                <div key={k.id} style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1, minWidth: 0, display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    {/* Avatar Circle with Initial letter */}
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: k.is_read ? "rgba(255, 255, 255, 0.05)" : "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                      border: k.is_read ? "1px solid var(--glass-border)" : "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, color: "#fff", fontSize: "14px", flexShrink: 0
                    }}>
                      {k.nama.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ fontSize: "14px", fontWeight: k.is_read ? 600 : 700, color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k.nama}</div>
                        {!k.is_read && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--accent-purple)", display: "inline-block", flexShrink: 0 }} />}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-dim)", opacity: 0.7, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k.email}</div>
                      
                      {/* Message Preview */}
                      <div style={{ marginTop: "8px" }}>
                        {k.subjek && (
                          <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--text-main)", marginBottom: "2px" }}>{k.subjek}</div>
                        )}
                        <div style={{ fontSize: "13px", color: "var(--text-dim)", opacity: 0.9, lineHeight: "1.4" }}>
                          {k.pesan}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-dim)", opacity: 0.6, marginLeft: "12px", flexShrink: 0, textAlign: "right" }}>
                    {new Date(k.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Quick Actions & News Feed */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Quick Actions Panel */}
          <div className="admin-card" style={{ padding: "24px" }}>
            <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-main)", marginBottom: "16px", fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Aksi Cepat
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/admin/berita/create" className="admin-btn admin-btn-primary" style={{ justifyContent: "center", padding: "12px" }}>
                + Tulis Berita Baru
              </Link>
              <Link href="/admin/layanan/create" className="admin-btn admin-btn-secondary" style={{ justifyContent: "center", padding: "12px" }}>
                + Tambah Layanan Baru
              </Link>
              <a href="/" target="_blank" className="admin-btn admin-btn-secondary" style={{ justifyContent: "center", padding: "12px", opacity: 0.8 }}>
                Buka Website Utama ↗
              </a>
            </div>
          </div>

          {/* Recent Berita Feed (Berita Terbaru) */}
          <div className="admin-card">
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-main)", fontFamily: "var(--font-playfair), Georgia, serif" }}>Berita Terbaru</div>
            </div>
            <div>
              {recentBerita.length === 0 ? (
                <div style={{ padding: "32px", textAlign: "center", color: "var(--text-dim)", fontSize: "14px" }}>Belum ada berita.</div>
              ) : recentBerita.map((b: any) => (
                <div key={b.id} style={{ padding: "16px 24px", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", lineHeight: "1.4", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {b.judul}
                    </div>
                    <span className={`admin-badge ${b.is_published ? "admin-badge-green" : "admin-badge-gray"}`} style={{ flexShrink: 0, fontSize: "10px", padding: "2px 8px" }}>
                      {b.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                    <span style={{ fontSize: "11px", color: "var(--text-dim)", opacity: 0.6 }}>
                      {new Date(b.created_at).toLocaleDateString("id-ID")}
                    </span>
                    <Link href={`/admin/berita/${b.id}/edit`} style={{ fontSize: "12px", color: "var(--accent-blue)", textDecoration: "none", fontWeight: 600 }}>
                      Edit ✎
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
