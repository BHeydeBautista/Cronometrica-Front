import DashboardShell from "@/components/dashboards/_shared/dashboard-shell";
import InstitutionDashboard from "@/components/dashboards/institucion/institution-dashboard";

export default function InstitucionDashboardSection() {
  return (
    <DashboardShell
      roleLabel="Institución"
      title="Dashboard de institución"
      subtitle="Administra entrenadores, plantel y puntos totales del club."
    >
      <InstitutionDashboard />
    </DashboardShell>
  );
}
