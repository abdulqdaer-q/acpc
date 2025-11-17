import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACPC - Aleppo Competitive Programming Competition",
  description: "Join the premier competitive programming competition in Aleppo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
