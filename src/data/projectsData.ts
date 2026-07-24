export interface ProjectMeta {
  slug: string;
  index: number;
  image: string;
}

// slug (URL) <-> index (clé de traduction about.ourWork.projects.<index>)
export const projectsMeta: ProjectMeta[] = [
  { slug: "medoc", index: 0, image: "/software-bg.png" },
  { slug: "dps-pos", index: 1, image: "/hardware-illustration.png" },
  { slug: "dps-invoice", index: 2, image: "/erp-illustration.png" },
];