import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IFlagData } from "@/types";
import { DOMAIN } from "@/constants";
import { usecreateFlag } from "@/hooks/flag/create-flag";
import { useupdateFlag } from "@/hooks/flag/update-flag";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: IFlagData;
}

const formSchema = z.object({
  image: z.any().refine(
    (file) => file instanceof File || typeof file === "string",
    "Rasm tanlanishi kerak"
  ),
  name: z.string().min(1, "Flag nomi majburiy"),
});

type FormValues = z.infer<typeof formSchema>;

const FlagModal: React.FC<ModalProp> = ({ isOpen, handleOpen, element }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { mutate: createFlag } = usecreateFlag();
  const { mutate: updateFlag } = useupdateFlag();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, setValue, formState } = form;
  const { isValid, isDirty } = formState;

  const canSubmit = isValid && isDirty;

  const onClose = () => {
    reset({
      name: "",
      image: undefined,
    });
    setImage(null);
    setPreviewImage(null);
    handleOpen();
  };

  useEffect(() => {
    if (isOpen) {
      if (element && element.id) {
        reset({
          name: element.name || "",
          image: element.image || undefined,
        });
        if (typeof element.image === "string") {
          setPreviewImage(`${DOMAIN}/${element.image}`);
        } else {
          setPreviewImage(null);
        }
      } else {
        reset({
          name: "",
          image: undefined,
        });
        setImage(null);
        setPreviewImage(null);
      }
    }
  }, [isOpen, element, reset]);

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.image instanceof File) {
      formData.append("flagImage", data.image);
    } else if (typeof data.image === "string") {
      formData.append("flagImage", data.image);
    }

    try {
      if (element?.id) {
        updateFlag(
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
        createFlag(formData, {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setValue("image", undefined as any, { shouldValidate: true, shouldDirty: true });
        setPreviewImage(null);
        return;
      }
      if (!file.type.startsWith("image/")) {
        setValue("image", undefined as any, { shouldValidate: true, shouldDirty: true });
        setPreviewImage(null);
        return;
      }
      // Revoke old object URL if exists
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
      setValue("image", file, { shouldValidate: true, shouldDirty: true });
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setValue("image", undefined as any, { shouldValidate: true, shouldDirty: true });
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] rounded-xl py-4 px-5 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {element ? "Bayroqni tahrirlash" : "Yangi Bayroq qo‘shish"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <button onClick={onClose}>
          <X className="w-5 h-5 absolute top-4 right-4" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 mt-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bayroq nomi</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masalan: Lokomotiv" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Bayroq rasmi</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {(image || previewImage) && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  Tanlangan rasm: <strong>{image?.name || "Yuklangan rasm"}</strong>
                </p>
                <div className="relative w-fit">
                  <img
                    src={previewImage ?? ""}
                    alt="Cover Preview"
                    className="w-[160px] h-[160px] object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
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

export default FlagModal;