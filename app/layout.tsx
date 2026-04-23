import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ToolNav - Discover the Best AI Tools",
  description: "Explore 93+ curated AI tools. From writing assistants to image generators, find everything you need to boost your productivity.",
  keywords: ["AI tools", "artificial intelligence", "productivity", "writing", "image generation", "chatbot", "automation"],
  authors: [{ name: "ToolNav" }],
  openGraph: {
    title: "ToolNav - Discover the Best AI Tools",
    description: "Explore 93+ curated AI tools for every need",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
