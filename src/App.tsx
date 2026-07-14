import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ControleAcces from "./pages/securite-electronique/ControleAcces";
import Videosurveillance from "./pages/securite-electronique/Videosurveillance";
import AlarmeAntiIntrusion from "./pages/securite-electronique/AlarmeAntiIntrusion";
import ProtectionIncendie from "./pages/securite-electronique/ProtectionIncendie";
import SecuritePeripherique from "./pages/securite-electronique/SecuritePeripherique";
import SerruresBatiments from "./pages/securite-electronique/SerruresBatiments";

// Cybersécurité
import FirewallVpn from "./pages/cybersecurite/FirewallVpn";
import DetectionIntrusion from "./pages/cybersecurite/DetectionIntrusion";
import SocSupervision from "./pages/cybersecurite/SocSupervision";
import AuditSecurite from "./pages/cybersecurite/AuditSecurite";
import Sensibilisation from "./pages/cybersecurite/Sensibilisation";
import PlanReprise from "./pages/cybersecurite/PlanReprise";

// Infrastructures & Réseaux
import ReseauxLanWan from "./pages/infrastructures-reseaux/ReseauxLanWan";
import CablageStructure from "./pages/infrastructures-reseaux/CablageStructure";
import WifiEntreprise from "./pages/infrastructures-reseaux/WifiEntreprise";
import Virtualisation from "./pages/infrastructures-reseaux/Virtualisation";
import FirewallReseau from "./pages/infrastructures-reseaux/FirewallReseau";
import CloudHybride from "./pages/infrastructures-reseaux/CloudHybride";

// Gestion de Parc
import MaintenancePreventive from "./pages/gestion-parc/MaintenancePreventive";
import Helpdesk from "./pages/gestion-parc/Helpdesk";
import SupervisionProactive from "./pages/gestion-parc/SupervisionProactive";
import InventaireSuivi from "./pages/gestion-parc/InventaireSuivi";
import MigrationPostes from "./pages/gestion-parc/MigrationPostes";
import GestionLicences from "./pages/gestion-parc/GestionLicences";

// Développement
import ApplicationsWeb from "./pages/developpement/ApplicationsWeb";
import ApplicationsMobiles from "./pages/developpement/ApplicationsMobiles";
import ApiIntegrations from "./pages/developpement/ApiIntegrations";
import ErpSurMesure from "./pages/developpement/ErpSurMesure";
import CrmRelationClient from "./pages/developpement/CrmRelationClient";
import BusinessIntelligence from "./pages/developpement/BusinessIntelligence";

// Distribution
import ServeursStockage from "./pages/distribution/ServeursStockage";
import PostesTravail from "./pages/distribution/PostesTravail";
import EquipementsReseau from "./pages/distribution/EquipementsReseau";
import Peripheriques from "./pages/distribution/Peripheriques";
import LicencesLogiciellesDistribution from "./pages/distribution/LicencesLogiciellesDistribution";
import ImportExport from "./pages/distribution/ImportExport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Sécurité Électronique */}
          <Route path="/services/securite-electronique/controle-acces" element={<ControleAcces />} />
          <Route path="/services/securite-electronique/videosurveillance" element={<Videosurveillance />} />
          <Route path="/services/securite-electronique/alarme-anti-intrusion" element={<AlarmeAntiIntrusion />} />
          <Route path="/services/securite-electronique/protection-incendie" element={<ProtectionIncendie />} />
          <Route path="/services/securite-electronique/securite-peripherique" element={<SecuritePeripherique />} />
          <Route path="/services/securite-electronique/serrures-batiments" element={<SerruresBatiments />} />

          {/* Cybersécurité */}
          <Route path="/services/cybersecurite/firewall-vpn" element={<FirewallVpn />} />
          <Route path="/services/cybersecurite/detection-intrusion" element={<DetectionIntrusion />} />
          <Route path="/services/cybersecurite/soc-supervision" element={<SocSupervision />} />
          <Route path="/services/cybersecurite/audit-securite" element={<AuditSecurite />} />
          <Route path="/services/cybersecurite/sensibilisation" element={<Sensibilisation />} />
          <Route path="/services/cybersecurite/plan-reprise" element={<PlanReprise />} />

          {/* Infrastructures & Réseaux */}
          <Route path="/services/infrastructures-reseaux/reseaux-lan-wan" element={<ReseauxLanWan />} />
          <Route path="/services/infrastructures-reseaux/cablage-structure" element={<CablageStructure />} />
          <Route path="/services/infrastructures-reseaux/wifi-entreprise" element={<WifiEntreprise />} />
          <Route path="/services/infrastructures-reseaux/virtualisation" element={<Virtualisation />} />
          <Route path="/services/infrastructures-reseaux/firewall-reseau" element={<FirewallReseau />} />
          <Route path="/services/infrastructures-reseaux/cloud-hybride" element={<CloudHybride />} />

          {/* Gestion de Parc */}
          <Route path="/services/gestion-parc/maintenance-preventive" element={<MaintenancePreventive />} />
          <Route path="/services/gestion-parc/helpdesk" element={<Helpdesk />} />
          <Route path="/services/gestion-parc/supervision-proactive" element={<SupervisionProactive />} />
          <Route path="/services/gestion-parc/inventaire-suivi" element={<InventaireSuivi />} />
          <Route path="/services/gestion-parc/migration-postes" element={<MigrationPostes />} />
          <Route path="/services/gestion-parc/gestion-licences" element={<GestionLicences />} />

          {/* Développement */}
          <Route path="/services/developpement/applications-web" element={<ApplicationsWeb />} />
          <Route path="/services/developpement/applications-mobiles" element={<ApplicationsMobiles />} />
          <Route path="/services/developpement/api-integrations" element={<ApiIntegrations />} />
          <Route path="/services/developpement/erp-sur-mesure" element={<ErpSurMesure />} />
          <Route path="/services/developpement/crm-relation-client" element={<CrmRelationClient />} />
          <Route path="/services/developpement/business-intelligence" element={<BusinessIntelligence />} />

          {/* Distribution */}
          <Route path="/services/distribution/serveurs-stockage" element={<ServeursStockage />} />
          <Route path="/services/distribution/postes-travail" element={<PostesTravail />} />
          <Route path="/services/distribution/equipements-reseau" element={<EquipementsReseau />} />
          <Route path="/services/distribution/peripheriques" element={<Peripheriques />} />
          <Route path="/services/distribution/licences-logicielles" element={<LicencesLogiciellesDistribution />} />
          <Route path="/services/distribution/import-export" element={<ImportExport />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
