import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import logo from "@/assets/logo2.png";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MdMenu size={30} color="white" />
      </SheetTrigger>

      <SheetContent className="bg-primary-dark flex flex-col min-h-screen">
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
            <div className="hidden flex-col gap-3">
              <Link
                href={"/login"}
                className="bg-pink-500 rounded-md uppercase text-white py-2 px-5 text-center hover:scale-105 transition"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="border-pink-400 border bg-transparent rounded-md uppercase text-pink-400 py-2 px-5 text-center hover:scale-105 transition"
              >
                Register
              </Link>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://res.cloudinary.com/cloudinary/image/upload/v1667394529/avatars/avatars/default.png" />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <p className="text-white text-lg">SheShare</p>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-5 pt-5">
                <p className="text-white font-semibold text-lg py-3 border-b-2 border-white/70">
                  Explore SheShare
                </p>

                <Link
                  href={"#welcome"}
                  className="bg-pink-500 text-white py-2 transition px-4"
                >
                  Welcome
                </Link>

                <Link
                  href={"#"}
                  className="text-white hover:bg-pink-500 py-2 transition px-4"
                >
                  Rent A Room
                </Link>

                <Link
                  href={"#"}
                  className="text-white hover:bg-pink-500 py-2 transition px-4"
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
        <section>
          <button className="bg-pink-500 rounded-md uppercase text-white py-2 px-5 text-center hover:scale-105 transition w-full">
            Logout
          </button>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
