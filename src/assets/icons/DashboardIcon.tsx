
import { IconProps } from "@/types";
import { Users } from "lucide-react";

export const DashboardIcon = (props: IconProps) => {
 return (
    <Users
      {...props}
      className={`w-[17px] h-[17px] group-hover:text-white transition-colors duration-200 ${
        props.active ? "text-white" : "text-[#393F5F]"
      }`}
    />
  );
}

export default DashboardIcon;
