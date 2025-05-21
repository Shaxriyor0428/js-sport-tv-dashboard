import { Image } from "lucide-react"; 
import { IconProps } from "@/types";

export const MediaIcon = ({ active, ...props }: IconProps) => {
  return (
    <Image
      {...props}
      className={`w-[17px] h-[17px] transition-colors duration-200 group-hover:text-white ${
        active ? "text-white" : "text-[#393F5F]"
      }`}
    />
  );
};
