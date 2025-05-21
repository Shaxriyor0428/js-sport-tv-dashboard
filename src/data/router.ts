import Settings from "../pages/Settings";
import Instructions from "../pages/Instructions";
import OnlineResults from "../pages/OnlineResults";
import Clubs from "../pages/Club";
import Dashboard from "../pages/Dashboard";
import { AdminIcon, ClubsIcon, CompetitionIcon, DashboardIcon, MediaIcon, PaymentIcon, SettingsIcon, ResultsIcon, InstructionsIcon, SupportIcon } from "../assets/icons";
import Admin from "@/pages/Admin";
import Payment from "../pages/Payment";
import Competitions from "../pages/Competitions";
import Support from "../pages/Support";

export const router = [
  { label: "Barcha qatnashuvchilar", icon: DashboardIcon, href: "/", component: Dashboard },
  { label: "Media", icon: MediaIcon, href: "/media" },
  { label: "To'lov", icon: PaymentIcon, href: "/payment", component: Payment },
  { label: "Musobaqalar", icon: CompetitionIcon, href: "/competitions", component: Competitions },
  { label: "Klublar", icon: ClubsIcon, href: "/clubs", component: Clubs },
  { label: "Adminlar", icon: AdminIcon, href: "/admin", component: Admin },
  { label: "Onlayn natijalar", icon: ResultsIcon, href: "/online-results", component: OnlineResults },
  { label: "Ko'rsatmalar", icon: InstructionsIcon, href: "/instructions", component: Instructions },
  { label: "Sozlamalar", icon: SettingsIcon, href: "/settings", component: Settings },
  { label: "Qo'llab quvvatlash", icon: SupportIcon, href: "/support", component: Support },  
];
