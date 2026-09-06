export type TeamMember = {
  name: string;
  roleKey: "2" | "0" | "1";
  image: string;
  imagePosition: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Hamza Mraizik",
    roleKey: "2",
    image: "/team/hamza-mraizik.png",
    imagePosition: "center 18%",
  },
  {
    name: "Omar Assahsah",
    roleKey: "0",
    image: "/team/omar-assahsah.webp",
    imagePosition: "center 24%",
  },
  {
    name: "Abdelatif Aghozaf",
    roleKey: "1",
    image: "/team/abdelatif-aghozaf.webp",
    imagePosition: "center 22%",
  },
];
