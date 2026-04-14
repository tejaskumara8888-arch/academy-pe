"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stories = [
  {
    name: "Pritam Majhi",
    role: "Backoffice @ AMS Pvt Ltd",
    quote:
      "With the dedicated guidance from Academy P&E, I seamlessly transitioned into a stable corporate environment. The training refined my administrative skills, landing me a vital role at AMS Pvt Ltd.",
    image: "/images/success/pritam.jpeg",
  },
  {
    name: "Pinky Chakraborty",
    role: "Work From Home @ Techno Services",
    quote:
      "Academy P&E understood my need for flexibility without compromising on career growth. They connected me with Techno Services, where I now manage operations remotely with complete confidence.",
    image: "/images/success/pinky.jpeg",
  },
  {
    name: "Souvik Das",
    role: "Backoffice @ DEB Infotech",
    quote:
      "The comprehensive support from the Academy equipped me with the organizational skills required for the modern IT sector. I am now thriving in my backoffice role at DEB Infotech.",
    image: "/images/success/souvik.jpeg",
  },
  {
    name: "Monojit Sarkar",
    role: "Backoffice @ Boichitra India",
    quote:
      "Finding the right fit was crucial for me. Academy P&E's tailored placement approach bridged the gap between my potential and the industry, securing my position at Boichitra India.",
    image: "/images/success/monojit.jpeg",
  },
  {
    name: "Rohan Bhattacharya",
    role: "Customer Executive @ PS Technology",
    quote:
      "Communication and client relations are my core strengths, and Academy P&E helped me channel them professionally. I now drive customer success at PS Technology Pvt Ltd.",
    image: "/images/success/rohan.jpeg",
  },
  {
    name: "Puja Sahoo",
    role: "Nurse @ Rista Foundation",
    quote:
      "The Academy's network extends beyond traditional corporate roles. They helped me secure a fulfilling position in mental health where I can provide essential care and make a real difference.",
    image: "/images/success/puja.jpeg",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* Hero Banner */}
      <header style={{ backgroundColor: "var(--secondary)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div className="animate-fade-in-up" style={{ maxWidth: "48rem" }}>
            <h1
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--primary)",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                marginBottom: "1rem",
              }}
            >
              Empowerment in Action
            </h1>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Our Success Stories
            </h2>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#d1d5db",
                borderLeft: "4px solid var(--primary)",
                paddingLeft: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              Meet the professionals who transformed their careers and secured
              their future through the Academy of Progress and Establishment.
            </p>
          </div>
        </div>
      </header>

      {/* Stories Grid */}
      <main style={{ flex: 1, backgroundColor: "var(--tertiary)", padding: "6rem 0" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "3rem",
            }}
          >
            {stories.map((story) => (
              <StoryCard key={story.name} {...story} />
            ))}
          </div>
        </div>
      </main>

      {/* CTA Banner */}
      <section
        style={{
          backgroundColor: "var(--secondary)",
          padding: "5rem 0",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 2rem" }}>
          <h3
            style={{
              fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              color: "white",
              marginBottom: "2rem",
            }}
          >
            Ready to write your own success story?
          </h3>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              backgroundColor: "var(--primary)",
              color: "white",
              padding: "1rem 2.5rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "white";
              (e.currentTarget as HTMLElement).style.color = "var(--secondary)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
          >
            Apply Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StoryCard({
  name,
  role,
  quote,
  image,
}: {
  name: string;
  role: string;
  quote: string;
  image: string;
}) {
  return (
    <div
      className="story-card"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        border: "1px solid var(--border)",
        overflow: "hidden",
        transition: "box-shadow 0.5s",
      }}
      onMouseOver={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow =
          "0 25px 50px rgba(0,0,0,0.15)")
      }
      onMouseOut={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = "none")
      }
    >
      {/* Photo */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/3",
          backgroundColor: "#e2e8f0",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: "cover", transition: "transform 0.7s" }}
          className="story-img"
          onError={(e) => {
            // Fallback to a placeholder if image not found
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Orange overlay on hover */}
        <div
          className="story-overlay"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(242,106,54,0.2)",
            opacity: 0,
            transition: "opacity 0.5s",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "2.5rem", flex: 1, position: "relative" }}>
        {/* Orange left bar */}
        <div
          className="story-bar"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: 0,
            backgroundColor: "var(--primary)",
            transition: "height 0.5s",
          }}
        />
        <h4
          className="story-name"
          style={{
            fontSize: "1.5rem",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            color: "var(--secondary)",
            marginBottom: "0.5rem",
            transition: "color 0.3s",
          }}
        >
          {name}
        </h4>
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--primary)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "1.5rem",
          }}
        >
          {role}
        </p>
        <p
          style={{
            color: "var(--muted-foreground)",
            lineHeight: 1.7,
            fontStyle: "italic",
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <style>{`
        .story-card:hover .story-img { transform: scale(1.05); }
        .story-card:hover .story-overlay { opacity: 1; }
        .story-card:hover .story-bar { height: 100%; }
        .story-card:hover .story-name { color: var(--primary); }
      `}</style>
    </div>
  );
}
