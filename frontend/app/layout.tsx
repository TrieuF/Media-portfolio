import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jonny's Portfolio",
  description: "portfolio of all my videography and photography",
};

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-screen flex flex-col overflow-hidden">
      <Header brandName={"Trieu Fu-Khai"} brandTitle={"Hobby Content Creator"}/>
      <main className="grow relative">
        {children}
      </main>
      </body>
      </html>
  );
}

