import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevSpace — Vitrine B2B & Projets de Fatiha BAH-TOURE",
  description: "Découvrez mes réalisations en vidéo, ma stack technique et démarrez une collaboration.",
};


// Signature typée standard pour le RootLayout en Next.js 15
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-[#09090b]">
        {children}
      </body>
    </html>
  );
}
