import { IconProps } from "@/types"
import { MessageCircleMore } from "lucide-react";
export const SupportIcon = (props: IconProps) => {
  return (
    <MessageCircleMore {...props} className={`w-[17px] h-[17px] block mx-auto my-auto group-hover:text-white transition-colors duration-200 ${
      props.active ? "text-white" : "text-[#393F5F]"
    }`} />
  )
}

export default SupportIcon