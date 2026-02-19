import { Suspense } from "react";
import JuezDashboardSection from "@/components/sections/dashboards/juez-dashboard-section";

export default function JuezDashboardPage() {
  return (
    <Suspense fallback={<div className="text-sm text-foreground/70">Cargando…</div>}>
      <JuezDashboardSection />
    </Suspense>
  );
}
