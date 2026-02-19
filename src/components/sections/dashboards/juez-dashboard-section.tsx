import DashboardShell from "@/components/dashboards/_shared/dashboard-shell";
import JudgeDashboard from "@/components/dashboards/juez/judge-dashboard";

export default function JuezDashboardSection() {
  return (
    <DashboardShell
      roleLabel="Juez de carril"
      title="Dashboard del juez"
      subtitle="Cronometraje por carril con control de pausa y corte de tiempo."
    >
      <JudgeDashboard />
    </DashboardShell>
  );
}
