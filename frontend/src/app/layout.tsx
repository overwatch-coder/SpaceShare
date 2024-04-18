import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SheShare",
  description:
    "Connecting women who want to rent their properties with women who are looking for accommodations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} overflow-x-hidden scroll-smooth`}>
        {children}
      </body>
    </html>
  );
}
