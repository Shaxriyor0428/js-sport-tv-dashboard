import { NavLink, NavLinkRenderProps, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/images/image.png";
import { router } from "@/data/router";
import useStore from "@/context/store";
import Dashboard from "@/pages/Dashboard";
import ReferalUser from "@/pages/ReferalUser";
import { DashboardIcon, UsersIcon } from "@/assets/icons";
import Payment from "../pages/Payment";
import { PaymentIcon } from "../assets/icons/PaymentIcon copy";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useStore();

  // Route'larni role ga qarab filter qilamiz
  const filteredRoutes =
    role === "admin"
      ? [
          { label: "Bosh sahifa", icon: DashboardIcon, href: "/", component: Dashboard },
          { label: "Foydalanuvchilar", icon: UsersIcon, href: "/referal-users", component: ReferalUser },
          { label: "To'lovlar", icon: PaymentIcon, href: "/payment", component: Payment },
        ]
      : router.filter((item) => item.href !== "/referal-users");

  return (
    <aside className="w-72 bg-white flex flex-col h-full fixed left-0 top-0 z-[10]">
      <div className="h-16 px-8 bg-white flex items-center justify-between">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="w-12 h-12 object-contain rounded-md cursor-pointer opacity-85"
        />
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-4 justify-between h-full px-4">
          <div className="flex flex-col gap-1">
            {filteredRoutes.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }: NavLinkRenderProps) =>
                  `p-1.5 text-base flex items-center text-textColor gap-2 rounded-[10px] font-semibold hover:bg-bg_color transition group ${
                    isActive ? "bg-bg_color" : "bg-white"
                  }`
                }
              >
                <div
                  className={`w-[31px] h-[31px] flex items-center justify-center rounded-full transition-colors duration-200
                    group-hover:bg-textColor group-hover:text-white
                    ${
                      location.pathname === item.href
                        ? "bg-textColor text-white"
                        : "bg-white text-textColor"
                    }`}
                >
                  <item.icon active={location.pathname === item.href ? true : undefined} />
                </div>

                <span className="text-textColor font-semibold text-base">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
