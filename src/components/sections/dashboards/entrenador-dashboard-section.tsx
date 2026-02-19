import DashboardShell from "@/components/dashboards/_shared/dashboard-shell";
import CoachDashboard from "@/components/dashboards/entrenador/coach-dashboard";

export default function EntrenadorDashboardSection() {
  return (
    <DashboardShell
      roleLabel="Entrenador"
      title="Dashboard de entrenador"
      subtitle="Carga nadadores, registra pruebas y administra su plantel."
    >
      <CoachDashboard />
    </DashboardShell>
  );
}
