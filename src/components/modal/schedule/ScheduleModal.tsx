import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateSchedule } from "@/hooks/schedule/create-schedule";
import { ScheduleCreateRequest } from "@/types";
import { useUpdateSchedule } from "@/hooks/schedule/update-schedule";
import { toast } from "react-toastify";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: ScheduleCreateRequest;
}

const formSchema = z.object({
  title: z.string().min(1, "Sarlavha majburiy"),
  start_period: z.string().min(1, "Boshlanish sanasi majburiy"),
  end_period: z.string().min(1, "Tugash sanasi majburiy"),
  gender_type: z.enum(["erkak", "ayol"], {
    errorMap: () => ({ message: "Jinsi turini tanlang" })
  }),
  location: z.string().min(1, "Manzil majburiy"),
  type: z.enum(["classic", "beach"], {
    errorMap: () => ({ message: "Turnir turini tanlang" })
  }),
  status: z.enum(["upcoming", "in progress", "completed"], {
    errorMap: () => ({ message: "Status tanlang" })
  }),
});

const ScheduleModal = ({ handleOpen, isOpen, element }: ModalProp) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      start_period: "",
      end_period: "",
      gender_type: "erkak" as "erkak" | "ayol",
      location: "",
      type: "classic" as "classic" | "beach",
      status: "in progress" as "upcoming" | "in progress" | "completed",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, formState } = form;
  const { isValid, isDirty } = formState;

  const { mutate: createSchedule } = useCreateSchedule();
  const { mutate: updateSchedule } = useUpdateSchedule();

  const onClose = () => {
    reset({
        title: "",
        start_period: "",
        end_period: "",
        gender_type: "erkak" as "erkak" | "ayol",
        location: "",
        type: "classic" as "classic" | "beach",
        status: "in progress" as "upcoming" | "in progress" | "completed",
    });
    handleOpen();
  };

  useEffect(() => {
    if (isOpen) {
        if (element && element.id !== undefined) {
            console.log(element);
            
            reset({
                title: element.title,
                start_period: new Date(element.start_period).toISOString().split('T')[0],
                end_period: new Date(element.end_period).toISOString().split('T')[0],
                gender_type: element.gender_type as "erkak" | "ayol",
                location: element.location,
                type: element.type as "classic" | "beach",
                status: element.status as "upcoming" | "in progress" | "completed",
            });
        }else {
            reset({
                title: "",
                start_period: "",
                end_period: "",
                gender_type: "erkak" as "erkak" | "ayol",
                location: "",
                type: "classic" as "classic" | "beach",
                status: "in progress" as "upcoming" | "in progress" | "completed",
            });
        }
    }
  }, [isOpen, element, reset]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {

    if(new Date(data.start_period) > new Date(data.end_period)) {
        toast.error("Boshlanish sanasi tugash sanasidan katta bo'lishi kerak");
        return;
    }
    if(element?.id) {
        const updatedData = {
            ...data,
            id: element.id,
        };
        updateSchedule({ id: element.id, data: updatedData });
    }else {
        createSchedule(data);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {element?.id ? "Turnirni tahrirlash" : "Yangi turnir qo'shish"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className='hidden'></DialogDescription>

        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Sarlavha</Label>
                  <FormControl>
                    <Input {...field} placeholder="Turnir nomi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="start_period"
                render={({ field }) => (
                  <FormItem>
                    <Label>Boshlanish sanasi</Label>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="end_period"
                render={({ field }) => (
                  <FormItem>
                    <Label>Tugash sanasi</Label>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

               <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <Label>Joylashuv</Label>
                  <FormControl>
                    <Input {...field} placeholder="Manzilni kiriting" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                    <FormField
                        control={control}
                        name="gender_type"
                        render={({ field }) => (
                            <FormItem>
                            <Label>Jinsi turi</Label>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Jinsi turini tanlang" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[103]">
                                <SelectItem value="erkak">Erkaklar</SelectItem>
                                <SelectItem value="ayol">Ayollar</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                            <Label>Turnir turi</Label>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Turnir turini tanlang" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[103]">
                                <SelectItem value="classic">Klassik</SelectItem>
                                <SelectItem value="beach">Plaj</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                            <Label>Status</Label>
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status tanlang" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[103]">
                                <SelectItem value="upcoming">Kutilmoqda</SelectItem>
                                <SelectItem value="in progress">Jarayonda</SelectItem>
                                <SelectItem value="completed">Tugagan</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />


            <Button
              type="submit"
              className="w-full py-3 bg-[#393F5F] text-white hover:opacity-90 rounded-xl text-md font-semibold"
              disabled={!isValid || !isDirty}
            >
              {element?.id ? "Tahrirlash" : "Yaratish"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
