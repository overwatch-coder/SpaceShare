import {
  ClipboardList,
  Home,
  NotebookPen,
  SquarePen,
  User,
  SquareGanttChart,
} from "lucide-react";

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
