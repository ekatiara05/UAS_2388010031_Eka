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
            <div className="card card--skeleton" key={i}>
              <div className="skeleton skeleton--img" />
              <div className="skeleton skeleton--title" />
              <div className="skeleton skeleton--text" />
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
            <article className="card berita-card" key={item.id_menu} style={{ animationDelay: `${i * 0.1}s` }}>
              {item.gambar && (
                <div className="berita-card__img">
                  <img src={item.gambar} alt={item.nama_menu} loading="lazy" />
                </div>
              )}
              <div className="berita-card__body">
                <span className="berita-card__date">{item.nama_kategori}</span>
                <h3>{item.nama_menu}</h3>
                <p>{item.deskripsi || "Menu yang tersimpan dalam database."}</p>
                <strong style={{ color: "var(--accent)" }}>Rp {Number(item.harga).toLocaleString("id-ID")}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
