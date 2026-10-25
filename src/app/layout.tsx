import type { Metadata } from "next";
import { Inter, Lato, Nunito_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Market Replay - Backtesting & Strategy Replay",
  description: "Advanced Forex and Crypto Backtesting and Simulation Platform",
  icons: {
    icon: "/assets/logos/market-replay-arrow-white.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lato.variable} ${nunitoSans.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans dark dark:text-white bg-fxr-bg-primary-light dark:bg-fxr-bg-primary-dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
