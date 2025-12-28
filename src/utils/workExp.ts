import SnevicWebsite from "../assets/snevic-website.png";

export interface ProjectCardProps {
  img: typeof SnevicWebsite;
  title: string;
  slug: string;
}

export const projects: ProjectCardProps[] = [
  {
    title: "Snevic Website",
    slug: "Landing website for snevic org with custom CMS.",
    img: SnevicWebsite,
  },
];
