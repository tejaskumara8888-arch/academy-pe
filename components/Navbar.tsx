"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Navigate Your Next", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "About Us", href: "/#about" },
];

// Searchable pages — extend this list as you add more pages
const SEARCH_INDEX = [
  { title: "Home", href: "/", description: "Navigate your next with digital excellence" },
  { title: "Success Stories", href: "/success-stories", description: "Meet professionals who transformed their careers" },
  { title: "Contact Us", href: "/contact", description: "Get in touch with our strategic consultants" },
  { title: "Services — Tech & Digital", href: "/#services", description: "Specialized technical staffing for the modern digital landscape" },
  { title: "Services — Engineering", href: "/#services", description: "Skilled technical personnel for manufacturing and logistics" },
  { title: "Services — Corporate & Finance", href: "/#services", description: "Back-office support and customer-facing professionals" },
  { title: "About Us", href: "/#about", description: "25+ years of global excellence in transformation" },
  { title: "Pritam Majhi — Success Story", href: "/success-stories", description: "Backoffice at AMS Pvt Ltd" },
  { title: "Pinky Chakraborty — Success Story", href: "/success-stories", description: "Work From Home at Techno Services" },
  { title: "Puja Sahoo — Success Story", href: "/success-stories", description: "Nurse at Rista Foundation" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(SEARCH_INDEX);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when mobile menu or search is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  // Focus search input when overlay opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
      setSearchResults(SEARCH_INDEX);
    }
  }, [searchOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleSearch(q: string) {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults(SEARCH_INDEX);
      return;
    }
    const lower = q.toLowerCase();
    setSearchResults(
      SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower)
      )
    );
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchResults.length > 0) {
      router.push(searchResults[0].href);
      setSearchOpen(false);
    }
  }

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "" || base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <>
      {/* ── Main Navbar ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: "1.4rem",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: "var(--secondary)",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            ACADEMY <span style={{ color: "var(--primary)" }}>P&amp;E</span>
          </Link>

          {/* Desktop nav links — hidden below 1024px via CSS */}
          <div
            className="ape-desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  color: isActive(href) ? "var(--primary)" : "var(--foreground)",
                  borderBottom: isActive(href)
                    ? "2px solid var(--primary)"
                    : "2px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.color = isActive(href)
                    ? "var(--primary)"
                    : "var(--foreground)";
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right-side actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            {/* Search icon button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.4rem",
                color: "var(--foreground)",
                transition: "color 0.2s",
              }}
              onMouseOver={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--primary)")
              }
              onMouseOut={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--foreground)")
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Contact Us button — hidden on very small screens */}
            <Link
              href="/contact"
              className="ape-contact-btn"
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "0.5rem 1.25rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                textDecoration: "none",
                transition: "background-color 0.2s",
                whiteSpace: "nowrap",
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

            {/* Hamburger button — visible only below 1024px */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="ape-hamburger"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "var(--secondary)",
                  transition: "all 0.3s",
                  transform: mobileOpen
                    ? "translateY(7px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "var(--secondary)",
                  transition: "all 0.3s",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  backgroundColor: "var(--secondary)",
                  transition: "all 0.3s",
                  transform: mobileOpen
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown menu ── */}
        <div
          className="ape-mobile-menu"
          style={{
            overflow: "hidden",
            maxHeight: mobileOpen ? "520px" : "0",
            transition: "max-height 0.35s ease",
            backgroundColor: "white",
            borderTop: mobileOpen ? "1px solid var(--border)" : "none",
          }}
        >
          <div
            style={{
              padding: "0.75rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  padding: "1rem 0",
                  borderBottom: "1px solid var(--border)",
                  color: isActive(href) ? "var(--primary)" : "var(--foreground)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {label}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: "1.25rem",
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "0.875rem",
                textAlign: "center",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                textDecoration: "none",
                fontSize: "0.8rem",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(15,23,42,0.88)",
            backdropFilter: "blur(6px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8vh 1rem 2rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "640px",
              animation: "apeSearchIn 0.25s ease",
            }}
          >
            {/* Search input */}
            <form
              onSubmit={handleSearchSubmit}
              style={{ position: "relative", marginBottom: "1rem" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  left: "1.25rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search pages, services, stories..."
                style={{
                  width: "100%",
                  padding: "1.1rem 3.5rem 1.1rem 3.25rem",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderTop: "3px solid var(--primary)",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  style={{
                    position: "absolute",
                    right: "1.25rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    fontSize: "1.4rem",
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  ×
                </button>
              )}
            </form>

            {/* Result count label */}
            <p
              style={{
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
                paddingLeft: "0.25rem",
              }}
            >
              {searchQuery
                ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""}`
                : "Quick links"}
            </p>

            {/* Results list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                maxHeight: "55vh",
                overflowY: "auto",
              }}
            >
              {searchResults.length === 0 ? (
                <div
                  style={{
                    padding: "2.5rem",
                    textAlign: "center",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "0.9rem",
                  }}
                >
                  No results for &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                searchResults.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      padding: "0.9rem 1.25rem",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      textDecoration: "none",
                      borderLeft: "3px solid transparent",
                      transition: "all 0.15s",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(242,106,54,0.15)";
                      (e.currentTarget as HTMLElement).style.borderLeftColor =
                        "var(--primary)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLElement).style.borderLeftColor =
                        "transparent";
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          color: "white",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {highlight(item.title, searchQuery)}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.775rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {highlight(item.description, searchQuery)}
                      </div>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="2.5"
                      style={{ flexShrink: 0 }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ))
              )}
            </div>

            <p
              style={{
                marginTop: "1.25rem",
                textAlign: "center",
                fontSize: "0.68rem",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Press{" "}
              <kbd
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  padding: "2px 7px",
                  borderRadius: "3px",
                  fontFamily: "monospace",
                }}
              >
                Esc
              </kbd>{" "}
              to close
            </p>
          </div>
        </div>
      )}

      <style>{`
        /* Desktop ≥1024px: show nav links, hide hamburger */
        @media (min-width: 1024px) {
          .ape-desktop-nav { display: flex !important; }
          .ape-hamburger   { display: none  !important; }
          .ape-mobile-menu { display: none  !important; }
          .ape-contact-btn { display: inline-block !important; }
        }
        /* Mobile <1024px: hide nav links, show hamburger */
        @media (max-width: 1023px) {
          .ape-desktop-nav { display: none  !important; }
          .ape-hamburger   { display: flex  !important; }
        }
        /* Hide Contact Us button on very small screens (it lives in the mobile menu) */
        @media (max-width: 480px) {
          .ape-contact-btn { display: none !important; }
        }

        @keyframes apeSearchIn {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Placeholder colour for search input */
        .ape-search-input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </>
  );
}

/** Highlights matching substring in orange */
function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: "var(--primary)", fontWeight: 800 }}>
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
}
