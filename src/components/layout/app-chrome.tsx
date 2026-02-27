"use client";

import type { ReactNode } from "react";

import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer/footer";

export default function AppChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6">{children}</main>
      <Footer />
    </div>
  );
}
