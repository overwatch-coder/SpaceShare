import DashboardSidebar from "@/app/(protected)/dashboard/DashboardSidebar";
import { getPathname } from "@/app/actions";
import { currentUser } from "@/app/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Dashboard - SheShare Vacation Rentals",
  description: "Manage your account, rentals and bookings with ease",
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const { user } = await currentUser();
  const pathname = await getPathname();

  if (!user) {
    return redirect(`/login?redirect=${pathname}`);
  }

  return (
    <section className="flex flex-row justify-between gap-5 relative">
      <DashboardSidebar />
      <main className="flex flex-col gap-5 w-full flex-grow">{children}</main>
    </section>
  );
};

export default DashboardLayout;
