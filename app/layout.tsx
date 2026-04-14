import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Academy P&E — Navigate Your Next",
  description:
    "Academy of Progress and Establishment: Empowering enterprises to thrive in a digital-first world through innovation and strategic insight.",
  openGraph: {
    title: "Academy P&E — Navigate Your Next",
    description:
      "Empowering enterprises through digital transformation, AI, and strategic consulting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"
          defer
        />
      </head>
      <body className={`${jakarta.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
