import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Spaceshare Vacation Rentals",
  description:
    "Connecting women who want to rent their properties with women who are looking for accommodations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </section>
  );
}
