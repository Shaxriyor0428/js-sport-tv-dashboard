import { Plus, User } from "lucide-react";
import { BellIcon } from "../assets/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useStore from "../context/store";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  
  const handleClick = () => {
    const { logOut } = useStore.getState();
      logOut();
      window.location.href = "/signin";
  }
  return (
    <>
      <header className="h-16 fixed top-0 left-64 right-0 w-[calc(w-full - 16rem)] bg-white flex items-center justify-between px-5 z-40">
        <div></div>
        <div className="flex w-[450px]">
          <input
            type="text"
            placeholder="Поиск"
            className="px-3 w-full hidden py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-textColor"
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={handleOpen} className="hidden" type="button">
            <Plus />
            Добавить бронированию
          </Button>
          <button className="w-[40px] h-[40px] flex justify-center items-center bg-bg_color text-textColor rounded-full">
            <BellIcon />
          </button>
          <button onClick={handleClick} className="w-[40px] h-[40px] flex justify-center items-center bg-bg_color text-textColor rounded-full">
            <User />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
