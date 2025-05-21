import { IconProps } from "@/types";
import { Trophy } from "lucide-react";

export const CompetitionIcon = ({ active, ...props }: IconProps) => (
  <Trophy
    {...props}
    className={`w-[17px] h-[17px] block mx-auto my-auto group-hover:text-white transition-colors duration-200 ${
      active ? "text-white" : "text-[#393F5F]"
    }`}
  />
);
