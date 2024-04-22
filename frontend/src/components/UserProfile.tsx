"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import UserAvatar from "@/components/UserAvatar";
import Logout from "@/components/Logout";

const UserProfile = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <UserAvatar />
      </SheetTrigger>

      <SheetContent className="bg-primary-dark flex flex-col min-h-screen overflow-y-scroll">
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

              {/* Links */}
              <div className="flex flex-col gap-5 pt-5">
                <p className="text-white font-semibold text-lg py-3 border-b-2 border-white/70">
                  Manage Profile
                </p>

                <Link
                  href={"/dashboard"}
                  className="bg-pink-500 text-white py-2 transition px-4"
                >
                  Dashboard
                </Link>

                <Link
                  href={"/listings"}
                  className="text-white hover:bg-pink-500 py-2 transition px-4"
                >
                  Rent A Room
                </Link>

                <Link
                  href={"/add-listing"}
                  className="text-white hover:bg-pink-500 py-2 transition px-4"
                >
                  Share A Room
                </Link>
              </div>
            </div>
          </nav>
        </section>
        <Logout />
      </SheetContent>
    </Sheet>
  );
};

export default UserProfile;
