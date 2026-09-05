import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LegacyRouteRedirect from "@/components/LegacyRouteRedirect";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToHash from "@/components/ScrollToHash";
import SeoManager from "@/seo/SeoManager";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ControleAcces = lazy(() => import("./pages/securite-electronique/ControleAcces"));
const Videosurveillance = lazy(() => import("./pages/securite-electronique/Videosurveillance"));
const AlarmeAntiIntrusion = lazy(() => import("./pages/securite-electronique/AlarmeAntiIntrusion"));
const ProtectionIncendie = lazy(() => import("./pages/securite-electronique/ProtectionIncendie"));
const SecuritePeripherique = lazy(() => import("./pages/securite-electronique/SecuritePeripherique"));
const SerruresBatiments = lazy(() => import("./pages/securite-electronique/SerruresBatiments"));

const FirewallVpn = lazy(() => import("./pages/cybersecurite/FirewallVpn"));
const DetectionIntrusion = lazy(() => import("./pages/cybersecurite/DetectionIntrusion"));
const SocSupervision = lazy(() => import("./pages/cybersecurite/SocSupervision"));
const AuditSecurite = lazy(() => import("./pages/cybersecurite/AuditSecurite"));
const Sensibilisation = lazy(() => import("./pages/cybersecurite/Sensibilisation"));
const PlanReprise = lazy(() => import("./pages/cybersecurite/PlanReprise"));

const ReseauxLanWan = lazy(() => import("./pages/infrastructures-reseaux/ReseauxLanWan"));
const CablageStructure = lazy(() => import("./pages/infrastructures-reseaux/CablageStructure"));
const WifiEntreprise = lazy(() => import("./pages/infrastructures-reseaux/WifiEntreprise"));
const Virtualisation = lazy(() => import("./pages/infrastructures-reseaux/Virtualisation"));
const FirewallReseau = lazy(() => import("./pages/infrastructures-reseaux/FirewallReseau"));
const CloudHybride = lazy(() => import("./pages/infrastructures-reseaux/CloudHybride"));

const MaintenancePreventive = lazy(() => import("./pages/gestion-parc/MaintenancePreventive"));
const Helpdesk = lazy(() => import("./pages/gestion-parc/Helpdesk"));
const SupervisionProactive = lazy(() => import("./pages/gestion-parc/SupervisionProactive"));
const InventaireSuivi = lazy(() => import("./pages/gestion-parc/InventaireSuivi"));
const MigrationPostes = lazy(() => import("./pages/gestion-parc/MigrationPostes"));
const GestionLicences = lazy(() => import("./pages/gestion-parc/GestionLicences"));

const ApplicationsWeb = lazy(() => import("./pages/developpement/ApplicationsWeb"));
const ApplicationsMobiles = lazy(() => import("./pages/developpement/ApplicationsMobiles"));
const ApiIntegrations = lazy(() => import("./pages/developpement/ApiIntegrations"));
const ErpSurMesure = lazy(() => import("./pages/developpement/ErpSurMesure"));
const CrmRelationClient = lazy(() => import("./pages/developpement/CrmRelationClient"));
const BusinessIntelligence = lazy(() => import("./pages/developpement/BusinessIntelligence"));

const ServeursStockage = lazy(() => import("./pages/distribution/ServeursStockage"));
const PostesTravail = lazy(() => import("./pages/distribution/PostesTravail"));
const EquipementsReseau = lazy(() => import("./pages/distribution/EquipementsReseau"));
const Peripheriques = lazy(() => import("./pages/distribution/Peripheriques"));
const LicencesLogiciellesDistribution = lazy(() => import("./pages/distribution/LicencesLogiciellesDistribution"));
const ImportExport = lazy(() => import("./pages/distribution/ImportExport"));

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <SeoManager />
      <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Chargement de la page" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/about" element={<LegacyRouteRedirect to="/a-propos" />} />
          <Route path="/projets" element={<Projects />} />
          <Route path="/projects" element={<LegacyRouteRedirect to="/projets" />} />
          <Route path="/projets/:slug" element={<ProjectDetail />} />
          <Route path="/projects/:slug" element={<LegacyRouteRedirect to="/projets/:slug" />} />
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
      </Suspense>
    </BrowserRouter>
  </>
);

export default App;
