export interface Branch {
  id: string;
  name: string;
  city: string;
  addressLines: string[];
  phone: string;
  phoneHref: string;
  /** Google Plus Code, used for an exact map pin. */
  plusCode: string;
  closesAt: string;
  hours: { days: string; time: string }[];
}

// TODO(client): confirm opening time / working days for each branch and the contact email.
export const branches: Branch[] = [
  {
    id: "trichy",
    name: "Tiruchirappalli",
    city: "Tiruchirappalli",
    addressLines: [
      "New Street, 6/75E, Williams Rd",
      "Othakadai, Cantonment",
      "Tiruchirappalli, Tamil Nadu 620001",
    ],
    phone: "+91 99527 73417",
    phoneHref: "tel:+919952773417",
    plusCode: "RM3P+JM Tiruchirappalli, Tamil Nadu",
    closesAt: "8:00 PM",
    hours: [{ days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" }],
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    city: "Coimbatore",
    addressLines: [
      "Door No 385/A6, Jayem Arcade, Kamarajar Rd",
      "Opp. RHR Hotel, Peelamedu, Lakshmi Ammal Layout, Lakshmipuram",
      "Coimbatore, Tamil Nadu 641004",
    ],
    phone: "+91 83002 80860",
    phoneHref: "tel:+918300280860",
    plusCode: "22CC+6W Coimbatore, Tamil Nadu",
    closesAt: "7:30 PM",
    hours: [{ days: "Monday – Saturday", time: "9:00 AM – 7:30 PM" }],
  },
];

export const branchMapEmbedUrl = (b: Branch) =>
  `https://www.google.com/maps?q=${encodeURIComponent(b.plusCode)}&z=16&output=embed`;

export const branchDirectionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.plusCode)}`;

const primary = branches[0];

export const siteConfig = {
  name: "ASAP Academy",
  shortName: "ASAP",
  tagline: "As Study As Possible",
  description:
    "ASAP Academy offers industry-focused SAP training in Tiruchirappalli (Trichy) and Coimbatore: FICO, MM, SD, ABAP, S/4HANA, SuccessFactors, BTP and more. Learn from certified consultants with live projects and placement support.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://asapacademy.in",
  domain: "asapacademy.in",
  contact: {
    phone: primary.phone,
    phoneHref: primary.phoneHref,
    whatsappHref: `https://wa.me/${primary.phoneHref.replace(/\D/g, "")}`,
    email: "info@asapacademy.in",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/asapacademy",
    youtube: "https://www.youtube.com/@asapacademy-official",
    instagram: "https://www.instagram.com/asapacademy_official",
    facebook: "https://www.facebook.com/asapacademy.in",
  },
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About", href: "/about" },
  { label: "Corporate Training", href: "/corporate-training" },
  { label: "Contact", href: "/contact" },
] as const;
