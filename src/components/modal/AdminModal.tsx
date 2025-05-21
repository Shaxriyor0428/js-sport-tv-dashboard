import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateAdmin } from "@/hooks/admin/create-admin";
import { AdminCreateRequest } from "@/types";
import { useUpdateAdmin } from "@/hooks/admin/update-admin";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: AdminCreateRequest;
}

const AdminModal = ({ handleOpen, isOpen, element }: ModalProp) => {
  const formSchema = z.object({
    name: z.string().min(1, "Username majburiy"),
    fullname: z.string().optional(),
    password: element && element.id !== undefined
      ? z.string().optional()
      : z.string().min(3, "Parol kamida 3 belgidan iborat bo'lishi kerak"),
    role: z.string().min(1, "Rol tanlang"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fullname: "",
      password: "",
      role: "",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, formState } = form;
  const { isValid, isDirty } = formState;

  const { mutate: createAdmin } = useCreateAdmin();
  const { mutate: updateAdmin } = useUpdateAdmin();
  

  const onClose = () => {
    reset({
      name: "",
      fullname: "",
      password: "",
      role: "",
    });
    handleOpen();
  };

  useEffect(() => {
    if (isOpen) {
      if (element && element.id !== undefined) {
        reset({
          name: element.name,
          fullname: element.fullname ?? "",
          password: "",
          role: element.role,
        });
      } else {
        reset();
      }
    }
  }, [isOpen, reset, element]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const submitData = {
      ...data,
      password: data.password || "",
    };
    
    if (element && element.id !== undefined) {
      updateAdmin({ id: element.id, data: submitData });
    } else {
      createAdmin(submitData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] rounded-lg pt-5 pb-10 bg-white max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {element?.id !== undefined ? "Adminni o‘zgartirish" : "Yangi Admin yaratish"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <button onClick={onClose}>
          <X className="w-6 h-6 absolute top-4 right-4" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Name */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Login (username)</Label>
                  <FormControl>
                    <Input {...field} placeholder="Admin login" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fullname */}
            <FormField
              control={control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <Label>To‘liq ism (ixtiyoriy)</Label>
                  <FormControl>
                    <Input {...field} placeholder="Masalan: Shaxriyor Karimov" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label>Parol {element?.id !== undefined && <span className="text-gray-500">(ixtiyoriy)</span>}</Label>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Yangi parol" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
                  <FormField
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="relative w-full">
                            <Label className="text-textColor inline-block pb-2">
                                Rol
                            </Label>
                            <Select
                                value={field.value || ""}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Rolni tanlang" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[103]">
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="superadmin">Superadmin</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full py-3 mt-4 bg-[#393F5F] text-white hover:opacity-90 rounded-[10px] text-md font-semibold"
              disabled={!isValid || !isDirty}
            >
              {element?.id !== undefined ? "O‘zgartirish" : "Yaratish"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
