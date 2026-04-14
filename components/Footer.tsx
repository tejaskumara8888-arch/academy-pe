"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer style={{ backgroundColor: "var(--secondary)", color: "white", paddingTop: "6rem", paddingBottom: "3rem" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "5rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "5rem" }}>
          <div>
            <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "-0.05em", marginBottom: "2rem" }}>
              ACADEMY <span style={{ color: "var(--primary)" }}>P&amp;E</span>
            </div>
            <p style={{ color: "#9ca3af", lineHeight: 1.7, marginBottom: "2rem" }}>
              Empowering the next generation of digital leaders and enterprises through progress and establishment.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {["lucide:globe", "lucide:mail", "lucide:phone"].map((icon) => (
                <a key={icon} href="#" style={{ width: "2.5rem", height: "2.5rem", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)"; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}>
                  {/* @ts-expect-error iconify */}
                  <iconify-icon icon={icon} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Industries</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Financial Services", "Healthcare", "Manufacturing", "Retail", "Energy"].map((item) => (
                <li key={item}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseOver={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                  onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}>{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Services</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Digital Marketing", "Cloud Services", "AI & Data Science", "Cybersecurity", "Engineering"].map((item) => (
                <li key={item}><a href="#" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseOver={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                  onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}>{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Newsletter</h4>
            <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>Stay updated with our latest insights and digital trends.</p>
            <form onSubmit={handleNewsletter} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem", color: "white", outline: "none" }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{ backgroundColor: status === "success" ? "#22c55e" : "var(--primary)", padding: "0.75rem 1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", border: "none", color: "white", transition: "background 0.2s" }}
              >
                {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed! ✓" : status === "error" ? "Try Again" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem", fontSize: "0.875rem", color: "#6b7280" }}>
          <p>© 2024 Academy of Progress and Establishment. All Rights Reserved.</p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy Policy", "Cookie Policy", "Terms of Use"].map((item) => (
              <Link key={item} href="#" style={{ color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={(e) => ((e.target as HTMLElement).style.color = "white")}
                onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#6b7280")}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
