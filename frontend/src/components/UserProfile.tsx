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

const UserProfile = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const profileLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Bookings", path: "/dashboard/bookings" },
    { name: "Share A Room", path: "/dashboard/listings/add-new" },
    { name: "Rent A Room", path: "/listings" },
  ];

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
      <SheetTrigger>
        <UserAvatar nameClass="hidden md:block" />
      </SheetTrigger>

      <SheetContent className="bg-primary-dark flex flex-col min-h-screen overflow-y-scroll pb-16">
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

                {profileLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    className={`text-white py-2 transition px-4 hover:scale-105 ${
                      pathname === link.path
                        ? "bg-pink-500"
                        : "hover:bg-pink-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
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
