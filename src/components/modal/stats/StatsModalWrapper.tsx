import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StatsModal from "./StatsModal";

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
  onSubmit: (data: any) => void; // Hozir ishlatilmaydi
};

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  position: z.string().min(1),
  cover_image: z.instanceof(File),
});

const StatsModalWrapper = ({ isOpen, handleOpen }: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      position: "",
      cover_image: undefined,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="max-w-[550px] rounded-3xl pt-5 pb-10 bg-white max-h-[90vh] overflow-y-auto">
        <StatsModal
          formMethods={form}
          onSubmit={() => {}}
          fullClose={() => {
            form.reset();
            handleOpen();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default StatsModalWrapper;
