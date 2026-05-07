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
          <div className="ticker-content">
            {/* Something neat I learned that forces spaces. Which is perfect for this scrolling */}
            ⚓ LUFFY +2.1% &nbsp;&nbsp;&nbsp; ☠ BLACKBEARD -1.4% &nbsp;&nbsp;&nbsp;
            ⚔ ZORO +0.8% &nbsp;&nbsp;&nbsp; 🗺 NAMI -0.3% &nbsp;&nbsp;&nbsp;
            👑 SHANKS +3.2% &nbsp;&nbsp;&nbsp; ⚓ LUFFY +2.1% &nbsp;&nbsp;&nbsp;
            ☠ BLACKBEARD -1.4% &nbsp;&nbsp;&nbsp; ⚔ ZORO +0.8% &nbsp;&nbsp;&nbsp;
            🗺 NAMI -0.3% &nbsp;&nbsp;&nbsp; 👑 SHANKS +3.2% &nbsp;&nbsp;&nbsp;
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
