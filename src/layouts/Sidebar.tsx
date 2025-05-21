import { NavLink, NavLinkRenderProps, useLocation, useNavigate } from "react-router-dom";
import { SettingsIcon, SupportIcon } from "@/assets/icons";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/images/logo.png";
import { router } from "@/data/router";
import { useState } from "react";
import { subItems } from "@/data/SubItems";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mediaOpen, setMediaOpen] = useState(false);


  return (
    <aside className="w-72 bg-white flex flex-col h-full fixed left-0 top-0 z-[10]">
      <div className="h-16 px-8 bg-white flex items-center justify-between">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="logo"
          className="w-12 h-12 object-contain rounded-md cursor-pointer"
        />
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-4 justify-between h-full px-4">
          <div className="flex flex-col gap-1">
            {router.slice(0, -2).map((item) => (
             item === router[1] ? (
              <div key={item.href}>
                <div
                  className={`p-1.5 text-base flex items-center text-textColor gap-2 rounded-[10px] font-semibold transition group cursor-pointer hover:bg-bg_color ${
                    mediaOpen ? "bg-bg_color" : "bg-white"
                  }`} 
                  onClick={() => setMediaOpen(!mediaOpen)}
                >
                  <div
                    className={`w-[31px] h-[31px] flex items-center justify-center rounded-full transition-colors duration-200 ${
                      mediaOpen ? "bg-textColor text-white" : "bg-white text-textColor"
                    } group-hover:bg-textColor group-hover:text-white`}
                  >
                    <item.icon active={mediaOpen} />
                  </div>
                  <span>Media</span>
                </div>

                <div
                  className={`pl-0 pr-2 flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out pt-2 ${
                    mediaOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                 {subItems.map((sub) => (
                  <NavLink
                    key={sub.href}
                    to={sub.href}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm font-medium transition px-2 py-2 pl-[40px] rounded-md
                      ${isActive ? "bg-bg_color text-primary font-semibold" : "text-[#393F5F] hover:bg-gray-100"}`
                    }
                  >
                    <span className="text-[18px] leading-none -ml-[10px]">•</span>
                    <span>{sub.label}</span>
                  </NavLink>
                ))}

                </div>
              </div>
              ) :  (
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
            )) )}
          </div>

          <div className="flex flex-col gap-3 pt-4 pb-8 border-t border-[#E9ECEE]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`border-none outline-none p-1.5 text-base flex items-center justify-between text-textColor gap-2 rounded-[10px] font-semibold hover:bg-bg_color transition`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[31px] h-[31px] flex items-center justify-center rounded-full bg-gray-200">
                      <SettingsIcon />
                    </div>
                    <span className="text-textColor font-semibold text-base">
                      Sozlamalar
                    </span>
                  </div>
                  {/* <ChevronRight /> */}
                </button>
              </DropdownMenuTrigger>
{/* 
              <DropdownMenuContent side="right" align="center" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <Link to="/">
                      <DropdownMenuSubTrigger>
                        Конфигурация
                      </DropdownMenuSubTrigger>
                    </Link>

                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <Link to="/">
                          <DropdownMenuItem>Комната</DropdownMenuItem>
                        </Link>
                        <Link to="/">
                          <DropdownMenuItem>Уборка</DropdownMenuItem>
                        </Link>
                        <Link to="/">
                          <DropdownMenuItem>Настройки профиля</DropdownMenuItem>
                        </Link>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>

                  <Link to="/">
                    <DropdownMenuItem>SMS-шлюз</DropdownMenuItem>
                  </Link>
                  <Link to="/">
                    <DropdownMenuItem>IP-телефон</DropdownMenuItem>
                  </Link>
                  <Link to="/">
                    <DropdownMenuItem>Платежная система</DropdownMenuItem>
                  </Link>
                  <Link to="/">
                    <DropdownMenuItem>Оплата</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent> */}
            </DropdownMenu>

            <NavLink
              to="support"
              className={({ isActive }) =>
                `p-1.5 text-base flex items-center text-textColor gap-2 rounded-[10px] font-semibold hover:bg-bg_color transition ${
                  isActive ? "bg-bg_color" : "bg-white"
                }`
              }
            >
              <div className="w-[31px] h-[31px] flex items-center justify-center rounded-full bg-gray-200">
                <SupportIcon />
              </div>
              <span className="text-textColor font-semibold text-base">
                Qo'llab quvvatlash
              </span>
            </NavLink>
          </div>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
