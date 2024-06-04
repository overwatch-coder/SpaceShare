import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authenticate | SpaceShare Vacation Rentals",
  description: "Login / Sign Up to gain access to SpaceShare Vacation Rentals",
  icons: [
    {
      rel: "icon",
      url: "/images/favicon.ico",
    },
  ],
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col justify-center items-center bg-hero bg-center bg-cover bg-no-repeat min-h-screen w-screen">
      {children}
    </main>
  );
}
