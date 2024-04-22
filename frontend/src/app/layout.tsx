import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProvider from "@/app/providers/StoreProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SheShare Vacation Rentals",
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
        <StoreProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="mb-auto">{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
