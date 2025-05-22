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
import { IAdminData } from "@/types";
import { useUpdateAdmin } from "@/hooks/admin/update-admin";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: IAdminData;
}

const createSchema = z.object({
  fullName: z.string().min(1, "To'liq ism majburiy"),
  username: z.string().min(1, "Login majburiy"),
  password: z.string().min(3, "Parol kamida 3 belgidan iborat bo'lishi kerak"),
  role: z.string().min(1, "Rol tanlang"),
  status: z.enum(["active", "inactive"], { required_error: "Holatni tanlang" }),
});

const updateSchema = z.object({
  fullName: z.string().min(1, "To'liq ism majburiy"),
  username: z.string().min(1, "Login majburiy"),
  password: z.string().optional(),
  role: z.string().min(1, "Rol tanlang"),
  status: z.enum(["active", "inactive"], { required_error: "Holatni tanlang" }),
});

type FormValues = z.infer<typeof createSchema> | z.infer<typeof updateSchema>;

const AdminModal = ({ handleOpen, isOpen, element }: ModalProp) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(element?.id ? updateSchema : createSchema),
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      role: "admin",
      status: "active",
    },
    mode: "onChange",
  });
  

  const { control, handleSubmit, reset, formState } = form;
  const { isValid, isDirty } = formState;
  const canSubmit = isValid && isDirty;

  const { mutate: createAdmin } = useCreateAdmin();
  const { mutate: updateAdmin } = useUpdateAdmin();

  const onClose = () => {
    reset({
      fullName: "",
      username: "",
      password: "",
      role: "admin",
      status: "active",
    });
    handleOpen();
  };

  useEffect(() => {
    if (isOpen) {
      if (element && element.id !== undefined) {
        reset({
          fullName: element.fullName ?? "",
          username: element.username,
          password: "",
          role: element.role,
          status: element.status as "active" | "inactive", 
        });
      } else {
        reset({
          fullName: "",
          username: "",
          password: "",
          role: "admin",
          status: "active",
        });
      }
    }
  }, [isOpen, element, reset]);

  const onSubmit = (data: FormValues) => {
    if (element && element.id !== undefined) {
      const updateData = {
        fullName: data.fullName,
        username: data.username,
        role: data.role,
        status: data.status,
        ...(data.password ? { password: data.password } : {}),
      };
      updateAdmin(
        { id: element.id, data: updateData },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            console.error("Update error:", error);
          },
        }
      );
    } else {
      const createData = {
        fullName: data.fullName,
        username: data.username,
        password: data.password as string,
        role: data.role,
        status: data.status,
      };
      createAdmin(createData, {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          console.error("Create error:", error);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] rounded-lg pt-5 pb-10 bg-white max-h-[70vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {element?.id !== undefined ? "Adminni o'zgartirish" : "Yangi Admin yaratish"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <button onClick={onClose}>
          <X className="w-6 h-6 absolute top-4 right-4" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Username */}
            <FormField
              control={control}
              name="username"
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

            {/* fullName */}
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <Label>To'liq ism </Label>
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
                  <Label>
                    Parol {element?.id !== undefined && <span className="text-gray-500"></span>}
                  </Label>
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
                      <Label className="text-textColor inline-block pb-2">Rol</Label>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Rolni tanlang" />
                        </SelectTrigger>
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

            {/* Status */}
            <FormField
              control={control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">Holat</Label>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Holatni tanlang" />
                        </SelectTrigger>
                        <SelectContent className="z-[103]">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
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
              disabled={!canSubmit}
            >
              {element?.id !== undefined ? "O'zgartirish" : "Yaratish"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;