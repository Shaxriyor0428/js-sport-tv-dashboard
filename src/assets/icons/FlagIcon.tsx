import type { IconProps } from "@/types";
import { FlagOffIcon } from "lucide-react";

export const FlagIcon = (props: IconProps) => {
 return (
    <FlagOffIcon
      {...props}
      className={`w-[17px] h-[17px] group-hover:text-white transition-colors duration-200 ${
        props.active ? "text-white" : "text-[#393F5F]"
      }`}
    />
  );
}

export default FlagIcon;
