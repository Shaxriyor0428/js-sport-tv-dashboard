import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-white w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full ml-72">
        <Header />
        <main className="flex-1 pt-6 pb-10 px-8 overflow-y-auto bg-gray-100 mt-16">
           <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
