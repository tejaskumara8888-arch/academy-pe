"use client";
import React, { useState } from "react";
import Link from "next/link";

// ─── EDIT YOUR SOCIAL LINKS HERE ───────────────────────────────────────────
const SOCIAL_LINKS: { label: string; href: string; icon: () => React.ReactElement }[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/academy-of-progress-and-establishment-64629a185?utm_source=share_via&utm_content=profile&utm_medium=member_android", // ← replace
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/917044903484", // ← replace
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/AcademyOfProgre", // ← replace
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://m.facebook.com/academyprogress.in/", // ← replace
    icon: () => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];
// ───────────────────────────────────────────────────────────────────────────

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
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          marginBottom: "5rem",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: "5rem",
        }}>

          {/* Brand + socials */}
          <div>
            <div style={{ fontSize: "1.5rem", fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "-0.05em", marginBottom: "2rem" }}>
              ACADEMY <span style={{ color: "var(--primary)" }}>P&amp;E</span>
            </div>
            <p style={{ color: "#9ca3af", lineHeight: 1.7, marginBottom: "2rem" }}>
              Empowering the next generation of digital leaders and enterprises through progress and establishment.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textDecoration: "none",
                    transition: "background-color 0.2s, border-color 0.2s, transform 0.2s",
                  }}
                  onMouseOver={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "var(--primary)";
                    el.style.borderColor = "var(--primary)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = "transparent";
                    el.style.borderColor = "rgba(255,255,255,0.2)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Industries</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Financial Services", "Healthcare", "Manufacturing", "Retail", "Energy"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                    onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "2rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Services</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {["Digital Marketing", "Cloud Services", "AI & Data Science", "Cybersecurity", "Engineering"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                    onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
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
                style={{
                  backgroundColor: status === "success" ? "#22c55e" : "var(--primary)",
                  padding: "0.75rem 1rem", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.1em", cursor: "pointer", border: "none", color: "white",
                  transition: "background 0.2s",
                }}
              >
                {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed! ✓" : status === "error" ? "Try Again" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "2rem", fontSize: "0.875rem", color: "#6b7280" }}>
          <p>© 2024 Academy of Progress and Establishment. All Rights Reserved.</p>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Privacy Policy", "Cookie Policy", "Terms of Use"].map((item) => (
              <Link key={item} href="#" style={{ color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={(e) => ((e.target as HTMLElement).style.color = "white")}
                onMouseOut={(e) => ((e.target as HTMLElement).style.color = "#6b7280")}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
