export const SITE_URL = "https://www.dps-it.ma";
export const SITE_NAME = "DigitalPro Systems IT";
export const DEFAULT_IMAGE = `${SITE_URL}/og-dps-it.webp`;

export const BUSINESS = {
  name: SITE_NAME,
  legalName: SITE_NAME,
  telephone: "+212766218598",
  email: "contact@dps-it.ma",
  streetAddress: "82 Angle Rue Soumaya et Boulevard Abdelmoumen, Résidence Shéhérazade 1, étage 3 n°13",
  postalCode: "20340",
  addressLocality: "Casablanca",
  addressCountry: "MA",
};

const page = (path, title, description, name, type = "website") => ({
  path,
  title,
  description,
  name,
  type,
});

const service = (path, name, description) =>
  page(path, `${name} à Casablanca | DPS IT`, description, name, "service");

export const SEO_ROUTES = [
  page(
    "/",
    "Solutions IT & sécurité électronique Casablanca | DPS IT",
    "DigitalPro Systems IT sécurise, connecte et digitalise les entreprises au Maroc : vidéosurveillance, cybersécurité, réseaux, infogérance, ERP et applications sur mesure.",
    SITE_NAME,
  ),
  page(
    "/services/",
    "Services IT & sécurité pour entreprises au Maroc | DPS IT",
    "Découvrez nos services à Casablanca et partout au Maroc : sécurité électronique, cybersécurité, réseaux, gestion de parc, logiciels sur mesure et matériel informatique.",
    "Services IT et sécurité",
  ),
  page(
    "/a-propos/",
    "Intégrateur IT à Casablanca : notre équipe | DPS IT",
    "Découvrez DigitalPro Systems IT, une équipe marocaine spécialisée en sécurité électronique, infrastructures, cybersécurité et développement de logiciels métier.",
    "À propos de DigitalPro Systems IT",
  ),
  page(
    "/projets/",
    "Projets logiciels & solutions métier au Maroc | DPS IT",
    "Découvrez les logiciels métier conçus par DigitalPro Systems IT : gestion de cabinet médical, point de vente, stock, facturation et gestion commerciale.",
    "Projets DigitalPro Systems IT",
  ),
  page(
    "/contact/",
    "Devis solutions IT & sécurité à Casablanca | DPS IT",
    "Contactez DigitalPro Systems IT pour un audit, un devis ou un projet de sécurité, réseau, cybersécurité, infogérance ou développement logiciel au Maroc.",
    "Contact DigitalPro Systems IT",
  ),
  page(
    "/projets/medoc/",
    "Med'Oc : logiciel de gestion de cabinet médical | DPS IT",
    "Med'Oc centralise patients, rendez-vous, consultations, ordonnances, factures et paiements dans un logiciel de gestion de cabinet médical conçu au Maroc.",
    "Med'Oc",
    "project",
  ),
  page(
    "/projets/dps-pos/",
    "DPS POS : logiciel de caisse et gestion de stock | DPS IT",
    "DPS POS relie encaissement, paiements, stock, caisse et tickets dans un logiciel de point de vente rapide, traçable et fiable pour les commerces.",
    "DPS POS",
    "project",
  ),
  page(
    "/projets/dps-invoice/",
    "DPS Gestion : facturation & gestion commerciale | DPS IT",
    "DPS Gestion relie devis, bons de livraison, factures, règlements, clients et stock dans une plateforme de gestion commerciale cohérente.",
    "DPS Gestion",
    "project",
  ),

  service("/services/securite-electronique/controle-acces/", "Contrôle d'accès entreprise", "Installation de contrôle d'accès par badge, biométrie et gestion centralisée pour sécuriser bureaux, sites industriels et bâtiments professionnels au Maroc."),
  service("/services/securite-electronique/videosurveillance/", "Vidéosurveillance IP entreprise", "Étude, installation et maintenance de caméras IP, enregistreurs et supervision vidéo pour entreprises, commerces et sites sensibles à Casablanca et au Maroc."),
  service("/services/securite-electronique/alarme-anti-intrusion/", "Alarme anti-intrusion professionnelle", "Protection des locaux professionnels avec alarmes anti-intrusion, détecteurs, alertes et intégration à la vidéosurveillance au Maroc."),
  service("/services/securite-electronique/protection-incendie/", "Protection incendie entreprise", "Solutions de détection et d'alerte incendie pour protéger les personnes, les équipements et les bâtiments professionnels selon les contraintes du site."),
  service("/services/securite-electronique/securite-peripherique/", "Sécurité périmétrique", "Sécurisation des accès extérieurs et périmètres sensibles avec détection, contrôle, vidéo et alertes adaptés aux sites professionnels."),
  service("/services/securite-electronique/serrures-batiments/", "Serrures électroniques pour bâtiments", "Installation de serrures électroniques et systèmes de verrouillage connectés pour bureaux, hôtels, résidences et bâtiments professionnels."),

  service("/services/cybersecurite/firewall-vpn/", "Firewall & VPN entreprise", "Déploiement de pare-feu, VPN site-à-site et accès distant sécurisé pour protéger les réseaux et les collaborateurs des entreprises marocaines."),
  service("/services/cybersecurite/detection-intrusion/", "Détection d'intrusion réseau", "Détection et analyse des activités suspectes avec IDS/IPS, journalisation et alertes pour réduire le risque d'intrusion dans votre système d'information."),
  service("/services/cybersecurite/soc-supervision/", "Supervision SOC & sécurité", "Surveillance continue des événements de sécurité, corrélation des alertes et accompagnement à la réponse aux incidents pour les entreprises au Maroc."),
  service("/services/cybersecurite/audit-securite/", "Audit de cybersécurité", "Audit technique et organisationnel, analyse des vulnérabilités et plan de remédiation priorisé pour renforcer la sécurité de votre entreprise."),
  service("/services/cybersecurite/sensibilisation/", "Sensibilisation cybersécurité", "Formations pratiques pour aider vos collaborateurs à reconnaître le phishing, protéger les données et adopter les bons réflexes de cybersécurité."),
  service("/services/cybersecurite/plan-reprise/", "Plan de reprise d'activité informatique", "Conception de PRA, sauvegardes, procédures de restauration et scénarios de continuité pour reprendre rapidement après un incident informatique."),

  service("/services/infrastructures-reseaux/reseaux-lan-wan/", "Réseaux LAN/WAN entreprise", "Conception, déploiement et optimisation de réseaux LAN/WAN fiables pour connecter les équipes, agences, applications et équipements professionnels."),
  service("/services/infrastructures-reseaux/cablage-structure/", "Câblage structuré informatique", "Étude et installation de câblage cuivre et fibre, baies, brassage et certification pour des réseaux professionnels performants et documentés."),
  service("/services/infrastructures-reseaux/wifi-entreprise/", "WiFi entreprise", "Audit de couverture, bornes professionnelles, segmentation et sécurité pour un WiFi stable dans les bureaux, commerces, hôtels et sites industriels."),
  service("/services/infrastructures-reseaux/virtualisation/", "Virtualisation serveurs", "Consolidation et virtualisation des serveurs pour améliorer disponibilité, sauvegarde, utilisation des ressources et continuité d'activité."),
  service("/services/infrastructures-reseaux/firewall-reseau/", "Firewall réseau professionnel", "Architecture et configuration de firewalls réseau avec filtrage, segmentation, haute disponibilité et politiques de sécurité adaptées à votre activité."),
  service("/services/infrastructures-reseaux/cloud-hybride/", "Cloud hybride entreprise", "Architecture cloud hybride reliant infrastructures locales, services cloud, sauvegardes et accès sécurisés selon vos contraintes métier."),

  service("/services/gestion-parc/maintenance-preventive/", "Maintenance informatique préventive", "Maintenance planifiée des postes, serveurs et équipements afin de réduire les pannes, prolonger leur durée de vie et sécuriser la production."),
  service("/services/gestion-parc/helpdesk/", "Helpdesk informatique L1 L2 L3", "Support informatique réactif pour utilisateurs et équipes : diagnostic, assistance à distance, intervention et suivi des incidents jusqu'à résolution."),
  service("/services/gestion-parc/supervision-proactive/", "Supervision informatique proactive", "Surveillance des serveurs, réseaux et services critiques avec alertes et intervention proactive avant que les anomalies ne deviennent des interruptions."),
  service("/services/gestion-parc/inventaire-suivi/", "Inventaire de parc informatique", "Inventaire centralisé des postes, serveurs, logiciels, garanties et affectations pour garder une vision fiable de votre parc informatique."),
  service("/services/gestion-parc/migration-postes/", "Migration de postes informatiques", "Préparation et migration sécurisée des postes, profils, données et applications avec réduction des interruptions pour les utilisateurs."),
  service("/services/gestion-parc/gestion-licences/", "Gestion des licences logicielles", "Suivi des licences, abonnements, renouvellements et conformité afin de maîtriser les coûts et les risques logiciels de votre organisation."),

  service("/services/developpement/applications-web/", "Développement d'applications web", "Conception d'applications web rapides et sécurisées, portails B2B/B2C et outils métier sur mesure pour les entreprises au Maroc."),
  service("/services/developpement/applications-mobiles/", "Développement d'applications mobiles", "Applications mobiles métier pour équipes terrain et clients, connectées à vos données, API, notifications et processus internes."),
  service("/services/developpement/api-integrations/", "Développement API & intégrations", "API sécurisées et intégrations entre ERP, CRM, plateformes web, paiements et services tiers pour supprimer les ressaisies et automatiser les échanges."),
  service("/services/developpement/erp-sur-mesure/", "ERP sur mesure", "Développement d'ERP adapté à vos ventes, achats, stocks, facturation, opérations et tableaux de bord au lieu d'imposer un processus générique."),
  service("/services/developpement/crm-relation-client/", "CRM & gestion de la relation client", "CRM personnalisé pour centraliser prospects, clients, opportunités, relances et historique commercial dans un parcours clair pour vos équipes."),
  service("/services/developpement/business-intelligence/", "Business Intelligence & tableaux de bord", "Tableaux de bord décisionnels, indicateurs et consolidation des données pour suivre les performances et prendre des décisions plus rapidement."),

  service("/services/distribution/serveurs-stockage/", "Serveurs & stockage professionnel", "Conseil et fourniture de serveurs, NAS, SAN, sauvegarde et stockage adaptés aux besoins de disponibilité et de croissance des entreprises."),
  service("/services/distribution/postes-travail/", "Postes de travail professionnels", "Fourniture et préparation de PC fixes et portables professionnels avec configuration, sécurité, déploiement et accompagnement des utilisateurs."),
  service("/services/distribution/equipements-reseau/", "Équipements réseau professionnels", "Switches, routeurs, bornes WiFi, firewalls et accessoires réseau sélectionnés et configurés pour votre architecture d'entreprise."),
  service("/services/distribution/peripheriques/", "Périphériques informatiques professionnels", "Écrans, imprimantes, scanners, onduleurs et périphériques fiables pour équiper les postes et environnements professionnels."),
  service("/services/distribution/licences-logicielles/", "Licences logicielles entreprise", "Fourniture, renouvellement et suivi de licences systèmes, bureautiques, sécurité et logiciels métier pour les organisations au Maroc."),
  service("/services/distribution/import-export/", "Import-export de matériel informatique", "Approvisionnement et importation de matériel informatique professionnel avec conseil, logistique et suivi pour les besoins spécifiques des entreprises."),
];

export const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.split("/").filter(Boolean).join("/")}/`;
};

export const findSeoRoute = (pathname) =>
  SEO_ROUTES.find((route) => route.path === normalizePath(pathname));

export const canonicalUrl = (path) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
