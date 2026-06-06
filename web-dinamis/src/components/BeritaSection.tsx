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

export default function BeritaSection() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu?limit=4")
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "ok") setItems(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="berita" className="berita-section">
      <h2 className="section-title">
        Menu <span className="text-gradient">Favorit</span>
      </h2>
      <p className="section-subtitle">
        Koleksi menu unggulan yang langsung diambil dari tabel menu_makanan di database.
      </p>

      {loading ? (
        <div className="berita-grid">
          {[1, 2, 3, 4].map((i) => (
            <div className="card card--skeleton" key={i} style={{ minHeight: 200 }}>
              <div className="skeleton skeleton--img" style={{ height: "100%" }} />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-dim)" }}>
          Belum ada menu yang tersedia di database.
        </p>
      ) : (
        <div className="berita-grid">
          {items.map((item, i) => (
            <article className="berita-horizontal-card" key={item.id_menu} style={{ animationDelay: `${i * 0.1}s` }}>
              {item.gambar ? (
                <div className="berita-horizontal-card__img">
                  <img src={item.gambar} alt={item.nama_menu} loading="lazy" />
                </div>
              ) : (
                <div className="berita-horizontal-card__img" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.03)", fontSize: "2.5rem" }}>
                  🍽️
                </div>
              )}
              <div className="berita-horizontal-card__body">
                <div>
                  <span className="berita-horizontal-card__category">{item.nama_kategori || "Menu"}</span>
                  <h3>{item.nama_menu}</h3>
                  <p>{item.deskripsi || "Menu spesial pilihan terbaik dari dapur kami."}</p>
                </div>
                <div className="berita-horizontal-card__footer">
                  <strong style={{ color: "var(--accent-blue)", fontSize: "1.2rem" }}>
                    Rp {Number(item.harga).toLocaleString("id-ID")}
                  </strong>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-dim)", background: "rgba(255,255,255,0.06)", padding: "4px 8px", borderRadius: "12px" }}>
                    Stok: {item.stok}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
