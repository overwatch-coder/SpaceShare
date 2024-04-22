"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo2.png";
import MobileNav from "@/components/MobileNav";
import HeaderNavigationMenu from "@/components/HeaderDropdownMenu";
import { useAuth } from "@/hooks/useAuth";
import UserProfile from "@/components/UserProfile";

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="w-screen fixed z-50 top-0 py-1 bg-primary-dark shadow-md">
      <section className="flex items-center justify-between px-5 md:px-16">
        {/* Logo */}
        <Link href={"/"} className="flex items-center">
          <Image
            src={logo}
            alt="logo"
            width={80}
            height={80}
            quality={100}
            loading="lazy"
            className="object-contain"
          />
          <p className="font-semibold hidden md:flex flex-col">
            <span className="text-pink-400 text-xl">SheShare</span>
            <span className="text-xs text-white">Vacation Rentals</span>
          </p>
        </Link>

        {/* Show Profile on mobile page */}
        <div className="md:hidden">{user && <UserProfile />}</div>

        {/* Desktop Nav */}
        <nav className="items-center gap-7 hidden md:flex">
          <HeaderNavigationMenu />
          <Link href={"/listings"} className="text-white hover:text-pink-500">
            Listings
          </Link>

          {user && (
            <div className="flex items-center gap-2">
              <UserProfile />
            </div>
          )}

          {!user && (
            <>
              <Link
                href={"/register"}
                className="border-pink-400 border bg-transparent rounded-md uppercase text-pink-400 py-2 px-5 text-center hover:scale-105 transition"
              >
                Register
              </Link>

              <Link
                href={"/login"}
                className="bg-pink-500 rounded-md uppercase text-white py-2 px-5 text-center hover:scale-105 transition"
              >
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </section>
    </header>
  );
};

export default Header;
