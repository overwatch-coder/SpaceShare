import { getPathname } from "@/app/actions";
import { currentUser } from "@/app/actions/user.actions";
import Logout from "@/components/Logout";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const dashboardLinks = [
  { name: "Account", path: "/dashboard" },
  { name: "Bookings", path: "/dashboard/bookings" },
  { name: "Listings", path: "/dashboard/listings" },
  { name: "Add Listing", path: "/add-listing" },
];

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
      <div className="flex flex-col gap-7 px-5 pt-20 bg-primary-dark w-[250px]">
        <h1 className="text-xl font-bold capitalize text-white pt-10">
          <Link href="/dashboard">Dashboard</Link>
        </h1>
        <ul className="flex flex-col gap-5 min-h-screen">
          <Link
            key={dashboardLinks[0].path}
            href={dashboardLinks[0].path}
            className={`${
              pathname === dashboardLinks[0].path
                ? "bg-pink-500 rounded text-white"
                : "text-pink-500 hover:text-white hover:rounded hover:bg-pink-500"
            } px-3 py-2 hover:scale-105 transition`}
          >
            {dashboardLinks[0].name}
          </Link>

          <Link
            key={dashboardLinks[1].path}
            href={dashboardLinks[1].path}
            className={`${
              pathname === dashboardLinks[1].path
                ? "bg-pink-500 rounded text-white"
                : "text-pink-500 hover:text-white hover:rounded hover:bg-pink-500"
            } px-3 py-2 hover:scale-105 transition`}
          >
            {dashboardLinks[1].name}
          </Link>

          {user.role === "host" && (
            <Link
              key={dashboardLinks[2].path}
              href={dashboardLinks[2].path}
              className={`${
                pathname === dashboardLinks[2].path
                  ? "bg-pink-500 rounded text-white"
                  : "text-pink-500 hover:text-white hover:rounded hover:bg-pink-500"
              } px-3 py-2 hover:scale-105 transition`}
            >
              {dashboardLinks[2].name}
            </Link>
          )}

          {user.role === "host" && (
            <Link
              key={dashboardLinks[3].path}
              href={dashboardLinks[3].path}
              className={`${
                pathname === dashboardLinks[3].path
                  ? "bg-pink-500 rounded text-white"
                  : "text-pink-500 hover:text-white hover:rounded hover:bg-pink-500"
              } px-3 py-2 hover:scale-105 transition`}
            >
              {dashboardLinks[3].name}
            </Link>
          )}

          <Logout />
        </ul>
      </div>
      <main className="flex flex-col gap-5 w-full flex-grow">{children}</main>
    </section>
  );
};

export default DashboardLayout;
