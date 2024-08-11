import type { Metadata, Viewport } from "next";
import { Inter, K2D, Mali, Sarabun } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { MasterProvider } from "@/contexts/master.context";
import { CalculatorProvider } from "@/contexts/calculator.context";
import { IncomesProvider } from "@/contexts/incomes.context";

const inter = Mali({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "รายรับรายจ่าย",
  description: "แอปรายรับรายจ่ายน่ารัก ๆ น่าใช้ พร้อมตัวการ์ตูนน่ารัก",

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
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/x-icon" href="./favicon.ico" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Mali",
            },
          }}
        >
          <CalculatorProvider>
            <IncomesProvider>
              <MasterProvider>{children}</MasterProvider>
            </IncomesProvider>
          </CalculatorProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
