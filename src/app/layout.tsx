import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { GroupClickTracker } from "@/components/layout/group-click-tracker";
import { siteConfig } from "@/config/site";
import "./globals.css";

const poppins = localFont({
  src: [
    { path: "../assets/fonts/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Poppins-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Acha+ · Achados e cupons no seu WhatsApp",
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    title: "Acha+ · Seu próximo achado está aqui",
    description: siteConfig.description,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body>
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        {children}
        <Analytics />
        <GroupClickTracker />
      </body>
    </html>
  );
}
