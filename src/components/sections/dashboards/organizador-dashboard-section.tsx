import DashboardShell from "@/components/dashboards/_shared/dashboard-shell";
import OrganizerDashboard from "@/components/dashboards/organizador/organizer-dashboard";

export default function OrganizadorDashboardSection() {
  return (
    <DashboardShell
      roleLabel="Organizador"
      title="Dashboard del organizador"
      subtitle="Crea eventos por jornada, define carriles habilitados y asigna jueces."
    >
      <OrganizerDashboard />
    </DashboardShell>
  );
}
