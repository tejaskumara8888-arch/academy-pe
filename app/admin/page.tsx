"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
};

const SUBJECT_COLORS: Record<string, string> = {
  "Digital Transformation": "#3b82f6",
  "Enterprise AI": "#8b5cf6",
  "Cybersecurity": "#ef4444",
  "General Inquiry": "#F26A36",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions", {
        headers: { "x-admin-token": sessionStorage.getItem("admin_token") || "" },
      });
      if (res.status === 401) { setAuthed(false); return; }
      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch { /* silent */ }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchSubmissions();
  }, [authed, fetchSubmissions]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD_HINT || "";
    // We validate server-side, just store and attempt fetch
    sessionStorage.setItem("admin_token", password);
    setAuthed(true);
    setAuthError("");
    // fetchSubmissions will be called by the effect
    fetch("/api/admin/submissions", {
      headers: { "x-admin-token": password },
    }).then(r => {
      if (r.status === 401) {
        setAuthed(false);
        setAuthError("Incorrect password.");
        sessionStorage.removeItem("admin_token");
      }
    });
  }

  const filtered = submissions.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.message.toLowerCase().includes(search.toLowerCase());
    const matchSubject = filterSubject === "All" || s.subject === filterSubject;
    return matchSearch && matchSubject;
  });

  const subjects = ["All", ...Array.from(new Set(submissions.map((s) => s.subject)))];

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ backgroundColor: "#1e293b", padding: "3rem", width: "100%", maxWidth: "400px", borderTop: "4px solid #F26A36" }}>
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "white", letterSpacing: "-0.05em" }}>
              ACADEMY <span style={{ color: "#F26A36" }}>P&E</span>
            </div>
            <p style={{ color: "#94a3b8", marginTop: "0.5rem", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Admin Dashboard</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8", marginBottom: "0.5rem" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                autoFocus
                style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#0f172a", border: "1px solid #334155", color: "white", outline: "none", fontSize: "1rem", boxSizing: "border-box" }}
              />
            </div>
            {authError && <p style={{ color: "#f87171", fontSize: "0.875rem" }}>{authError}</p>}
            <button type="submit" style={{ backgroundColor: "#F26A36", color: "white", padding: "0.875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", fontFamily: "sans-serif", color: "white" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "#1e293b", borderBottom: "1px solid #334155", padding: "0 2rem", height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.05em" }}>
          ACADEMY <span style={{ color: "#F26A36" }}>P&E</span>
          <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#64748b", marginLeft: "1rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin</span>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button onClick={fetchSubmissions} style={{ backgroundColor: "transparent", border: "1px solid #334155", color: "#94a3b8", padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            ↻ Refresh
          </button>
          <button onClick={() => { setAuthed(false); sessionStorage.removeItem("admin_token"); }} style={{ backgroundColor: "transparent", border: "1px solid #334155", color: "#94a3b8", padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total Submissions", value: submissions.length, color: "#F26A36" },
            { label: "This Week", value: submissions.filter(s => new Date(s.created_at) > new Date(Date.now() - 7 * 86400000)).length, color: "#3b82f6" },
            { label: "Today", value: submissions.filter(s => new Date(s.created_at).toDateString() === new Date().toDateString()).length, color: "#22c55e" },
            { label: "Unique Subjects", value: new Set(submissions.map(s => s.subject)).size, color: "#8b5cf6" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ backgroundColor: "#1e293b", padding: "1.5rem", borderTop: `3px solid ${color}` }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search name, email, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: "1 1 250px", padding: "0.6rem 1rem", backgroundColor: "#1e293b", border: "1px solid #334155", color: "white", outline: "none", fontSize: "0.875rem" }}
          />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {subjects.map((s) => (
              <button key={s} onClick={() => setFilterSubject(s)}
                style={{ padding: "0.5rem 1rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", border: "none", cursor: "pointer", backgroundColor: filterSubject === s ? "#F26A36" : "#1e293b", color: filterSubject === s ? "white" : "#94a3b8", borderTop: filterSubject === s ? "2px solid #F26A36" : "2px solid #334155" }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table / List */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {/* Submissions list */}
          <div style={{ flex: 2, backgroundColor: "#1e293b", border: "1px solid #334155" }}>
            <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>
                {loading ? "Loading..." : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
              </span>
            </div>
            {loading ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading submissions...</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>No submissions found.</div>
            ) : (
              <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                {filtered.map((s) => (
                  <div key={s.id} onClick={() => setSelected(s)}
                    style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #1e3a5f22", cursor: "pointer", backgroundColor: selected?.id === s.id ? "#0f172a" : "transparent", borderLeft: selected?.id === s.id ? "3px solid #F26A36" : "3px solid transparent", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                      <span style={{ fontWeight: 700, color: "white" }}>{s.name}</span>
                      <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "0.5rem" }}>{s.email}</div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ backgroundColor: SUBJECT_COLORS[s.subject] || "#F26A36", color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {s.subject}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
                        {s.message.slice(0, 60)}...
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div style={{ flex: 1.2, backgroundColor: "#1e293b", border: "1px solid #334155", alignSelf: "flex-start", position: "sticky", top: "1rem" }}>
            {selected ? (
              <div>
                <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>Submission Detail</span>
                  <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "1.25rem" }}>×</button>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "inline-block", backgroundColor: SUBJECT_COLORS[selected.subject] || "#F26A36", color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
                    {selected.subject}
                  </div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.25rem", color: "white" }}>{selected.name}</h2>
                  <a href={`mailto:${selected.email}`} style={{ color: "#F26A36", fontSize: "0.875rem", display: "block", marginBottom: selected.phone ? "0.25rem" : "1.25rem" }}>{selected.email}</a>
                  {selected.phone && <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginBottom: "1.25rem" }}>{selected.phone}</p>}
                  <div style={{ borderTop: "1px solid #334155", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#64748b", marginBottom: "0.75rem" }}>Message</div>
                    <p style={{ color: "#e2e8f0", lineHeight: 1.7, fontSize: "0.9rem", whiteSpace: "pre-wrap" }}>{selected.message}</p>
                  </div>
                  <div style={{ borderTop: "1px solid #334155", paddingTop: "1.25rem", marginTop: "1.25rem" }}>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#64748b", marginBottom: "0.5rem" }}>Received</div>
                    <p style={{ color: "#94a3b8", fontSize: "0.8rem" }}>{new Date(selected.created_at).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</p>
                  </div>
                  <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    style={{ display: "block", textAlign: "center", backgroundColor: "#F26A36", color: "white", padding: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", textDecoration: "none", marginTop: "1.5rem" }}>
                    Reply via Email →
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📬</div>
                <p style={{ fontSize: "0.875rem" }}>Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
