"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import UserAvatar from "@/components/UserAvatar";
import Logout from "@/components/Logout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User as UserType } from "@/types/index";
import { dashboardLinks } from "@/constants";

const DashboardSidebarMobile = ({ user }: { user: UserType }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }

    return () => {
      setIsOpen(false);
    };
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger className="md:hidden">
        <UserAvatar nameClass="hidden" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="bg-primary-dark flex flex-col min-h-screen overflow-y-scroll md:hidden pb-16"
      >
        <section className="mb-auto">
          {/* Logo */}
          <div className="flex flex-col gap-3">
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

          {/* Nav */}
          <nav className="flex flex-col gap-5 mt-5">
            <div className="flex flex-col gap-5">
              <UserAvatar />

              {/* Dashboard Menu Items */}
              <ul className="flex flex-col gap-7">
                {dashboardLinks.map((link) => {
                  const active = pathname === link.path;
                  const isUserHost = user?.role === "host";
                  if (
                    !isUserHost &&
                    link.path === "/dashboard/listings/add-new"
                  )
                    return null;
                  if (!isUserHost && link.path === "/dashboard/listings")
                    return null;

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
            </div>
          </nav>
        </section>
        <Logout />
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebarMobile;
