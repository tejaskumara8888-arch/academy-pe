"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", subject: "Job Application", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", subject: "Job Application", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection.");
    }
  }

  const inputStyle: React.CSSProperties = {
    borderBottom: "2px solid var(--border)",
    padding: "0.75rem 0",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "1rem",
    color: "var(--foreground)",
    width: "100%",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "var(--secondary)",
    marginBottom: "0.5rem",
    display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero Banner */}
      <section style={{ backgroundColor: "var(--secondary)", padding: "5rem 0 8rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="animate-fade-in-up" style={{ maxWidth: "48rem" }}>
            <h1 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: "1rem" }}>
              Get In Touch
            </h1>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontFamily: "var(--font-heading)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: "2rem" }}>
              Let&apos;s Build the Future of Your Enterprise Together.
            </h2>
            <div style={{ height: "4px", width: "6rem", backgroundColor: "var(--primary)" }} />
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section style={{ padding: "6rem 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5rem" }}>

            {/* Form */}
            <div style={{ flex: "1 1 400px" }}>
              <h3 style={{ fontSize: "1.875rem", fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--secondary)", marginBottom: "0.75rem" }}>
                Send Us a Message
              </h3>
              <p style={{ color: "var(--muted-foreground)", marginBottom: "3rem" }}>
                Fill out the form below and our strategic consultants will reach out to you within 24 hours.
              </p>

              {status === "success" ? (
                <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
                  <h4 style={{ fontWeight: 700, color: "#166534", fontSize: "1.25rem", marginBottom: "0.5rem" }}>Message Sent Successfully!</h4>
                  <p style={{ color: "#15803d" }}>Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} style={{ marginTop: "1.5rem", backgroundColor: "var(--primary)", color: "white", padding: "0.75rem 2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", border: "none", cursor: "pointer" }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Full Name</label>
                    <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Doe" required style={inputStyle}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "var(--primary)")}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "var(--border)")} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Work Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@enterprise.com" required style={inputStyle}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "var(--primary)")}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "var(--border)")} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 0000000000" style={inputStyle}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "var(--primary)")}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "var(--border)")} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={labelStyle}>Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} style={{ ...inputStyle, appearance: "none" }}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "var(--primary)")}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "var(--border)")}>
                      <option>Job Application</option>
                      <option>Digital Portfolio Creation</option>
                      <option>Job Placement Support</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="How can we help you navigate your next?" required style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "var(--primary)")}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "var(--border)")} />
                  </div>

                  {status === "error" && (
                    <div style={{ gridColumn: "1 / -1", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", padding: "1rem", color: "#dc2626", fontSize: "0.875rem" }}>
                      {errorMsg}
                    </div>
                  )}

                  <div style={{ gridColumn: "1 / -1", paddingTop: "1rem" }}>
                    <button type="submit" disabled={status === "loading"}
                      style={{ display: "flex", alignItems: "center", gap: "0.75rem", backgroundColor: status === "loading" ? "var(--secondary)" : "var(--primary)", color: "white", padding: "1rem 2.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", border: "none", cursor: status === "loading" ? "not-allowed" : "pointer", transition: "background-color 0.2s" }}
                      onMouseOver={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)"; }}
                      onMouseOut={(e) => { if (status !== "loading") (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)"; }}>
                      {status === "loading" ? "Sending..." : "Submit Inquiry"} →
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Info panel */}
            <div style={{ flex: "0 1 380px", display: "flex", flexDirection: "column", gap: "3rem" }}>
              <div style={{ backgroundColor: "var(--tertiary)", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "8rem", height: "8rem", backgroundColor: "rgba(242,106,54,0.1)", borderRadius: "50%", transform: "translate(4rem, -4rem)" }} />
                <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--secondary)", marginBottom: "2rem" }}>Global Headquarters</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  {[
                    { icon: "lucide:map-pin", label: "Location", lines: ["H8CX+5W5, Binoy Badal Dinesh Bag S, Lal Dighi, Lal Bazar, Kolkata, West Bengal 700001"] },
                    { icon: "lucide:phone", label: "Call Us", lines: ["+91 (033 6598 1654)", "+91 (7044903484)"] },
                    { icon: "lucide:mail", label: "Email", lines: ["establishmentacademy@gmail.com"] },
                  ].map(({ icon, label, lines }) => (
                    <div key={label} style={{ display: "flex", gap: "1.5rem" }}>
                      <div style={{ width: "3rem", height: "3rem", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", flexShrink: 0 }}>
                        {/* @ts-expect-error iconify */}
                        <iconify-icon icon={icon} style={{ fontSize: "1.5rem", color: "var(--primary)" }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--secondary)", marginBottom: "0.5rem" }}>{label}</h4>
                        {lines.map((l) => <p key={l} style={{ color: "var(--muted-foreground)", lineHeight: 1.6 }}>{l}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", height: "16rem", border: "1px solid var(--border)", overflow: "hidden", cursor: "pointer" }}
                onClick={() => window.open("https://www.google.com/maps/place/Dalhousie/@22.5704033,88.3472845,17z/data=!3m1!4b1!4m6!3m5!1s0x3a0277161c03bd13:0x9a92e916489a1a28!8m2!3d22.5703984!4d88.3498594!16s%2Fg%2F11sb4ymjx0?entry=ttu&g_ep=EgoyMDI2MDQxMi4wIKXMDSoASAFQAw%3D%3D", "_blank")}>
                <Image
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
                  alt="Map View"
                  fill
                  style={{ objectFit: "cover", opacity: 0.5, filter: "grayscale(100%)", transition: "all 0.7s" }}
                  className="map-img"
                />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ backgroundColor: "white", padding: "0.75rem 1.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.75rem", borderTop: "2px solid var(--primary)" }}>
                    View on Google Maps
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        .map-img:hover { opacity: 1 !important; filter: grayscale(0) !important; }
      `}</style>
    </div>
  );
}
