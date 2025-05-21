import Dashboard from "../pages/Dashboard";
import { AdminIcon, DashboardIcon, GameIcon, FlagIcon } from "../assets/icons";
import Admin from "@/pages/Admin";
import Games from "../pages/Games";
import Flag from "../pages/Flag";

export const router = [
  { label: "Barcha qatnashuvchilar", icon: DashboardIcon, href: "/", component: Dashboard },
  { label: "Adminlar", icon: AdminIcon, href: "/admin", component: Admin },
  { label: "Bayroqlar", icon: FlagIcon, href: "/flags", component: Flag },
  { label: "O'yinlar", icon: GameIcon, href: "/games", component: Games },
];
