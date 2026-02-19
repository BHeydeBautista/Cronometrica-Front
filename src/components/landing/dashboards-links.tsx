import Link from "next/link";

import { mockDashboards } from "@/data/mock";

function DashboardCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-foreground/10 bg-foreground/5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground/10"
    >
      <p className="text-xs font-medium text-foreground/60">{href}</p>
      <h3 className="mt-2 font-medium tracking-tight group-hover:text-foreground">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-6 text-foreground/70">{description}</p>
      <p className="mt-3 text-sm font-medium text-brand">Abrir</p>
    </Link>
  );
}

export default function DashboardsLinks() {
  return (
    <section id="dashboards" className="fade-in-up mt-10 sm:mt-12">
      <div className="rounded-2xl border border-foreground/10 bg-background p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Dashboards (direcciones)
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/70 sm:text-base">
          Entrá directo a cada panel para ver cómo se vería cada rol.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {mockDashboards.map((d) => (
            <DashboardCard
              key={d.href}
              href={d.href}
              title={d.title}
              description={d.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
