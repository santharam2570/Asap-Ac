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
    name: "SAP Finance & Controlling",
    description: "Financial accounting, controlling and S/4HANA Finance.",
    icon: "finance",
  },
  {
    id: "logistics",
    name: "SAP Logistics & Supply Chain",
    description: "Procurement, sales, production, quality, maintenance and warehousing.",
    icon: "truck",
  },
  {
    id: "hr",
    name: "SAP Human Capital",
    description: "On-premise HCM and cloud-based SuccessFactors.",
    icon: "users",
  },
  {
    id: "technical",
    name: "SAP Technical & Development",
    description: "ABAP, RAP, Fiori/UI5, Basis administration and security.",
    icon: "code",
  },
  {
    id: "cloud",
    name: "SAP Cloud & Integration",
    description: "SAP BTP, Integration Suite, Ariba and IBP.",
    icon: "cloud",
  },
  {
    id: "analytics",
    name: "SAP Data & Analytics",
    description: "BW/4HANA, SAP Analytics Cloud, HANA modeling and Datasphere.",
    icon: "chart",
  },
];
