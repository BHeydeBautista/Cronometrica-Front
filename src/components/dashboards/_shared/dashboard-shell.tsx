import Link from "next/link";
import type { ReactNode } from "react";

import DashboardNav from "@/components/dashboards/_shared/dashboard-nav";

type DashboardShellProps = {
  title: string;
  subtitle?: string;
  roleLabel: string;
  children: ReactNode;
};

export default function DashboardShell({
  title,
  subtitle,
  roleLabel,
  children,
}: DashboardShellProps) {
  return (
    <div className="py-10 sm:py-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium text-foreground/60">{roleLabel}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/70">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-full border border-foreground/15 px-4 text-sm font-medium hover:border-foreground/25"
          >
            Volver al inicio
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-foreground/10 bg-foreground/5 p-5">
          <p className="text-sm font-medium">Dashboards</p>
          <DashboardNav />

          <div className="mt-6 rounded-xl border border-foreground/10 p-4">
            <p className="text-xs font-medium text-foreground/60">Nota</p>
            <p className="mt-1 text-sm leading-6 text-foreground/70">
              Borrador para presentación. Datos y acciones son de ejemplo.
            </p>
          </div>
        </aside>

        <section className="fade-in-up rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
          {children}
        </section>
      </div>
    </div>
  );
}
