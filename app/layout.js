import "./globals.css";
import { Inter, Noto_Sans_Sinhala } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weights: [400, 500, 600, 700, 800] });
const notoSansSinhala = Noto_Sans_Sinhala({ subsets: ["sinhala"], weights: [400, 600, 700, 800] });

export const metadata = {
  title: "Kapru — Your Personal Boutique Concierge",
  description: "AI-powered gifting agent for Kapruka.com. Find perfect gifts, flowers & cakes. Speaks English, Sinhala & Tanglish.",
  keywords: "Kapruka, Sri Lanka, gifts, AI shopping, Sinhala",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansSinhala.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  );
}