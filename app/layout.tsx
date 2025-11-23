import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/component/ChatWidget";
import { ThemeProvider } from "@/component/ThemeProvider";
import Navbar from "./Navbar";
import AnalyticsTracker from "@/component/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = (() => {
  const candidate = rawSiteUrl?.trim();
  if (!candidate) return "https://mohammadeissa.com";
  if (!/^https?:\/\//i.test(candidate)) return `https://${candidate}`;
  return candidate;
})();

// Ensure metadataBase always receives a valid absolute URL
let metadataBase: URL | undefined;
try {
  metadataBase = new URL(siteUrl);
} catch {
  metadataBase = new URL("https://mohammadeissa.com");
}

export const metadata: Metadata = {
  metadataBase,
  title: "Mohammad Eissa | Data Science Portfolio",
  description:
    "Projects, analytics, and background of Mohammad Eissa — data science student and competitive swimmer.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Mohammad Eissa | Data Science Portfolio",
    description:
      "Projects, analytics, and background of Mohammad Eissa — data science student and competitive swimmer.",
    url: siteUrl,
    images: ["/icon-512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Eissa | Data Science Portfolio",
    description:
      "Projects, analytics, and background of Mohammad Eissa — data science student and competitive swimmer.",
    images: ["/icon-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mohammad Eissa",
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <AnalyticsTracker />
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
