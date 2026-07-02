import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import React from "react";
import { client } from "@/sanity/client";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Fetch settings once to be used by both the layout and metadata
async function getSiteSettings() {
    return await client.fetch(`*[_type == "siteSettings"][0]`);
}

// Generate Dynamic Metadata
export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();

    return {
        title: settings?.pageTitle || "Portfolio",
        description: settings?.description || "Portfolio of my work",
    };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const settings = await getSiteSettings();

    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="h-full min-h-screen flex flex-col overflow-y-auto no-scrollbar">
        <Header
            brandName={settings?.brandName || "My Portfolio"}
            brandTitle={settings?.brandTitle || "Creator"}
        />
        <main className="grow relative">
            {children}
        </main>
        </body>
        </html>
    );
}