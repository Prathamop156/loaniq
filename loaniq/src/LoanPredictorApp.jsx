import { useState } from "react";

const DEMO_USERS = [
  { id: "admin", password: "admin123", name: "Arjun Mehta", role: "Senior Analyst", avatar: "AM" },
  { id: "analyst", password: "loan2024", name: "Priya Sharma", role: "Loan Officer", avatar: "PS" },
];

const s = {
  // Layout
  page: { minHeight: "100vh", background: "#0a0d14", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", fontFamily: "'DM Sans', sans-serif" },
  appLayout: { minHeight: "100vh", background: "#0a0d14", display: "flex", fontFamily: "'DM Sans', sans-serif" },
  // Login
  loginCard: { background: "rgba(17,24,39,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "32px", width: "100%", maxWidth: "420px" },
  logoWrap: { textAlign: "center", marginBottom: "32px" },
  logoBox: { width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" },
  logoText: { color: "white", fontSize: "22px", fontWeight: 800, display: "block" },
  logoSub: { color: "rgba(255,255,255,0.35)", fontSize: "12px" },
  label: { display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" },
  input: { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  btn: { width: "100%", background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "white", fontWeight: 700, padding: "14px", borderRadius: "12px", border: "none", fontSize: "14px", cursor: "pointer", marginTop: "8px" },
  errorBox: { background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "12px", padding: "12px 16px", color: "#f87171", fontSize: "12px", marginBottom: "8px" },
  divider: { borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", marginTop: "20px" },
  demoLabel: { color: "rgba(255,255,255,0.2)", fontSize: "11px", textAlign: "center", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.1em" },
  demoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" },
  demoBtn: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "10px", textAlign: "left", cursor: "pointer" },
  // Sidebar
  sidebar: { width: "240px", background: "#0d1117", borderRight: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", minHeight: "100vh" },
  sideHeader: { padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  navSection: { flex: 1, padding: "16px" },
  navItem: (active) => ({ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "12px", border: active ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent", background: active ? "rgba(124,58,237,0.12)" : "transparent", color: active ? "#a78bfa" : "rgba(255,255,255,0.35)", fontSize: "14px", fontWeight: 500, cursor: "pointer", marginBottom: "4px", textAlign: "left" }),
  sideFooter: { padding: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" },
  avatar: { width: "36px", height: "36px", borderRadius: "50%", background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#a78bfa", flexShrink: 0 },
  logoutBtn: { width: "100%", display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "12px", border: "none", background: "transparent", color: "rgba(255,255,255,0.3)", fontSize: "13px", cursor: "pointer", marginTop: "8px" },
  // Main
  main: { flex: 1, overflowY: "auto" },
  topbar: { position: "sticky", top: 0, zIndex: 10, background: "rgba(10,13,20,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  content: { padding: "32px" },
  // Cards
  statCard: (gradient) => ({ borderRadius: "16px", padding: "20px", border: "1px solid rgba(255,255,255,0.08)", background: gradient, display: "flex", flexDirection: "column", gap: "8px" }),
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "32px" },
  card: { background: "rgba(17,24,39,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px" },
  // Table
  th: { textAlign: "left", color: "rgba(255,255,255,0.3)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", paddingBottom: "12px", paddingRight: "16px" },
  td: { padding: "12px 16px 12px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "14px" },
  badge: (status) => {
    const map = { Approved: { bg: "rgba(16,185,129,0.15)", color: "#34d399", border: "rgba(16,185,129,0.25)" }, Rejected: { bg: "rgba(239,68,68,0.15)", color: "#f87171", border: "rgba(239,68,68,0.25)" }, Pending: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "rgba(245,158,11,0.25)" } };
    const c = map[status] || map.Pending;
    return { background: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: "999px", padding: "3px 10px", fontSize: "11px", fontWeight: 600 };
  },
  // Form
  formInput: { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "10px 14px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box", marginBottom: "2px" },
  formSelect: { width: "100%", background: "rgba(17,24,39,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "10px 14px", color: "white", fontSize: "13px", outline: "none", boxSizing: "border-box" },
  submitBtn: { width: "100%", background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "white", fontWeight: 700, padding: "14px", borderRadius: "12px", border: "none", fontSize: "14px", cursor: "pointer" },
  resultCard: { background: "rgba(17,24,39,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "20px", marginBottom: "16px" },
};

const recentApps = [
  { id: "LN-2401", name: "Rohan Kapoor", amount: "₹18,00,000", score: 742, status: "Approved", date: "02 Jun" },
  { id: "LN-2402", name: "Sneha Iyer", amount: "₹35,00,000", score: 581, status: "Rejected", date: "02 Jun" },
  { id: "LN-2403", name: "Vikram Bose", amount: "₹9,50,000", score: 698, status: "Approved", date: "01 Jun" },
  { id: "LN-2404", name: "Anita Verma", amount: "₹22,00,000", score: 612, status: "Pending", date: "01 Jun" },
  { id: "LN-2405", name: "Dev Nair", amount: "₹5,00,000", score: 729, status: "Approved", date: "31 May" },
];

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [sideTab, setSideTab] = useState("dashboard");
  const [predResult, setPredResult] = useState(null);
  const [predLoading, setPredLoading] = useState(false);
  const [predError, setPredError] = useState("");
  const [form, setForm] = useState({
    no_of_dependents: 2, education: "Graduate", self_employed: "No",
    income_annum: 800000, loan_amount: 2000000, loan_term: 12, cibil_score: 700,
    residential_assets_value: 3000000, commercial_assets_value: 1000000,
    luxury_assets_value: 500000, bank_asset_value: 200000,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const found = DEMO_USERS.find(u => u.id === loginId.trim() && u.password === loginPass);
    if (found) { setUser(found); setPage("app"); setLoginError(""); }
    else setLoginError("Invalid credentials. Try admin / admin123");
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setPredLoading(true); setPredResult(null); setPredError("");
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, no_of_dependents: parseInt(form.no_of_dependents), income_annum: parseInt(form.income_annum), loan_amount: parseInt(form.loan_amount), loan_term: parseInt(form.loan_term), cibil_score: parseInt(form.cibil_score), residential_assets_value: parseInt(form.residential_assets_value), commercial_assets_value: parseInt(form.commercial_assets_value), luxury_assets_value: parseInt(form.luxury_assets_value), bank_asset_value: parseInt(form.bank_asset_value) }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setPredResult(data.loan_prediction);
    } catch { setPredError("Could not reach API. Make sure FastAPI is running at localhost:8000."); }
    finally { setPredLoading(false); }
  };

  if (page === "login") return (
    <div style={s.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } input::placeholder { color: rgba(255,255,255,0.2); }`}</style>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={s.logoWrap}>
          <div style={s.logoBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <span style={s.logoText}>LoanIQ</span>
          <span style={s.logoSub}>AI-Powered Loan Prediction Platform</span>
        </div>
        <div style={s.loginCard}>
          <h1 style={{ color: "white", fontSize: "26px", fontWeight: 800, marginBottom: "4px" }}>Welcome back</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", marginBottom: "28px" }}>Sign in to your analyst account</p>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "16px" }}>
              <label style={s.label}>User ID</label>
              <input style={s.input} type="text" value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="Enter your user ID" />
            </div>
            <div style={{ marginBottom: "16px", position: "relative" }}>
              <label style={s.label}>Password</label>
              <input style={s.input} type={showPass ? "text" : "password"} value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", bottom: "12px", background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
            {loginError && <div style={s.errorBox}>{loginError}</div>}
            <button type="submit" style={s.btn}>Sign In →</button>
          </form>
          <div style={s.divider}>
            <p style={s.demoLabel}>Demo Credentials</p>
            <div style={s.demoGrid}>
              {DEMO_USERS.map(u => (
                <button key={u.id} onClick={() => { setLoginId(u.id); setLoginPass(u.password); }} style={s.demoBtn}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: 600 }}>{u.id}</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{u.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "predict", label: "New Prediction", icon: "🔮" },
    { key: "history", label: "Applications", icon: "📋" },
  ];

  return (
    <div style={s.appLayout}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } input::placeholder { color: rgba(255,255,255,0.2); } ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#ffffff18;border-radius:8px}`}</style>

      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sideHeader}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ ...s.logoBox, width: "32px", height: "32px", borderRadius: "8px", display: "flex", marginBottom: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span style={{ color: "white", fontSize: "20px", fontWeight: 800 }}>LoanIQ</span>
          </div>
        </div>
        <nav style={s.navSection}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px", paddingLeft: "12px" }}>Navigation</p>
          {navItems.map(item => (
            <button key={item.key} onClick={() => setSideTab(item.key)} style={s.navItem(sideTab === item.key)}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>
        <div style={s.sideFooter}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px", marginBottom: "4px" }}>
            <div style={s.avatar}>{user?.avatar}</div>
            <div>
              <div style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>{user?.name}</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{user?.role}</div>
            </div>
          </div>
          <button onClick={() => { setUser(null); setPage("login"); setPredResult(null); setLoginId(""); setLoginPass(""); }} style={s.logoutBtn}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>
        <div style={s.topbar}>
          <div>
            <h1 style={{ color: "white", fontSize: "20px", fontWeight: 800 }}>
              {sideTab === "dashboard" && "Overview"}
              {sideTab === "predict" && "New Prediction"}
              {sideTab === "history" && "All Applications"}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", marginTop: "2px" }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "white", fontSize: "13px", fontWeight: 600 }}>{user?.name}</div>
              <div style={{ color: "#34d399", fontSize: "11px" }}>● Online</div>
            </div>
          </div>
        </div>

        <div style={s.content}>
          {/* DASHBOARD */}
          {sideTab === "dashboard" && (
            <div>
              <div style={s.statsGrid}>
                {[
                  { label: "Total Applications", value: "2,841", sub: "↑ 12% this month", grad: "linear-gradient(135deg,rgba(124,58,237,0.4),rgba(124,58,237,0.15))" },
                  { label: "Approved", value: "1,923", sub: "67.7% approval rate", grad: "linear-gradient(135deg,rgba(16,185,129,0.4),rgba(16,185,129,0.15))" },
                  { label: "Rejected", value: "718", sub: "25.3% rejection rate", grad: "linear-gradient(135deg,rgba(239,68,68,0.4),rgba(239,68,68,0.15))" },
                  { label: "Pending", value: "200", sub: "Awaiting review", grad: "linear-gradient(135deg,rgba(245,158,11,0.4),rgba(245,158,11,0.15))" },
                ].map(c => (
                  <div key={c.label} style={s.statCard(c.grad)}>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{c.label}</span>
                    <span style={{ color: "white", fontSize: "30px", fontWeight: 800 }}>{c.value}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{c.sub}</span>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "24px" }}>
                <div style={s.card}>
                  <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Monthly Predictions</h2>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", marginBottom: "24px" }}>Approved vs Rejected — last 6 months</p>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px" }}>
                    {[{ m: "Jan", a: 280, r: 90 }, { m: "Feb", a: 320, r: 75 }, { m: "Mar", a: 290, r: 110 }, { m: "Apr", a: 360, r: 95 }, { m: "May", a: 340, r: 80 }, { m: "Jun", a: 333, r: 62 }].map(d => (
                      <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: "100%", display: "flex", gap: "3px", alignItems: "flex-end" }}>
                          <div style={{ flex: 1, background: "linear-gradient(to top,#7c3aed,#a78bfa)", borderRadius: "4px 4px 0 0", height: `${(d.a / 400) * 140}px` }} />
                          <div style={{ flex: 1, background: "linear-gradient(to top,#dc2626,#f87171)", borderRadius: "4px 4px 0 0", height: `${(d.r / 400) * 140}px` }} />
                        </div>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{d.m}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#7c3aed", display: "inline-block" }} /><span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Approved</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#dc2626", display: "inline-block" }} /><span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>Rejected</span></div>
                  </div>
                </div>
                <div style={s.card}>
                  <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>Quick Stats</h2>
                  {[{ label: "Avg Loan Amount", val: "₹18.4L", pct: 72 }, { label: "Avg CIBIL Score", val: "687", pct: 68.7 }, { label: "Graduate Applicants", val: "68%", pct: 68 }].map(stat => (
                    <div key={stat.label} style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{stat.label}</span>
                        <span style={{ color: "white", fontSize: "12px", fontWeight: 700 }}>{stat.val}</span>
                      </div>
                      <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "999px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${stat.pct}%`, background: "linear-gradient(to right,#7c3aed,#2563eb)", borderRadius: "999px" }} />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setSideTab("predict")} style={{ ...s.submitBtn, marginTop: "8px" }}>+ New Prediction</button>
                </div>
              </div>

              {/* Table */}
              <div style={s.card}>
                <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>Recent Applications</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["App ID", "Applicant", "Amount", "CIBIL Score", "Status", "Date"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {recentApps.map(app => (
                      <tr key={app.id}>
                        <td style={{ ...s.td, color: "#a78bfa", fontFamily: "monospace", fontSize: "12px", fontWeight: 700 }}>{app.id}</td>
                        <td style={{ ...s.td, color: "white", fontWeight: 500 }}>{app.name}</td>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.6)" }}>{app.amount}</td>
                        <td style={{ ...s.td, color: app.score >= 700 ? "#34d399" : app.score >= 650 ? "#fbbf24" : "#f87171", fontWeight: 700 }}>{app.score}</td>
                        <td style={s.td}><span style={s.badge(app.status)}>{app.status}</span></td>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>{app.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PREDICT */}
          {sideTab === "predict" && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", maxWidth: "900px" }}>
              <div style={s.card}>
                <h2 style={{ color: "white", fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>Applicant Details</h2>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", marginBottom: "24px" }}>Fill in all fields to run the AI prediction</p>
                <form onSubmit={handlePredict}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                    <div>
                      <label style={s.label}>Education</label>
                      <select style={s.formSelect} value={form.education} onChange={e => setForm(f => ({ ...f, education: e.target.value }))}>
                        <option value="Graduate">Graduate</option>
                        <option value="Not Graduate">Not Graduate</option>
                      </select>
                    </div>
                    <div>
                      <label style={s.label}>Self Employed</label>
                      <select style={s.formSelect} value={form.self_employed} onChange={e => setForm(f => ({ ...f, self_employed: e.target.value }))}>
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                  {[
                    { field: "no_of_dependents", label: "No. of Dependents" },
                    { field: "income_annum", label: "Annual Income (₹)" },
                    { field: "loan_amount", label: "Loan Amount (₹)" },
                    { field: "loan_term", label: "Loan Term (months)" },
                    { field: "cibil_score", label: "CIBIL Score (300–900)" },
                  ].map(({ field, label }) => (
                    <div key={field} style={{ marginBottom: "14px" }}>
                      <label style={s.label}>{label}</label>
                      <input style={s.formInput} type="number" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
                    </div>
                  ))}
                  <p style={{ ...s.label, marginBottom: "12px" }}>Asset Values (₹)</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                    {[
                      { field: "residential_assets_value", label: "Residential" },
                      { field: "commercial_assets_value", label: "Commercial" },
                      { field: "luxury_assets_value", label: "Luxury" },
                      { field: "bank_asset_value", label: "Bank" },
                    ].map(({ field, label }) => (
                      <div key={field}>
                        <label style={{ ...s.label, fontSize: "10px" }}>{label}</label>
                        <input style={s.formInput} type="number" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
                      </div>
                    ))}
                  </div>
                  {predError && <div style={{ ...s.errorBox, marginBottom: "12px" }}>{predError}</div>}
                  <button type="submit" disabled={predLoading} style={{ ...s.submitBtn, opacity: predLoading ? 0.6 : 1 }}>
                    {predLoading ? "⏳ Analyzing..." : "Run AI Prediction →"}
                  </button>
                </form>
              </div>

              <div>
                <div style={s.resultCard}>
                  <h3 style={{ color: "white", fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>Prediction Result</h3>
                  {predResult === null && !predLoading && (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <div style={{ fontSize: "36px", marginBottom: "12px" }}>🔮</div>
                      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>Fill the form and submit to see the AI prediction</p>
                    </div>
                  )}
                  {predLoading && (
                    <div style={{ textAlign: "center", padding: "32px 0" }}>
                      <div style={{ fontSize: "36px", marginBottom: "12px" }}>⏳</div>
                      <p style={{ color: "#a78bfa", fontSize: "12px" }}>Processing model...</p>
                    </div>
                  )}
                  {predResult !== null && (
                    <div style={{ textAlign: "center", padding: "16px 0" }}>
                      <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                        {String(predResult).toLowerCase().includes("approv") ? "✅" : "❌"}
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 800, color: String(predResult).toLowerCase().includes("approv") ? "#34d399" : "#f87171", marginBottom: "8px" }}>
                        {String(predResult).toLowerCase().includes("approv") ? "Meets approval criteria ✓" : "Does not meet criteria ✗"}
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
                        {predResult === "Approved" || predResult === 1 ? "Meets approval criteria ✓" : "Does not meet criteria ✗"}
                      </p>
                    </div>
                  )}
                </div>
                <div style={s.resultCard}>
                  <h3 style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>Model Info</h3>
                  {[{ l: "Model", v: "Scikit-learn" }, { l: "Endpoint", v: "POST /predict" }, { l: "Features", v: "11 inputs" }, { l: "File", v: "model_v1.pkl" }].map(i => (
                    <div key={i.l} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{i.l}</span>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontFamily: "monospace" }}>{i.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HISTORY */}
          {sideTab === "history" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["All", "Approved", "Rejected", "Pending"].map(f => (
                    <button key={f} style={{ padding: "6px 16px", borderRadius: "999px", border: f === "All" ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.08)", background: f === "All" ? "rgba(124,58,237,0.15)" : "transparent", color: f === "All" ? "#a78bfa" : "rgba(255,255,255,0.35)", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>{f}</button>
                  ))}
                </div>
                <button onClick={() => setSideTab("predict")} style={{ ...s.submitBtn, width: "auto", padding: "8px 20px", fontSize: "13px" }}>+ New Prediction</button>
              </div>
              <div style={s.card}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr>{["App ID", "Applicant", "Amount", "CIBIL", "Status", "Date"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                  <tbody>
                    {[...recentApps,
                      { id: "LN-2406", name: "Karan Malhotra", amount: "₹40,00,000", score: 548, status: "Rejected", date: "30 May" },
                      { id: "LN-2407", name: "Meera Pillai", amount: "₹12,50,000", score: 718, status: "Approved", date: "29 May" },
                      { id: "LN-2408", name: "Rahul Joshi", amount: "₹7,75,000", score: 663, status: "Pending", date: "29 May" },
                    ].map(app => (
                      <tr key={app.id}>
                        <td style={{ ...s.td, color: "#a78bfa", fontFamily: "monospace", fontSize: "12px", fontWeight: 700 }}>{app.id}</td>
                        <td style={{ ...s.td, color: "white", fontWeight: 500 }}>{app.name}</td>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.6)" }}>{app.amount}</td>
                        <td style={{ ...s.td, color: app.score >= 700 ? "#34d399" : app.score >= 650 ? "#fbbf24" : "#f87171", fontWeight: 700 }}>{app.score}</td>
                        <td style={s.td}><span style={s.badge(app.status)}>{app.status}</span></td>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>{app.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
