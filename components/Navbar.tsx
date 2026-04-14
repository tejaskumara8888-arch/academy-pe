"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 2rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "3rem" }}>
          <Link
            href="/"
            style={{
              fontSize: "1.5rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "var(--secondary)",
              textDecoration: "none",
            }}
          >
            ACADEMY <span style={{ color: "var(--primary)" }}>P&amp;E</span>
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
            }}
            className="nav-links"
          >
            {[
              ["Navigate Your Next", "/"],
              ["Services", "/#services"],
              ["Success Stories", "/success-stories"],
              ["About Us", "/#about"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color:
                    pathname === href ? "var(--primary)" : "var(--foreground)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--primary)")
                }
                onMouseOut={(e) =>
                  ((e.target as HTMLElement).style.color =
                    pathname === href ? "var(--primary)" : "var(--foreground)")
                }
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* @ts-expect-error iconify */}
          <iconify-icon
            icon="lucide:search"
            style={{ fontSize: "1.25rem", cursor: "pointer" }}
          />
          <Link
            href="/contact"
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
              padding: "0.5rem 1.5rem",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--secondary)")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "var(--primary)")
            }
          >
            Contact Us
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
