import Dashboard from "../pages/Dashboard";
import { AdminIcon, DashboardIcon, GameIcon, FlagIcon, UsersIcon, PaymentIcon, ReferalIcon } from "../assets/icons";
import Admin from "@/pages/Admin";
import Games from "../pages/Games";
import Flag from "../pages/Flag";
import ReferalUser from "../pages/ReferalUser";
import Payment from "../pages/Payment";
import Referal from "../pages/Referal";
import Users from "../pages/Users";

export const router = [
  { label: "Bosh sahifa", icon: DashboardIcon, href: "/", component: Dashboard },
  { label: "Foydalanuvchilar", icon: UsersIcon, href: "/referal-users", component: ReferalUser },
  { label: "Barcha foydalanuvchilar", icon: UsersIcon, href: "/all-users", component: Users },
  { label: "To'lovlar", icon: PaymentIcon, href: "/payment", component: Payment },
  { label: "Referallar", icon: ReferalIcon, href: "/referal", component: Referal },
  { label: "Adminlar", icon: AdminIcon, href: "/admin", component: Admin },
  { label: "Bayroqlar", icon: FlagIcon, href: "/flags", component: Flag },
  { label: "O'yinlar", icon: GameIcon, href: "/games", component: Games },
];
