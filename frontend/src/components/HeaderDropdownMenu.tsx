import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const HeaderNavigationMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white outline-none">
        Explore
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-primary-dark text-white">
        <DropdownMenuLabel>Explore SpaceShare</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full" href="#welcome">
            Welcome
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="#about-us">
            About Us
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="#safety">
            Safety
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="#adventure">
            Adventure
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href="#community">
            Community
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderNavigationMenu;
