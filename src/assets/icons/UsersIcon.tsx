import { User } from "lucide-react";
import { IconProps } from "@/types";

export const UsersIcon = ({ active, ...props }: IconProps) => {
  return (
    <User
      {...props}
      className={`w-[17px] h-[17px] block mx-auto my-auto group-hover:text-white transition-colors duration-200 ${
        active ? "text-white" : "text-[#393F5F]"
      }`}
    />
  );
};
