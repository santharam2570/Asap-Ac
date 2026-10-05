import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | SAP Training Institute – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "SAP training",
    "SAP course",
    "SAP FICO training",
    "SAP MM training",
    "SAP SD training",
    "SAP ABAP training",
    "SAP S/4HANA course",
    "SuccessFactors training",
    "SAP BTP training",
    "SAP training Trichy",
    "SAP training Tiruchirappalli",
    "SAP training Coimbatore",
    "SAP institute Trichy",
    "SAP institute Coimbatore",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#2056c3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      {/* Browser extensions (e.g. ColorZilla) inject attributes on <body>. */}
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
