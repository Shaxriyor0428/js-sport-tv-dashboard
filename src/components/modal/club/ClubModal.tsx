import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "../../ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IClubData } from "@/types";
import { useCreateClub } from "@/hooks/club/create-club";
import { useUpdateClub } from "@/hooks/club/update-club";
import { IMG_DOMAIN } from "@/constants";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: IClubData;
}

const formSchema = z.object({
  name: z.string().min(1, "Klub nomi majburiy"),
  club_image: z.any().refine(
    (file) => file instanceof File || typeof file === "string",
    "Rasm tanlanishi kerak"
  ),
  short_name: z.string().min(1, "Klub qisqartma nomi majburiy"),
  federation_type: z.string().min(1, "Federatsiya turi majburiy"),
  location_type: z.string().min(1, "Lokatsiya turi majburiy"),
  // more_info: z.object({}).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ClubModal: React.FC<ModalProp> = ({ isOpen, handleOpen, element }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const { mutate: createClub } = useCreateClub();
  const { mutate: updateClub } = useUpdateClub();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      club_image: undefined,
      short_name: "",
      federation_type: "",
      location_type: "",
      // more_info: {},
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, setValue, formState } = form;
  const { isValid, isDirty } = formState;

  const canSubmit = isValid && isDirty;

  const onClose = () => {
    reset({
      name: "",
      club_image: undefined,
      short_name: "",
      federation_type: "",
      location_type: "",
      // more_info: {},
    });
    setCoverImage(null);
    setPreviewImage(null);
    handleOpen();
  };

  useEffect(() => {
    if (isOpen) {
      if (element && element.id) {
        reset({
          name: element.name || "",
          club_image: element.club_image || undefined,
          short_name: element.short_name || "",
          federation_type: element.federation_type || "",
          location_type: element.location_type || "",
          // more_info: element.more_info || {},
        });
        if (typeof element.club_image === "string") {
          setPreviewImage(`${IMG_DOMAIN}/${element.club_image}`);
        } else {
          setPreviewImage(null);
        }
      } else {
        reset({
          name: "",
          club_image: undefined,
          short_name: "",
          federation_type: "",
          location_type: "",
          // more_info: {},
        });
        setPreviewImage(null);
        setCoverImage(null);
      }
    }
  }, [isOpen, element, reset]);

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.club_image instanceof File) {
      formData.append("club_image", data.club_image);
    } else if (typeof data.club_image === "string") {
      formData.append("club_image", data.club_image);
    }
    formData.append("short_name", data.short_name);
    formData.append("federation_type", data.federation_type);
    formData.append("location_type", data.location_type);
    // formData.append("more_info", JSON.stringify(data.more_info || {}));

    try {
      if (element?.id) {
        updateClub(
          { id: element.id, data: formData },
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
        createClub(formData, {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            console.error("Create error:", error);
          },
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] rounded-xl py-6 px-5 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {element ? "Klubni tahrirlash" : "Yangi klub qo‘shish"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <button onClick={onClose}>
          <X className="w-5 h-5 absolute top-4 right-4" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Klub nomi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masalan: Lokomotiv" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="short_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Klub qisqartma nomi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masalan: UZB" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="location_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Klub manzilini kiriting</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masalan: Toshkent" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="federation_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Federatsiya turi</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tanlang" />
                      </SelectTrigger>
                      <SelectContent className="z-[103]">
                        <SelectItem value="FIVB">FIVB</SelectItem>
                        <SelectItem value="AVC">AVC</SelectItem>
                        <SelectItem value="CAVA">CAVA</SelectItem>
                        <SelectItem value="UVF">UVF</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="club_image"
              render={() => (
                <FormItem>
                  <FormLabel>Klub rasmi</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 50 * 1024 * 1024) {
                            setValue("club_image", undefined as any, { shouldValidate: true, shouldDirty: true });
                            return;
                          }
                          if (!file.type.startsWith("image/")) {
                            setValue("club_image", undefined as any, { shouldValidate: true, shouldDirty: true });
                            return;
                          }
                          setValue("club_image", file, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
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
                  src={coverImage ? URL.createObjectURL(coverImage) : previewImage ?? ""}
                  alt="Cover Preview"
                  className="w-[160px] h-[160px] object-cover rounded-md border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    setCoverImage(null);
                    setValue("club_image", undefined as any , {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setPreviewImage(null);
                  }}
                  className="w-fit mt-1"
                >
                  Rasmni o‘chirish
                </Button>
              </div>
            )}

              <Button
                type="submit"
                className="flex-1 bg-[#393F5F] text-white hover:bg-[#2F3550] rounded-lg"
                disabled={!canSubmit}
              >
                {element ? "O‘zgartirish" : "Yaratish"}
              </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClubModal;