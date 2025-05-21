import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Form, FormField, FormItem, FormControl, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffCreateRequest } from "@/types";
import { useGetAllRegions } from "@/hooks/region/get-all-regions";
import { useCreateStaff } from "@/hooks/staff/create-staff";
import { useUpdateStaff } from "@/hooks/staff/update-staff";
import { IMG_DOMAIN } from "@/constants";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: StaffCreateRequest;
}

const formSchema = z.object({
  fullname: z.string().min(1, "Ism majburiy"),
  level: z.string().min(1, "Lavozim majburiy"),
  region_id: z.string().min(1, "Hudud ID majburiy"),
  role: z.string(),
  image_url: z.any().refine((file) => file instanceof File || typeof file === "string", {
    message: "Rasm majburiy",
  }),
});

const PartisipantModal = ({ isOpen, handleOpen, element }: ModalProp) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const { mutate: updateStaff } = useUpdateStaff();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      level: "",
      region_id: "",
      role: "Murabbiylar",
      image_url: undefined,
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, setValue, formState } = form;
  const { isValid, isDirty } = formState;

  const onClose = () => {
    reset({
      fullname: "",
      level: "",
      region_id: "",
      role: "Murabbiylar",
      image_url: undefined,
    });
    setPreviewImage(null);  
    setCoverImage(null);
    setValue("image_url", undefined as any, { shouldValidate: true });
    handleOpen();
  };

  const { data: regionsData } = useGetAllRegions();
  const { mutate: createStaff } = useCreateStaff();
  const regions = regionsData?.data;
  
  useEffect(() => {
    if (isOpen) {
      if (element && element.id) {
        console.log(element);
        
        reset({
          fullname: element.fullname ?? "",
          level: element.level ?? "",
          region_id: element.region?.id ?? "",
          role: element.role ?? "",
          image_url: element.image_url ?? undefined,
        });
        if (typeof element.image_url === "string") {
          setPreviewImage(`${IMG_DOMAIN}/${element.image_url}`);
        }
      } else {
        reset({
          fullname: "",
          level: "",
          region_id: "",
          role: "Murabbiylar",
        });
        setPreviewImage(null);
      }
    }
  }, [isOpen, reset, element]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("level", data.level);
    formData.append("region_id", data.region_id);
    formData.append("role", data.role);
    formData.append("image_url", data.image_url as File);
    if (element && element.id) {
      updateStaff({ id: element.id, data: formData });
    } else {
      createStaff(formData);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] rounded-lg py-6 px-5 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {element ? `Sportchilarni tahrirlash` : `Sportchilarni qo‘shish`}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden"></DialogDescription>
        <button onClick={onClose}>
          <X className="w-5 h-5 absolute top-4 right-4" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
            {/* Fullname */}
            <FormField
              control={control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <Label>To‘liq ism</Label>
                  <FormControl>
                    <Input {...field} placeholder="Masalan: Shaxriyor Karimov" />
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
                            <Label className=" inline-block pb-2">
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
                                        <SelectItem value="Murabbiylar">Murabbiylar</SelectItem>
                                        <SelectItem value="Jamoa">Jamoa</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
                        </FormControl>
                        <FormMessage />
                </FormItem>
                )}
            />

            {/* Level */}
            <FormField
              control={control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <Label>Lavozim (Level)</Label>
                  <FormControl>
                    <Input {...field} placeholder="Masalan: Bosh murabbiy" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Region ID */} 
                  <FormField
                    control={control}
                    name="region_id"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="relative w-full">
                            <Label className="text-textColor inline-block pb-2">
                                Hudud
                            </Label>
                            <Select
                                value={field.value || ""}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Hududni tanlang" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[103]">
                                  {regions?.map((region) => ( 
                                    <SelectItem key={region.id} value={region.id.toString()}>{region.name}</SelectItem>
                                  ))}
                                </SelectContent>
                            </Select>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />


            {/* Image Upload */}
               <FormField
                control={control}
                name="image_url"
                render={() => (
                  <FormItem>
                    <Label>Rasm</Label>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setValue("image_url", file as any, { shouldValidate: true, shouldDirty: true });
                            setCoverImage(file);
                            setPreviewImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                  {(coverImage || previewImage) && (
                      <div className="mt-2 flex flex-col gap-2">
                        <p className="text-sm text-gray-500">
                          Tanlangan rasm: <strong>{coverImage?.name || "Yuklangan rasm"}</strong>
                        </p>
                        <img
                          src={coverImage ? URL.createObjectURL(coverImage) : previewImage ?? `${IMG_DOMAIN}/${element?.image_url}`}
                          alt="Cover Preview"
                          className="w-[160px] h-[160px] object-cover rounded-[10px] border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            setCoverImage(null);
                            setValue("image_url", undefined as any, { shouldValidate: true });
                            if (previewImage) {
                              setPreviewImage(null);
                            }
                          }}
                          className="w-fit mt-1"
                        >
                          Rasmni o‘chirish
                        </Button>
                      </div>
                  )}

            <Button
              type="submit"
              className="w-full py-3 mt-4 bg-[#393F5F] text-white hover:opacity-90 rounded-[10px] text-md font-semibold"
              disabled={!isValid || !isDirty}
            >
              {element ? "O‘zgartirish" : "Yaratish"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PartisipantModal;
