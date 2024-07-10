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
  // icons: {
  //   icon: [
  //     {
  //       rel: "icon",
  //       type: "image/png",
  //       sizes: "192x192",
  //       url: "/icon-192-192.png",
  //     },
  //     {
  //       rel: "icon",
  //       type: "image/png",
  //       sizes: "512x512",
  //       url: "/icon-512-512.png",
  //     },
  //     {
  //       rel: "icon",
  //       type: "image/ico",
  //       url: "/favicon.ico",
  //     },
  //   ],
  // },
  // icons: ["/icon-192-192.png", "/icon-512-512.png"],

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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* <link
          rel="icon"
          href="/favicon/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        /> */}
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
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
