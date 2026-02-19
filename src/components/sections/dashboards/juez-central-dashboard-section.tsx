import DashboardShell from "@/components/dashboards/_shared/dashboard-shell";
import CentralJudgeDashboard from "@/components/dashboards/juez-central/central-judge-dashboard";

export default function JuezCentralDashboardSection() {
  return (
    <DashboardShell
      roleLabel="Juez central"
      title="Dashboard del juez central"
      subtitle="Inicia cronómetros globalmente y recibe cortes por carril en tiempo real."
    >
      <CentralJudgeDashboard />
    </DashboardShell>
  );
}
