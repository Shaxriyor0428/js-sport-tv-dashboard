// components/modal/leadership/LeadershipModalWrapper.tsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LeadershipModal from "./LeadershipModal";

type Props = {
  isOpen: boolean;
  handleOpen: () => void;
  onSubmit: (data: any) => void;
};

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  position: z.string().min(1),
  cover_image: z.instanceof(File),
});

const LeadershipModalWrapper = ({ isOpen, handleOpen, onSubmit }: Props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      position: "",
      cover_image: undefined,
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data); // faqat console uchun
    form.reset();
    handleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="max-w-[550px] rounded-3xl pt-5 pb-10 bg-white max-h-[90vh] overflow-y-auto">
        <LeadershipModal
          formMethods={form}
          onSubmit={handleFormSubmit}
          fullClose={() => {
            form.reset();
            handleOpen();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default LeadershipModalWrapper;
