import { IconProps } from "@/types";
import { Shield } from "lucide-react";
export const ClubsIcon = (props: IconProps) => (
  <Shield {...props} className={`w-[17px] h-[17px] block mx-auto my-auto group-hover:text-white transition-colors duration-200 ${
    props.active ? "text-white" : "text-[#393F5F]"
  }`} />  
);
export default ClubsIcon