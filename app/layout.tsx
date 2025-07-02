import { Inter } from "next/font/google";

import type { Metadata } from "next";
import type { Viewport } from "next/types";

import Background from "@/components/Background";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "livetable",
  description: "timetable for Youtube live",
};

export const viewport: Viewport = {
  themeColor: "#ffeded",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Background />
        {children}
      </body>
    </html>
  );
}
