import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import SiteLayout from "@/components/SiteLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "600", "800"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "RESTO NUSANTARA | Menu & Reservasi",
  description: "Restoran keluarga terbaik di kota Anda dengan menu khas Indonesia, pesanan, dan reservasi meja.",
  keywords: ["resto nusantara", "restoran", "menu", "reservasi", "pesanan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
