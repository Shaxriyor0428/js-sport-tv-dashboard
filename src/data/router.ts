import Dashboard from "../pages/Dashboard";
import { AdminIcon, DashboardIcon, GameIcon, FlagIcon, UsersIcon } from "../assets/icons";
import Admin from "@/pages/Admin";
import Games from "../pages/Games";
import Flag from "../pages/Flag";
import Users from "../pages/Users";

export const router = [
  { label: "Bosh sahifa", icon: DashboardIcon, href: "/", component: Dashboard },
  { label: "Foydalanuvchilar", icon: UsersIcon, href: "/users", component: Users },
  { label: "Adminlar", icon: AdminIcon, href: "/admin", component: Admin },
  { label: "Bayroqlar", icon: FlagIcon, href: "/flags", component: Flag },
  { label: "O'yinlar", icon: GameIcon, href: "/games", component: Games },
];
