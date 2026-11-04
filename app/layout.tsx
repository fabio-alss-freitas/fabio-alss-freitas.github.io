import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://fresan.digital"),
  title: "FRESAN — estúdio de software e apps",
  description:
    "Estúdio de tecnologia que cria apps para iOS, Android e web. Produtos: AeroMet, AeroHelper e Orbify.",
  openGraph: {
    title: "FRESAN",
    description: "Estúdio de tecnologia que cria apps para iOS, Android e web.",
    url: "https://fresan.digital",
    siteName: "FRESAN",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#08090a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
