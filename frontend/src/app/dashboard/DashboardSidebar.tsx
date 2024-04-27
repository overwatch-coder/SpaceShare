"use client";
import Logout from "@/components/Logout";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import logo from "@/assets/logo2.png";
import { Separator } from "@/components/ui/separator";
import { dashboardLinks } from "@/constants";

const DashboardSidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col gap-5 h-full px-5 bg-primary-dark w-[250px] fixed top-0 left-0 pb-7">
      <div className="flex flex-col gap-2 items-center">
        <Link href={"/"} className="flex items-center mx-auto">
          <Image
            src={logo}
            alt="logo"
            width={80}
            height={80}
            quality={100}
            loading="lazy"
            className="object-contain"
          />
          <p className="font-semibold flex flex-col">
            <span className="text-pink-400 text-xl">SheShare</span>
            <span className="text-xs text-white">Vacation Rentals</span>
          </p>
        </Link>
        <Separator className="bg-pink-400 my-1" />
      </div>

      <UserProfile />

      {/* Dashboard Menu Items */}
      <ul className="flex flex-col gap-5 mb-auto">
        {dashboardLinks.map((link) => {
          const active = pathname === link.path;
          const isUserHost = user?.role === "host";
          if (!isUserHost && link.path === "/dashboard/listings/add-new")
            return null;
          if (!isUserHost && link.path === "/dashboard/listings") return null;

          return (
            <Link
              key={link.path}
              href={link.path}
              className={`${
                active
                  ? "bg-pink-500 rounded"
                  : "text-pink-500 hover:rounded hover:bg-pink-500"
              } px-3 py-2 hover:scale-105 transition text-white flex items-center gap-2`}
            >
              <link.icon size={20} color="white" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </ul>

      <Logout />
    </div>
  );
};

export default DashboardSidebar;
