import { Share } from "lucide-react";
import { IconProps } from "@/types";

export const ReferalIcon = ({ active, ...props }: IconProps) => {
  return (
    <Share
      {...props}
      className={`w-[17px] h-[17px] block mx-auto my-auto group-hover:text-white transition-colors duration-200 ${
        active ? "text-white" : "text-[#393F5F]"
      }`}
    />
  );
};
