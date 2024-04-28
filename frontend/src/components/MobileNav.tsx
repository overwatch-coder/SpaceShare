"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import UserAvatar from "@/components/UserAvatar";
import { useAuth } from "@/hooks/useAuth";
import Logout from "@/components/Logout";
import { usePathname } from "next/navigation";
import DashboardSidebarMobile from "@/app/dashboard/DashboardSidebarMobile";
import UserProfile from "@/components/UserProfile";

const MobileNav = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <Sheet>
      {user || user !== null ? (
        pathname.startsWith("/dashboard") ? (
          <DashboardSidebarMobile user={user} />
        ) : (
          <UserProfile />
        )
      ) : (
        <SheetTrigger>
          <MdMenu size={30} color="white" />
        </SheetTrigger>
      )}

      <SheetContent className="bg-primary-dark flex flex-col gap-3 min-h-screen overflow-y-scroll pb-5">
        <section>
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
          <nav className="flex flex-col gap-4 mt-2">
            {user === null && (
              <div className="flex flex-col gap-3 w-full">
                <Link
                  href={"/login"}
                  className="bg-pink-500 rounded-md uppercase text-white py-2 px-5 text-center hover:scale-105 transition"
                >
                  Login
                </Link>

                <Link
                  href={"/register"}
                  className="border-pink-500 border bg-transparent rounded-md uppercase text-pink-400 py-2 px-5 text-center hover:scale-105 transition"
                >
                  Register
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-5">
              {user && <UserAvatar />}

              {/* Links */}
              <div className="flex flex-col gap-5 pt-5">
                <p className="text-white font-semibold text-lg py-3 border-b-2 border-white/70">
                  Explore SheShare
                </p>

                <Link
                  href={"/listings"}
                  className={`text-white py-2 transition px-4 hover:scale-105 ${
                    pathname === "/listings"
                      ? "bg-pink-500"
                      : "hover:bg-pink-500"
                  }`}
                >
                  Listings
                </Link>

                <Link
                  href={"#welcome"}
                  className="text-white hover:bg-pink-500 py-2 transition px-4"
                >
                  Welcome
                </Link>

                <Link
                  href={"/listings"}
                  className="text-white py-2 transition px-4 hover:scale-105 hover:bg-pink-500"
                >
                  Rent A Room
                </Link>

                <Link
                  href={"/dashboard/listings/add-new"}
                  className={`text-white py-2 transition px-4 hover:scale-105 ${
                    pathname === "/dashboard/listings/add-new"
                      ? "bg-pink-500"
                      : "hover:bg-pink-500"
                  }`}
                >
                  Share A Room
                </Link>

                <Link
                  href={"#"}
                  className="text-white hover:bg-pink-500 py-2 transition px-4"
                >
                  Safety
                </Link>

                <Link
                  href={"#"}
                  className="text-white hover:bg-pink-500 py-2 transition px-4"
                >
                  Adventure
                </Link>

                <Link
                  href={"#"}
                  className="text-white hover:bg-pink-500 py-2 transition px-4"
                >
                  Community
                </Link>
              </div>
            </div>
          </nav>
        </section>
        {user && <Logout />}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
