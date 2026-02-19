import HeroSection from "@/components/sections/herosection";
import DashboardLinksSection from "@/components/sections/dashboardlinkssection";
import HowItWorksSection from "@/components/sections/howitworkssection";
import OrganizationSection from "@/components/sections/organizationsection";
import ContactSection from "@/components/sections/contactsection";

export default function Home() {
  return (
    <div className="py-10 sm:py-14">
      <HeroSection />

      <DashboardLinksSection />
      <HowItWorksSection />
      <OrganizationSection />
      <ContactSection />
    </div>
  );
}
