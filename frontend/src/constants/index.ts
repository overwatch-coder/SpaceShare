import {
  ClipboardList,
  Home,
  NotebookPen,
  SquarePen,
  User,
  SquareGanttChart,
} from "lucide-react";
import { FaWifi } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { PiTelevisionSimple } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { MdPool } from "react-icons/md";
import { GiHomeGarage } from "react-icons/gi";

export const dashboardLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Account", path: "/dashboard", icon: User },
  { name: "Bookings", path: "/dashboard/bookings", icon: NotebookPen },
  { name: "Listings", path: "/dashboard/listings", icon: ClipboardList },
  {
    name: "Share A Room",
    path: "/dashboard/listings/add-new",
    icon: SquarePen,
  },
  {
    name: "View Listings",
    path: "/listings",
    icon: SquareGanttChart,
  },
];

export const amenities = [
  { name: "TV", icon: PiTelevisionSimple },
  { name: "Air Conditioning", icon: TbAirConditioning },
  { icon: FaWifi, name: "Wifi" },
  { icon: GiHomeGarage, name: "Garage" },
  { icon: MdPool, name: "Swimming Pool" },
  { icon: GiWashingMachine, name: "Washing Machine" },
  { icon: CgGym, name: "Gym" },
];
