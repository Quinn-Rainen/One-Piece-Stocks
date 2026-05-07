import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Piece Stocks",
  description: "The Grand Line Stock Exchange",
};

// Easier to modify the ticker names, in the future would be nice to have it dynamically grab from the database, however I am out of time
const tickerItems = "⚓ LUFFY +2.1% &nbsp;&nbsp;&nbsp; ☠ BLACKBEARD -1.4% &nbsp;&nbsp;&nbsp; ⚔ ZORO +0.8% &nbsp;&nbsp;&nbsp; 🗺 NAMI -0.3% &nbsp;&nbsp;&nbsp; 👑 SHANKS +3.2% &nbsp;&nbsp;&nbsp; 💀 WHITEBEARD +5.1% &nbsp;&nbsp;&nbsp; 🔥 ACE -2.2% &nbsp;&nbsp;&nbsp; 🐆 ROB LUCCI +1.1% &nbsp;&nbsp;&nbsp; 🌊 JINBE +0.6% &nbsp;&nbsp;&nbsp; ⚡ ENEL -3.0% &nbsp;&nbsp;&nbsp;";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="ticker-wrapper">
          <div className="ticker-track">
            <span
              className="ticker-content"
              //Future Me: this is called this to prevent XSS, but since I'm not doing a form its safe, probably
              dangerouslySetInnerHTML={{ __html: tickerItems }}
            />
            <span
              className="ticker-content"
              dangerouslySetInnerHTML={{ __html: tickerItems }}
            />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
