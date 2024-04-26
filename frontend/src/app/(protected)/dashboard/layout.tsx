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
          {dashboardLinks.map((link) => {
            const active = link.path === pathname;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  user.role === "client"
                    ? pathname === "/dashboard/listings"
                      ? "hidden"
                      : ""
                    : ""
                } ${
                  active
                    ? "bg-pink-500 rounded text-white"
                    : "text-pink-500 hover:text-white hover:rounded hover:bg-pink-500"
                } px-3 py-2 hover:scale-105 transition`}
              >
                {link.name}
              </Link>
            );
          })}
          <Logout />
        </ul>
      </div>
      <main className="flex flex-col gap-5 w-full flex-grow">{children}</main>
    </section>
  );
};

export default DashboardLayout;
