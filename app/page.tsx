"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", height: "600px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <Image
          src="https://i.ibb.co/DPpPrLGM/bg.jpg"
          alt="Hero Background"
          fill
          style={{ objectFit: "cover", filter: "brightness(0.4)" }}
          priority
        />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "0 2rem", width: "100%" }}>
          <div className="animate-fade-in-left" style={{ maxWidth: "42rem" }}>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontFamily: "var(--font-heading)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Navigate Your Next with Digital Excellence
            </h1>
            <p style={{ fontSize: "1.25rem", color: "#d1d5db", marginBottom: "2rem", borderLeft: "4px solid var(--primary)", paddingLeft: "1.5rem" }}>
              Academy of Progress and Establishment: Empowering enterprises to thrive in a digital-first world through innovation and strategic insight.
            </p>
            <a
              href="#services"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", backgroundColor: "var(--primary)", color: "white", padding: "1rem 2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", transition: "transform 0.3s" }}
              onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateX(8px)")}
              onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateX(0)")}
            >
              Explore More →
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ backgroundColor: "var(--tertiary)", padding: "6rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4rem", gap: "2rem" }}>
            <div style={{ maxWidth: "36rem" }}>
              <h2 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: "1rem" }}>Our Expertise</h2>
              <h3 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--secondary)" }}>
                Revolutionizing Manpower Through Technology
              </h3>
            </div>
            <a href="#" style={{ color: "var(--primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              View All Services +
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", border: "1px solid var(--border)", backgroundColor: "white", boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}>
            {[
              { icon: "lucide:zap", title: "Start Your Career Today", desc: "Immediate job openings across multiple industries. No long waiting — apply now and get placed fast." },
              { icon: "lucide:activity", title: "Skilled & High-Paying Jobs", desc: "Get access to verified companies hiring for technical, industrial, and operations roles with competitive salaries." },
              { icon: "lucide:shield", title: "Office, Retail & Customer Roles", desc: "Secure jobs in corporate offices, retail, and service sectors. Freshers and experienced candidates welcome." },
            ].map((card, i) => (
              <ServiceCard key={i} {...card} border={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: "6rem 0", backgroundColor: "white", overflow: "hidden" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4rem" }}>
            <div style={{ flex: "1 1 400px", position: "relative" }}>
              <div style={{ position: "absolute", top: "-2.5rem", left: "-2.5rem", width: "10rem", height: "10rem", backgroundColor: "var(--tertiary)", zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                  alt="Team Work"
                  width={800}
                  height={500}
                  style={{ width: "100%", height: "500px", objectFit: "cover", boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                />
              </div>
              <div style={{ position: "absolute", bottom: "2.5rem", right: "-2.5rem", backgroundColor: "var(--primary)", padding: "2rem", color: "white", maxWidth: "18rem" }} className="stat-badge">
                <p style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "0.5rem" }}>25+</p>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Years of Global Excellence in Transformation</p>
              </div>
            </div>
            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: "1rem" }}>About Us</h2>
              <h3 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--secondary)", marginBottom: "2rem", lineHeight: 1.2 }}>
                We help people build a foundation for the future.
              </h3>
              <p style={{ fontSize: "1.125rem", color: "var(--muted-foreground)", marginBottom: "2rem", lineHeight: 1.7 }}>
                At the Academy of Progress and Establishment, we believe in the power of digital transformation to create a better, more sustainable world. Our approach combines industry-leading expertise with communication and technology to drive growth.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
                {["Strategic Consulting & Advisory", "Cloud Infrastructure & Operations", "Experience Design & Personal Support"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--secondary)", fontWeight: 600 }}>
                    <span style={{ color: "var(--primary)", fontSize: "1.25rem" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <button style={{ border: "2px solid var(--secondary)", color: "var(--secondary)", padding: "0.75rem 2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", backgroundColor: "transparent", transition: "all 0.2s" }}
                onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--secondary)"; }}>
                Learn Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .stat-badge { display: none; }
        }
      `}</style>
    </div>
  );
}

function ServiceCard({ icon, title, desc, border }: { icon: string; title: string; desc: string; border: boolean }) {
  return (
    <div
      className="service-card"
      style={{
        position: "relative",
        padding: "3rem",
        borderRight: border ? "1px solid var(--border)" : "none",
        cursor: "pointer",
        overflow: "hidden",
        transition: "background-color 0.5s",
      }}
    >
      {/* @ts-expect-error iconify */}
      <iconify-icon icon={icon} style={{ fontSize: "2.5rem", color: "var(--primary)", marginBottom: "2rem", display: "block" }} />
      <h4 style={{ fontSize: "1.5rem", fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>{title}</h4>
      <p style={{ color: "var(--muted-foreground)", marginBottom: "2rem", lineHeight: 1.6 }}>{desc}</p>
      {/* @ts-expect-error iconify */}
      <iconify-icon icon="lucide:arrow-right" style={{ fontSize: "1.5rem", color: "var(--primary)" }} />
      <div className="service-bar" style={{ position: "absolute", bottom: 0, left: 0, width: "4px", height: 0, backgroundColor: "var(--primary)", transition: "height 0.5s" }} />
      <style>{`
        .service-card:hover { background-color: var(--secondary); color: white; }
        .service-card:hover iconify-icon { color: white !important; }
        .service-card:hover p { color: #d1d5db; }
        .service-card:hover .service-bar { height: 100%; }
        @media (max-width: 768px) {
          .service-card { border-right: none !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </div>
  );
}
