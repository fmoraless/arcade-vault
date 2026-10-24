import type { Metadata } from "next";
import { Press_Start_2P, JetBrains_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";

const fontPixel = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const fontCourier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ARCADE VAULT · Portal Retro",
  description: "Portal retro de videojuego con biblioteca, salón de la fama y autenticación.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${fontPixel.variable} ${fontMono.variable} ${fontCourier.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="av-bg" />
        <div className="av-noise" />
        <div id="root" className="flex flex-col flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}