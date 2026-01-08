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
  title: "FundU",
  description:
    "AI-powered fundraising assistant for startups & student organizations.",

  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },

  openGraph: {
    title: "FundU",
    description:
      "AI-powered fundraising assistant for startups & student organizations.",
    url: "https://funduhub.com",
    siteName: "FundU",
    images: [
      {
        url: "https://funduhub.com/og.png",
        width: 1200,
        height: 630,
        alt: "FundU preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FundU",
    description:
      "AI-powered fundraising assistant for startups & student organizations.",
    images: ["https://funduhub.com/og.png"],
  },
};
