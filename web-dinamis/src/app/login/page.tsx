"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, username, password });
    if (res?.error) {
      setError("Username atau password salah.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background:
        "radial-gradient(circle at top, rgba(251, 191, 36, 0.18), transparent 26%), " +
        "radial-gradient(circle at right, rgba(249, 115, 22, 0.16), transparent 24%), " +
        "linear-gradient(135deg, #1c130d 0%, #2b1d14 45%, #140d09 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "56px 56px", opacity: 0.35, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-5%", left: "-6%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.18), transparent 60%)", filter: "blur(2px)", animation: "float1 9s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "-8%", right: "-5%", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,146,60,0.18), transparent 58%)", filter: "blur(2px)", animation: "float2 10s ease-in-out infinite" }} />

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-24px) scale(1.04); } }
        @keyframes float2 { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(18px) scale(0.96); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .login-btn:hover { background: linear-gradient(135deg, #f59e0b, #fb7185 55%, #f97316) !important; transform: translateY(-2px) !important; box-shadow: 0 18px 36px rgba(249,115,22,0.35) !important; }
        .login-btn:active { transform: translateY(0) !important; }
        .login-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none !important; }
      `}</style>

      <div style={{ width: "100%", maxWidth: "1120px", minHeight: "680px", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", borderRadius: "32px", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.08)", animation: "fadeUp 0.55s ease" }}>
        <aside style={{
          position: "relative",
          padding: "36px 32px",
          background: "linear-gradient(160deg, rgba(17,24,39,0.96), rgba(30,41,59,0.92) 45%, rgba(17,24,39,0.98))",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(140deg, rgba(251,191,36,0.10), transparent 32%, rgba(249,115,22,0.08) 100%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px", color: "#fef3c7" }}>Admin Access</div>
            <h2 style={{ margin: "18px 0 10px", fontSize: "34px", lineHeight: 1.05, fontWeight: 800, letterSpacing: "-0.8px" }}>Kelola restoran Anda dari satu layar yang hangat dan rapi.</h2>
            <p style={{ maxWidth: "440px", color: "#dbe4ee", fontSize: "15px", lineHeight: 1.6, marginBottom: "20px" }}>Pantau menu, berita, dan pesan pelanggan dengan dashboard yang lebih personal untuk tim dapur dan operasional.</p>
            <div style={{ display: "grid", gap: "10px", marginTop: "18px" }}>
              {[
                ["Menu & Promo", "Update menu harian dan penawaran spesial dengan cepat."],
                ["Pesanan & Reservasi", "Pantau status pesanan dan meja tanpa perlu berpindah halaman."],
                ["Konten Instan", "Publikasikan berita terbaru dengan tata letak yang lebih modern."],
              ].map(([title, desc]) => (
                <div key={title} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "16px", padding: "12px 14px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff7ed", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontSize: "12px", color: "#dbe4ee", lineHeight: 1.45 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", color: "#fde68a", fontSize: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>
            <span>Resto Nusantara</span>
            <span>Kitchen Control Panel</span>
          </div>
        </aside>

        <section style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,247,237,0.96))",
          padding: "36px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: "-10%", top: "-12%", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.22), transparent 62%)", pointerEvents: "none" }} />
          <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ width: "70px", height: "70px", margin: "0 auto 14px", borderRadius: "18px", background: "linear-gradient(135deg, #f59e0b 0%, #fb7185 45%, #f97316 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 18px 30px rgba(249,115,22,0.28)" }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <h3 style={{ fontSize: "26px", fontWeight: 800, color: "#111827", margin: "0 0 6px" }}>Masuk ke Panel Admin</h3>
              <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>Gunakan akun admin untuk mengelola halaman restoran.</p>
            </div>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "14px", padding: "12px 14px", color: "#b91c1c", fontSize: "13px", marginBottom: "18px" }}>⚠️ {error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "1.1px", marginBottom: "8px" }}>Username</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focusUser ? "#f59e0b" : "#64748b" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </span>
                  <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} onFocus={() => setFocusUser(true)} onBlur={() => setFocusUser(false)} placeholder="Masukkan username" style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: `1px solid ${focusUser ? "#f59e0b" : "#e5e7eb"}`, borderRadius: "14px", padding: "14px 14px 14px 42px", color: "#111827", fontSize: "14px", outline: "none", boxShadow: focusUser ? "0 0 0 4px rgba(245,158,11,0.14)" : "none", transition: "all 0.18s" }} />
                </div>
              </div>

              <div style={{ marginBottom: "22px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "1.1px", marginBottom: "8px" }}>Password</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: focusPass ? "#f59e0b" : "#64748b" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </span>
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocusPass(true)} onBlur={() => setFocusPass(false)} placeholder="Masukkan password" style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: `1px solid ${focusPass ? "#f59e0b" : "#e5e7eb"}`, borderRadius: "14px", padding: "14px 44px 14px 42px", color: "#111827", fontSize: "14px", outline: "none", boxShadow: focusPass ? "0 0 0 4px rgba(245,158,11,0.14)" : "none", transition: "all 0.18s" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "4px", display: "flex", alignItems: "center" }}>{showPassword ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>}</button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="login-btn" style={{ width: "100%", padding: "14px 16px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #f59e0b 0%, #fb7185 55%, #f97316 100%)", color: "#fff", fontSize: "15px", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 14px 28px rgba(249,115,22,0.25)", transition: "all 0.18s ease" }}>
                {loading ? <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Authenticating...</> : <>Masuk ke Panel Admin <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg></>}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: "18px", color: "#64748b", fontSize: "12px" }}>© 2026 Resto Nusantara • Kitchen Control</p>
          </div>
        </section>
      </div>
    </div>
  );
}
