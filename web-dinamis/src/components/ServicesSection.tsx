"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id_menu: number;
  nama_menu: string;
  deskripsi: string | null;
  harga: string;
  gambar: string | null;
  stok: number;
  nama_kategori: string;
}

export default function ServicesSection() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu?limit=6")
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok") setItems(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="services">
      <h2 className="section-title">
        Menu <span className="text-gradient">Database</span>
      </h2>
      <p className="section-subtitle">
        Daftar menu yang diambil langsung dari tabel menu_makanan pada database db_uas.
      </p>
      {loading ? (
        <div className="services-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div className="card card--skeleton" key={i}>
              <div className="skeleton skeleton--img" />
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--text" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-dim)" }}>
          Belum ada data menu di database.
        </p>
      ) : (
        <div className="services-grid">
          {items.map((item, i) => (
            <article className="card" key={item.id_menu} style={{ animationDelay: `${i * 0.08}s` }}>
              {item.gambar ? (
                <img src={item.gambar} alt={item.nama_menu} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 12, marginBottom: 12 }} />
              ) : (
                <div className="card-icon">🍽️</div>
              )}
              <span className="hero-tagline">{item.nama_kategori || "Menu"}</span>
              <h3>{item.nama_menu}</h3>
              <p>{item.deskripsi || "Menu yang tersedia di database."}</p>
              <strong style={{ color: "var(--accent)" }}>Rp {Number(item.harga).toLocaleString("id-ID")}</strong>
              <small style={{ display: "block", marginTop: 8, color: "var(--text-dim)" }}>Stok: {item.stok}</small>
              <div className="card-shine" />
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
