import type { Metadata, Viewport } from "next";
import { Inter, K2D, Mali, Sarabun } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { MasterProvider } from "@/contexts/master.context";

const inter = Mali({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  title: "รายรับรายจ่าย",
  description: "แอปรายรับรายจ่ายน่ารัก ๆ น่าใช้ พร้อมตัวการ์ตูนน่ารัก",
  // icons: "/icon.png",
  openGraph: {
    title: "รายรับรายจ่าย",
    description: "แอปรายรับรายจ่ายน่ารัก ๆ น่าใช้ พร้อมตัวการ์ตูนน่ารัก",
    images: {
      url: "/web-image.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Mali",
            },
          }}
        >
          <MasterProvider> {children}</MasterProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
