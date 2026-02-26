"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer/footer";

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideMarketingChrome = pathname.startsWith("/dashboard/organizador");

  if (hideMarketingChrome) return <>{children}</>;

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6">{children}</main>
      <Footer />
    </div>
  );
}
