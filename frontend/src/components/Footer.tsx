import Link from "next/link";
import logo from "@/assets/logo4.png";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="py-2 bg-primary-dark w-full px-8 md:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 pt-5 pb-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={100}
              quality={100}
              loading="lazy"
              className="object-cover hidden"
            />
            <h2 className="font-semibold text-pink-400 text-lg border-b-2 border-white/70 w-fit mb-3">
              SheShare
            </h2>

            <p className="text-sm font-semibold italic hidden">
              SheShare your space, SheShare your story
            </p>
            <Separator className="my-2 bg-secondary-pink hidden" />
            <div className="flex flex-col gap-4">
              <Link
                href="#"
                className="text-white/70 hover:text-white font-medium w-fit"
              >
                About Us
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white font-medium w-fit"
              >
                Careers
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white font-medium w-fit"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5 pt-3">
            <h2 className="font-semibold text-pink-400 text-lg border-b-2 border-white/70 w-fit mb-3">
              Follow Us
            </h2>
            <div className="flex gap-5 items-center">
              <Link href="#">
                <FaFacebook
                  size={20}
                  className="text-white/70 hover:text-white"
                />
              </Link>
              <Link href="#">
                <FaTwitter
                  size={20}
                  className="text-white/70 hover:text-white"
                />
              </Link>
              <Link href="#">
                <FaInstagram
                  size={20}
                  className="text-white/70 hover:text-white"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-pink-400 text-lg border-b-2 border-white/70 w-fit mb-3">
            Support
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="text-white/70 hover:text-white font-medium w-fit"
            >
              FAQs
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white font-medium w-fit"
            >
              Cancellation Policy
            </Link>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-pink-400 text-lg border-b-2 border-white/70 w-fit mb-3">
            Become A Host
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="text-white/70 hover:text-white font-medium w-fit"
            >
              Hosting Resources
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white font-medium w-fit"
            >
              Hosting Responsibility
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white font-medium w-fit"
            >
              Share A Room
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white font-medium w-fit"
            >
              Pets
            </Link>
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-pink-400 text-lg border-b-2 border-white/70 w-fit mb-3">
            Terms & Privacy
          </h2>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="text-white/70 hover:text-white font-medium w-fit"
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white font-medium w-fit"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-5 pb-2 text-center text-sm font-medium">
        <Separator className="my-2 bg-white/70" />
        <p className="text-white/80 pt-2">
          Copyright &copy; {new Date().getFullYear()} SheShare
        </p>
      </div>
    </footer>
  );
};

export default Footer;
