import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Footer from "./admin/partscomponents/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pieraksts Pie",
  description: "Rezervāciju sistēma pakalpojumu sniedzējiem Latvijā.",
  openGraph: {
    images: "./logo.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster  richColors />
        <Footer/>
      </body>
    </html>
  );
}
