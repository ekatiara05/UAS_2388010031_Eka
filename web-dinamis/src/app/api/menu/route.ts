import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

interface MenuRow {
  id_menu: number;
  id_kategori: number;
  nama_menu: string;
  deskripsi: string | null;
  harga: string;
  gambar: string | null;
  stok: number;
  nama_kategori: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 12, 50);

    const rows = await query<MenuRow>(
      `SELECT m.id_menu, m.id_kategori, m.nama_menu, m.deskripsi, m.harga, m.gambar, m.stok, k.nama_kategori
       FROM menu_makanan m
       LEFT JOIN kategori_menu k ON k.id_kategori = m.id_kategori
       ORDER BY m.id_menu DESC
       LIMIT ?`,
      [limit]
    );

    return NextResponse.json({ status: "ok", data: rows });
  } catch (error) {
    console.error("API /menu error:", error);
    return NextResponse.json(
      { status: "error", message: "Gagal mengambil data menu" },
      { status: 500 }
    );
  }
}
