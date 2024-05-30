import type { Metadata } from "next";
import { Inter, K2D } from "next/font/google";
import "./globals.css";

const inter = K2D({ subsets: ["thai"], weight: "300" });

export const metadata: Metadata = {
  title: "รายรับรายจ่าย",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
