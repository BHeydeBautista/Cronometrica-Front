"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard/institucion", label: "Institución" },
  { href: "/dashboard/entrenador", label: "Entrenador" },
  { href: "/dashboard/juez-central", label: "Juez central" },
  { href: "/dashboard/juez", label: "Juez (carril)" },
  { href: "/dashboard/organizador", label: "Organizador" },
] as const;

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-3 flex flex-col gap-2 text-sm">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              "rounded-lg px-3 py-2 transition-colors " +
              (isActive
                ? "bg-brand-soft text-foreground"
                : "text-foreground/80 hover:bg-foreground/10 hover:text-foreground")
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
