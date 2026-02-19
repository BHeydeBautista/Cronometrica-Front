import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cronómetro de Natación",
  description:
    "Organización de competencias de natación: cronometraje por carril, carga de nadadores, resultados y puntos por club.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <div className="min-h-dvh">
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
