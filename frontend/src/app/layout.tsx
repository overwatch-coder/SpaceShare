import { Nunito } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/providers/StoreProvider";

const nunito = Nunito({ subsets: ["latin"] });

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} scrollbar-hide overflow-x-hidden scroll-smooth`}
      >
        <StoreProvider>
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
