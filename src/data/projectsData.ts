export type ProjectLocale = "fr" | "en";

export type ProjectCapability = {
  title: string;
  body: string;
};

export type ProjectJourneyStep = {
  title: string;
  body: string;
};

export type ProjectStory = {
  category: string;
  status: string;
  headline: string;
  summary: string;
  problem: {
    title: string;
    body: string;
    points: string[];
  };
  solution: {
    title: string;
    body: string;
  };
  capabilities: ProjectCapability[];
  journey: ProjectJourneyStep[];
  outcomes: string[];
  closing: string;
};

export type Project = {
  slug: "medoc" | "dps-pos" | "dps-invoice";
  name: string;
  index: number;
  image: string;
  accent: string;
  accentSoft: string;
  visual: "health" | "pos" | "documents";
  stack: string[];
  content: Record<ProjectLocale, ProjectStory>;
};

export const projects: Project[] = [
  {
    slug: "medoc",
    name: "Med'Oc",
    index: 0,
    image: "/software-bg.png",
    accent: "#2dd4bf",
    accentSoft: "rgba(45, 212, 191, 0.16)",
    visual: "health",
    stack: ["PHP 8", "MySQL", "MVC", "FullCalendar", "Chart.js"],
    content: {
      fr: {
        category: "Santé · Gestion de cabinet",
        status: "Produit métier opérationnel",
        headline: "Le cabinet médical, enfin réuni dans un seul parcours clair.",
        summary:
          "Med'Oc relie l'accueil, le médecin et l'administration autour d'un dossier patient fiable — du rendez-vous à la consultation, puis à l'ordonnance et au règlement.",
        problem: {
          title: "Un cabinet ne devrait pas perdre son temps à recoller l'information.",
          body:
            "Le client travaillait avec des informations dispersées entre agendas, fiches papier, messages et fichiers indépendants. À chaque passage du patient, l'équipe devait rechercher le bon historique, éviter les conflits de rendez-vous, retranscrire les notes et rapprocher manuellement les paiements. Cette fragmentation ralentissait l'accueil et fragilisait la continuité du suivi médical.",
          points: [
            "Des dossiers patients et historiques difficiles à retrouver au bon moment.",
            "Un planning exposé aux doublons et aux conflits d'horaires.",
            "Des consultations, ordonnances et paiements sans fil conducteur commun.",
          ],
        },
        solution: {
          title: "Nous avons conçu le logiciel autour de la journée réelle du cabinet.",
          body:
            "Plutôt que d'empiler des écrans, nous avons modélisé le trajet complet du patient. La secrétaire prépare le rendez-vous, le médecin retrouve immédiatement le contexte clinique, puis la consultation alimente l'ordonnance et la facturation sans ressaisie. Chaque rôle voit les outils dont il a besoin, tandis que les actions sensibles restent protégées et traçables.",
        },
        capabilities: [
          {
            title: "Dossier patient vivant",
            body: "Recherche instantanée, informations essentielles et historique des consultations dans une vue cohérente.",
          },
          {
            title: "Agenda sans collision",
            body: "Planning interactif, visibilité quotidienne et contrôle des conflits avant confirmation.",
          },
          {
            title: "Consultation guidée",
            body: "Diagnostic, notes et ordonnance restent liés au patient et prêts pour l'impression.",
          },
          {
            title: "Encaissement explicable",
            body: "Factures et règlements par espèces, carte ou chèque prolongent naturellement la consultation.",
          },
        ],
        journey: [
          {
            title: "Accueillir",
            body: "Retrouver le patient ou créer son dossier sans interrompre le flux de l'accueil.",
          },
          {
            title: "Planifier",
            body: "Choisir un créneau disponible et protéger le planning contre les chevauchements.",
          },
          {
            title: "Consulter",
            body: "Lire l'historique, documenter le diagnostic et préparer l'ordonnance au même endroit.",
          },
          {
            title: "Finaliser",
            body: "Émettre la facture, enregistrer le règlement et conserver une trace exploitable.",
          },
        ],
        outcomes: [
          "Une source de vérité partagée entre l'accueil, les médecins et l'administration.",
          "Un historique patient continu qui accompagne chaque nouvelle consultation.",
          "Des responsabilités claires grâce aux rôles Admin, Médecin et Secrétaire.",
        ],
        closing:
          "Med'Oc transforme une suite de tâches séparées en une expérience continue, pensée pour laisser plus de place au soin et moins à la recherche d'information.",
      },
      en: {
        category: "Healthcare · Practice management",
        status: "Operational business product",
        headline: "The entire medical practice, connected in one clear workflow.",
        summary:
          "Med'Oc brings reception, practitioners and administration around one dependable patient record — from appointment to consultation, prescription and payment.",
        problem: {
          title: "A practice should not spend its day piecing information back together.",
          body:
            "The client relied on information scattered across calendars, paper files, messages and disconnected documents. At every visit, staff had to locate the right history, avoid scheduling conflicts, re-enter clinical notes and manually reconcile payments. That fragmentation slowed reception and weakened the continuity of patient care.",
          points: [
            "Patient records and clinical history were difficult to retrieve at the right moment.",
            "The schedule remained exposed to duplicate bookings and time conflicts.",
            "Consultations, prescriptions and payments had no shared operational thread.",
          ],
        },
        solution: {
          title: "We designed the product around the practice's real working day.",
          body:
            "Instead of stacking unrelated screens, we modelled the patient's complete journey. Reception prepares the appointment, the practitioner immediately sees the clinical context, and the consultation feeds prescriptions and billing without duplicate entry. Each role receives the right tools while sensitive actions remain protected and auditable.",
        },
        capabilities: [
          {
            title: "Living patient record",
            body: "Instant search, essential information and consultation history in one coherent view.",
          },
          {
            title: "Conflict-free calendar",
            body: "Interactive scheduling, daily visibility and collision checks before confirmation.",
          },
          {
            title: "Guided consultation",
            body: "Diagnosis, notes and prescriptions stay linked to the patient and ready to print.",
          },
          {
            title: "Explainable collection",
            body: "Invoices and cash, card or cheque payments naturally extend the consultation flow.",
          },
        ],
        journey: [
          { title: "Welcome", body: "Find the patient or create a record without breaking reception flow." },
          { title: "Schedule", body: "Choose a real opening and prevent overlapping appointments." },
          { title: "Consult", body: "Read history, capture diagnosis and prepare the prescription together." },
          { title: "Complete", body: "Issue the invoice, record payment and retain an actionable trail." },
        ],
        outcomes: [
          "One shared source of truth for reception, practitioners and administration.",
          "A continuous patient history that supports every future consultation.",
          "Clear responsibilities through Admin, Doctor and Secretary roles.",
        ],
        closing:
          "Med'Oc turns disconnected tasks into one continuous experience, leaving more room for care and less for searching through information.",
      },
    },
  },
  {
    slug: "dps-pos",
    name: "DPS POS",
    index: 1,
    image: "/hardware-illustration.png",
    accent: "#f59e0b",
    accentSoft: "rgba(245, 158, 11, 0.16)",
    visual: "pos",
    stack: ["Next.js", "NestJS", "TypeScript", "SQLite", "Drizzle"],
    content: {
      fr: {
        category: "Retail · Point de vente",
        status: "Socle transactionnel validé",
        headline: "Encaisser vite. Garder un stock juste. Pouvoir tout expliquer.",
        summary:
          "DPS POS transforme le comptoir en un flux fiable où vente, paiement, stock, caisse et ticket sont finalisés ensemble — même sur une installation locale.",
        problem: {
          title: "Quand la caisse et le stock divergent, chaque vente crée un doute.",
          body:
            "Le besoin dépassait largement un simple écran d'encaissement. Le client devait vendre rapidement, connaître la quantité réellement disponible, clôturer chaque caisse et retrouver l'origine d'un écart sans dépendre de tableaux manuels. Une panne d'impression ou un double clic ne devait jamais produire une vente incomplète, un paiement isolé ou une sortie de stock impossible à justifier.",
          points: [
            "Le comptoir exige une interface immédiate, tactile et utilisable au clavier.",
            "Chaque vente doit mettre à jour stock, paiement et caisse de façon indivisible.",
            "Les écarts, annulations et mouvements sensibles doivent conserver leur auteur et leur raison.",
          ],
        },
        solution: {
          title: "Nous avons traité la vente comme une transaction métier, pas comme un formulaire.",
          body:
            "La finalisation est atomique : la vente, son paiement, la sortie de stock et le mouvement de caisse réussissent ensemble ou n'existent pas. Les quantités reposent sur un registre de mouvements append-only, les commandes critiques sont idempotentes et l'impression est découplée pour qu'une imprimante indisponible ne bloque jamais la vérité commerciale.",
        },
        capabilities: [
          {
            title: "Caisse conçue pour le rythme",
            body: "Recherche rapide, panier tactile, quantités exactes et raccourcis adaptés au comptoir.",
          },
          {
            title: "Stock traçable",
            body: "Chaque arrivée, vente, transfert, inventaire ou correction produit un mouvement explicite.",
          },
          {
            title: "Vente atomique",
            body: "Aucun état partiel : paiement, caisse et stock restent cohérents même en cas d'échec.",
          },
          {
            title: "Exploitation locale fiable",
            body: "Sauvegardes vérifiées, santé système, journaux structurés et procédure de restauration.",
          },
        ],
        journey: [
          { title: "Ouvrir", body: "Le caissier ouvre sa session et confirme le fond de caisse." },
          { title: "Composer", body: "Produits, quantités et prix sont contrôlés avant encaissement." },
          { title: "Encaisser", body: "Une commande unique scelle vente, paiement et stock de manière atomique." },
          { title: "Clôturer", body: "Le théorique, le compté et tout écart restent visibles et auditables." },
        ],
        outcomes: [
          "Un stock reconstructible à partir de mouvements immuables plutôt que de corrections silencieuses.",
          "Une caisse qui reste cohérente même lorsqu'un périphérique ou une impression échoue.",
          "Une architecture modulaire prête pour catalogues, entrepôts et parcours commerciaux plus riches.",
        ],
        closing:
          "La vitesse au comptoir n'a de valeur que si les chiffres restent fiables après la fermeture. DPS POS a été construit pour garantir les deux.",
      },
      en: {
        category: "Retail · Point of sale",
        status: "Validated transaction foundation",
        headline: "Checkout fast. Keep stock accurate. Explain every movement.",
        summary:
          "DPS POS turns the counter into a dependable flow where sale, payment, inventory, cash and receipt are completed together — even on a local installation.",
        problem: {
          title: "When checkout and inventory disagree, every sale creates doubt.",
          body:
            "The need went far beyond a basic checkout screen. The client had to sell quickly, know what was truly available, close each register and trace the source of a discrepancy without depending on manual spreadsheets. A printer failure or double click could never leave behind a partial sale, an isolated payment or an unexplained stock deduction.",
          points: [
            "The counter needed an immediate touch-friendly and keyboard-friendly interface.",
            "Every sale had to update inventory, payment and cash as one indivisible operation.",
            "Discrepancies, voids and sensitive movements needed a recorded actor and reason.",
          ],
        },
        solution: {
          title: "We treated the sale as a business transaction, not a form submission.",
          body:
            "Finalisation is atomic: the sale, its payment, the inventory deduction and the register movement either succeed together or do not exist. Quantities come from an append-only movement ledger, critical commands are idempotent, and printing is decoupled so an unavailable printer can never block commercial truth.",
        },
        capabilities: [
          { title: "Built for counter speed", body: "Fast search, touch cart, exact quantities and practical keyboard shortcuts." },
          { title: "Traceable inventory", body: "Every receipt, sale, transfer, count or correction creates an explicit movement." },
          { title: "Atomic checkout", body: "No partial state: payment, cash and stock stay coherent through failures." },
          { title: "Dependable local operation", body: "Verified backups, health checks, structured logs and a restoration path." },
        ],
        journey: [
          { title: "Open", body: "The cashier starts a session and confirms the opening float." },
          { title: "Build", body: "Products, quantities and prices are controlled before collection." },
          { title: "Collect", body: "One command seals sale, payment and inventory atomically." },
          { title: "Close", body: "Expected cash, counted cash and any variance remain visible and auditable." },
        ],
        outcomes: [
          "Inventory that can be reconstructed from immutable movements instead of silent edits.",
          "A register that remains coherent even when a peripheral or print job fails.",
          "A modular architecture ready for richer catalog, warehouse and commercial workflows.",
        ],
        closing:
          "Counter speed only matters when the numbers remain dependable after closing. DPS POS was built to guarantee both.",
      },
    },
  },
  {
    slug: "dps-invoice",
    name: "DPS Gestion",
    index: 2,
    image: "/erp-illustration.png",
    accent: "#60a5fa",
    accentSoft: "rgba(96, 165, 250, 0.16)",
    visual: "documents",
    stack: ["Next.js", "NestJS", "TypeScript", "Zod", "PDF"],
    content: {
      fr: {
        category: "B2B · Gestion commerciale",
        status: "Plateforme commerciale en évolution",
        headline: "Du devis au règlement, sans ressaisie et sans zone grise.",
        summary:
          "DPS Gestion relie clients, documents commerciaux, stock et paiements pour donner aux équipes une vue continue de chaque affaire.",
        problem: {
          title: "Le vrai coût d'une facture commence souvent avant sa création.",
          body:
            "Le client gérait devis, commandes reçues, livraisons, factures et règlements comme des documents séparés. Les mêmes lignes étaient ressaisies plusieurs fois, les livraisons partielles devenaient difficiles à suivre et la direction manquait d'une réponse simple à trois questions : qu'avons-nous promis, qu'avons-nous livré et que reste-t-il à encaisser ?",
          points: [
            "La ressaisie multipliait les erreurs de références, quantités, remises et taxes.",
            "Le lien entre devis, livraison, facture et paiement se perdait au fil des fichiers.",
            "Les soldes clients et les échéances demandaient une reconstruction manuelle.",
          ],
        },
        solution: {
          title: "Nous avons transformé les documents en un parcours commercial traçable.",
          body:
            "Chaque étape reprend les données validées de la précédente : le devis devient facture, une livraison conserve ses quantités sources et chaque PDF est généré depuis un snapshot immuable. Les montants sont calculés avec une arithmétique exacte, la numérotation est attribuée côté serveur et les corrections passent par des opérations explicites plutôt que par la modification silencieuse de l'historique.",
        },
        capabilities: [
          {
            title: "Documents reliés",
            body: "Devis, factures et bons de livraison gardent leur origine, leurs lignes et leurs quantités restantes.",
          },
          {
            title: "Calculs déterministes",
            body: "HT, TTC, TVA, remises et arrondis proviennent d'un moteur commun testé, jamais de flottants approximatifs.",
          },
          {
            title: "PDF reproductibles",
            body: "Les documents validés utilisent des snapshots afin que l'historique ne change pas avec le modèle courant.",
          },
          {
            title: "Contrôle commercial",
            body: "Clients B2B/B2C, conditions, échéances, soldes et exports restent consultables dans le même système.",
          },
        ],
        journey: [
          { title: "Proposer", body: "Préparer un devis clair avec prix, taxes, remises et validité." },
          { title: "Transformer", body: "Créer la facture depuis le devis accepté sans recopier les lignes." },
          { title: "Livrer", body: "Valider les quantités réellement sorties et conserver les reliquats." },
          { title: "Suivre", body: "Voir ce qui est facturé, payé, restant et arrivé à échéance." },
        ],
        outcomes: [
          "Une continuité documentaire qui rend chaque montant et chaque quantité explicables.",
          "Des documents validés immuables, numérotés et reproductibles pour un historique fiable.",
          "Une base configurable qui évite de dupliquer le produit pour chaque nouveau client.",
        ],
        closing:
          "DPS Gestion ne se contente pas de produire une facture élégante : il conserve l'histoire complète qui rend cette facture digne de confiance.",
      },
      en: {
        category: "B2B · Commercial management",
        status: "Evolving commercial platform",
        headline: "From quotation to payment, without re-entry or blind spots.",
        summary:
          "DPS Gestion connects customers, commercial documents, inventory and payments to give teams one continuous view of every deal.",
        problem: {
          title: "The real cost of an invoice often begins before it is created.",
          body:
            "The client managed quotations, received orders, deliveries, invoices and payments as separate documents. The same lines were entered repeatedly, partial deliveries became difficult to follow, and management lacked a simple answer to three questions: what did we promise, what did we deliver and what remains to be collected?",
          points: [
            "Repeated entry multiplied errors in references, quantities, discounts and taxes.",
            "The link between quote, delivery, invoice and payment disappeared across files.",
            "Customer balances and due dates had to be reconstructed manually.",
          ],
        },
        solution: {
          title: "We turned documents into one traceable commercial journey.",
          body:
            "Each stage reuses validated data from the previous one: the quotation becomes an invoice, a delivery retains its source quantities, and every PDF is generated from an immutable snapshot. Amounts use exact arithmetic, numbering is assigned on the server, and corrections use explicit business operations rather than silently rewriting history.",
        },
        capabilities: [
          { title: "Connected documents", body: "Quotes, invoices and delivery notes retain origins, lines and remaining quantities." },
          { title: "Deterministic calculations", body: "Net, gross, tax, discount and rounding use one tested engine instead of approximate floats." },
          { title: "Reproducible PDFs", body: "Validated documents use snapshots so history never changes with the current template." },
          { title: "Commercial control", body: "B2B/B2C customers, terms, due dates, balances and exports live in one system." },
        ],
        journey: [
          { title: "Propose", body: "Prepare a clear quotation with prices, taxes, discounts and validity." },
          { title: "Transform", body: "Create the invoice from an accepted quote without re-entering lines." },
          { title: "Deliver", body: "Validate actual outgoing quantities and retain everything still due." },
          { title: "Track", body: "See what was invoiced, paid, outstanding and overdue." },
        ],
        outcomes: [
          "Document continuity that makes every amount and every quantity explainable.",
          "Immutable, numbered and reproducible validated documents for dependable history.",
          "A configurable foundation that avoids duplicating the product for every new client.",
        ],
        closing:
          "DPS Gestion does more than produce a polished invoice: it preserves the complete story that makes the invoice trustworthy.",
      },
    },
  },
];

export const projectSlugs = projects.map((project) => project.slug);

// Kept for the About carousel, where the stable index also maps its transition order.
export const projectsMeta = projects;

export const getProject = (slug?: string) =>
  projects.find((project) => project.slug === slug);

export const getProjectLocale = (language: string): ProjectLocale =>
  language.toLowerCase().startsWith("en") ? "en" : "fr";
