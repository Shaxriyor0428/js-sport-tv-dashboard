import { NavLink, NavLinkRenderProps, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/images/logo.png";
import { router } from "@/data/router";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
            {router.map((item) => (
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
