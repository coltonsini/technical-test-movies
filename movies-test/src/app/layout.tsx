import type { Metadata } from "next";
import { ibmFont, InterFont } from "./ui/fonts";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmFont.className} ${InterFont.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
