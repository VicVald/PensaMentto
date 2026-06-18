import type { Metadata } from "next";
import { Nunito, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Meu Diário",
  description: "Diário pessoal cozy com análise de humor e escrita reflexiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${nunito.variable} ${playfair.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--plum)]">
        {children}
      </body>
    </html>
  );
}
