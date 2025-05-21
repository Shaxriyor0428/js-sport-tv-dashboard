import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
}

const formSchemaStep1 = z.object({
  citizenship: z.string(),
  passportType: z.string(),
  birthday: z.string(),
  seria: z.string(),
});

const formSchemaStep2 = z.object({
  country: z.string(),
  come: z.string(),
  pol: z.string(),
  accept: z.string(),
});

const formSchemaStep3 = z.object({
  period: z.string(),
  visa_type: z.string(),
  payment: z.string(),
  guest_type: z.string(),
  room_number: z.string(),
  children: z.string(),
  firstname: z.string(),
  birthday: z.string(),
});

const StepModal = ({ handleOpen, isOpen }: ModalProp) => {
  const [step, setStep] = useState(1);

  const formStep1 = useForm({
    resolver: zodResolver(formSchemaStep1),
    defaultValues: { citizenship: "", passportType: "", birthday: "", seria: "" },
  });

  const formStep2 = useForm({
    resolver: zodResolver(formSchemaStep2),
    defaultValues: { country: "", come: "", pol: "", accept: "" },
  });


  const formStep3 = useForm({
    resolver: zodResolver(formSchemaStep3),
    defaultValues: { period: "", visa_type: "", payment: "", guest_type: "", room_number: "", children: "", birthday: "" },
  });

  const resetForm = () => {
    formStep1.reset();
    formStep2.reset();
    formStep3.reset();
  };

  const handleClose = (newStep?: number) => {
    if (newStep) {
      setStep(newStep);
      resetForm();
    } else {
      setStep(1);
    }
  };

  const fullClose = () => {
    handleOpen();
    resetForm();
  };
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      resetForm();
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="max-w-[550px] rounded-3xl pt-5 pb-10 bg-white max-h-[90vh] overflow-y-auto">
        {step === 1 && (
          <Step1
            handleClose={handleClose}
            formMethods={formStep1}
            fullClose={fullClose}
          />
        )}
        {step === 2 && (
          <Step2
            handleClose={handleClose}
            formMethods={formStep2}
            fullClose={fullClose}
          />
        )}

        {step === 3 && <Step3 formMethods={formStep3} fullClose={fullClose} handleClose={handleClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default StepModal;
