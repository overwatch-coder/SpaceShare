import DashboardSidebar from "@/app/dashboard/DashboardSidebar";
import { getPathname } from "@/app/actions";
import { currentUser } from "@/app/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import DashboardSidebarMobile from "@/app/dashboard/DashboardSidebarMobile";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard - Spaceshare Vacation Rentals",
  description: "Manage your account, rentals and bookings with ease",
  icons: [
    {
      rel: "icon",
      url: "/images/favicon.ico",
    },
  ],
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const { user } = await currentUser();
  const pathname = await getPathname();

  if (!user) {
    return redirect(`/login?redirect=${pathname}`);
  }

  return (
    <section className="flex flex-col md:flex-row justify-between gap-5 relative">
      <Header classname="md:hidden" />

      {/* Show only on desktop and tablets */}
      <DashboardSidebar />

      {/* Only Show on mobile */}
      <DashboardSidebarMobile user={user} />

      <main className="flex flex-col w-full flex-grow md:ml-[250px] mb-auto md:mb-0">
        {children}
      </main>

      {/* Show on mobile only */}
      <Footer classname="md:hidden" />
    </section>
  );
};

export default DashboardLayout;
