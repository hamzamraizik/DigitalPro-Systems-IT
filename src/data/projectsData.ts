export interface ProjectMetric {
  /** Clé de traduction sous projectsPage.metrics.<key> */
  key: string;
  before: number;
  after: number;
  unit: string;
}

export interface ProjectMeta {
  slug: string;
  index: number;
  image: string;
  metrics: ProjectMetric[];
}

// slug (URL) <-> index (clé de traduction about.ourWork.projects.<index>)
export const projectsMeta: ProjectMeta[] = [
  {
    slug: "medoc",
    index: 0,
    image: "/software-bg.png",
    metrics: [
      { key: "stockTime", before: 45, after: 12, unit: "min" },
      { key: "stockErrors", before: 18, after: 3, unit: "%" },
      { key: "availability", before: 82, after: 98, unit: "%" },
    ],
  },
  {
    slug: "dps-pos",
    index: 1,
    image: "/hardware-illustration.png",
    metrics: [
      { key: "transactionTime", before: 38, after: 14, unit: "s" },
      { key: "dailySales", before: 120, after: 260, unit: "" },
      { key: "errorRate", before: 9, after: 1.5, unit: "%" },
    ],
  },
  {
    slug: "dps-invoice",
    index: 2,
    image: "/erp-illustration.png",
    metrics: [
      { key: "invoiceDelay", before: 6, after: 1, unit: "j" },
      { key: "processedInvoices", before: 300, after: 850, unit: "" },
      { key: "disputeRate", before: 11, after: 2, unit: "%" },
    ],
  },
];