import type { Category } from "@/types/course";

export const categories: Category[] = [
  {
    id: "s4hana",
    name: "SAP S/4HANA",
    description: "The intelligent ERP core: fundamentals, navigation and migration.",
    icon: "layers",
  },
  {
    id: "finance",
    name: "Finance & Controlling",
    description: "Financial accounting, controlling and S/4HANA Finance.",
    icon: "finance",
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    description: "Procurement, sales, production, quality, maintenance and warehousing.",
    icon: "truck",
  },
  {
    id: "hr",
    name: "Human Capital",
    description: "On-premise HCM and cloud-based SuccessFactors.",
    icon: "users",
  },
  {
    id: "technical",
    name: "Technical & Development",
    description: "ABAP, RAP, Fiori/UI5, Basis administration and security.",
    icon: "code",
  },
  {
    id: "cloud",
    name: "Cloud & Integration",
    description: "SAP BTP, Integration Suite, Ariba and IBP.",
    icon: "cloud",
  },
  {
    id: "analytics",
    name: "Data & Analytics",
    description: "BW/4HANA, SAP Analytics Cloud, HANA modeling and Datasphere.",
    icon: "chart",
  },
];
