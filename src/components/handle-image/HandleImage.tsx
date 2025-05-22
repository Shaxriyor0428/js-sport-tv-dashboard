import { memo } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { DOMAIN } from "@/constants";
import { cn } from "@/lib/utils";

interface IHandleImageProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  image: string;
}

export const HandleImage = memo(({ isOpen, setIsOpen, image }: IHandleImageProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          "max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">Rasmni ko‘rish</DialogTitle>
          <DialogDescription className="hidden" />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 hover:scale-110 transition-transform"
          >
            <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </DialogHeader>

        <div className=" flex justify-center items-center max-h-[70vh]">
          <img
            src={`${DOMAIN}/${image}`}
            alt="gallery preview"
            className="rounded-xl max-h-[70vh] object-contain shadow-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});
