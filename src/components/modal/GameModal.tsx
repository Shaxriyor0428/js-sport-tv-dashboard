import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IGameData } from "@/types";
import { DOMAIN } from "@/constants";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usecreateGame } from "@/hooks/games/create-game";
import { useupdateGame } from "@/hooks/games/update-game";
import { useGetFlags } from "@/hooks/flag/get-all-flag";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: IGameData;
}

const formSchema = z.object({
  homeTeamName: z.string().min(1, "Uy jamoasi nomi majburiy"),
  guestTeamName: z.string().min(1, "Mehmon jamoa nomi majburiy"),
  homeTeamFlag: z.string().min(1, "Uy jamoasi bayrog'i majburiy"),
  guestTeamFlag: z.string().min(1, "Mehmon jamoasi bayrog'i majburiy"),
  startTime: z.date({ required_error: "Boshlanish vaqti majburiy" }),
  coverImage: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", "Rasm tanlanishi kerak"),
});

type FormValues = z.infer<typeof formSchema>;

const GameModal: React.FC<ModalProp> = ({ isOpen, handleOpen, element }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { mutate: createGame } = usecreateGame();
  const { mutate: updateGame } = useupdateGame();
  const { data: flags = [] } = useGetFlags();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      homeTeamName: "",
      guestTeamName: "",
      homeTeamFlag: "",
      guestTeamFlag: "",
      startTime: undefined,
      coverImage: undefined,
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, setValue, watch, formState } = form;
  const { isValid, isDirty } = formState;

  const canSubmit = isValid && isDirty;

  const onClose = () => {
    reset({
      homeTeamName: "",
      guestTeamName: "",
      homeTeamFlag: "",
      guestTeamFlag: "",
      startTime: undefined,
      coverImage: undefined,
    });
    setImage(null);
    setPreviewImage(null);
    handleOpen();
  };

  useEffect(() => {
    if (isOpen && element) {
      reset({
        homeTeamName: element.homeTeamName,
        guestTeamName: element.guestTeamName,
        homeTeamFlag: element.homeTeamFlag,
        guestTeamFlag: element.guestTeamFlag,
        startTime: new Date(element.startTime),
        coverImage: element.coverImage,
      }, { keepDirty: false });
      
      if (typeof element.coverImage === "string") {
        setPreviewImage(`${DOMAIN}/${element.coverImage}`);
      }
    } else if (isOpen && !element) {
      reset({
        homeTeamName: "",
        guestTeamName: "",
        homeTeamFlag: "",
        guestTeamFlag: "",
        startTime: undefined,
        coverImage: undefined,
      });
      setPreviewImage(null);
    }
  }, [isOpen, element]);

  
  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("homeTeamName", data.homeTeamName);
    formData.append("guestTeamName", data.guestTeamName);
    formData.append("homeTeamFlag", data.homeTeamFlag);
    formData.append("guestTeamFlag", data.guestTeamFlag);

    formData.append("startTime", data.startTime.toISOString());

    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    } else if (typeof data.coverImage === "string") {
      formData.append("coverImage", data.coverImage);
    }

    try {
      if (element?.id) {
        updateGame(
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
        createGame(formData, {
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
        setValue("coverImage", undefined as any, { shouldValidate: true, shouldDirty: true });
        setPreviewImage(null);
        return;
      }
      if (!file.type.startsWith("image/")) {
        setValue("coverImage", undefined as any, { shouldValidate: true, shouldDirty: true });
        setPreviewImage(null);
        return;
      }
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
      setValue("coverImage", file, { shouldValidate: true, shouldDirty: true });
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setValue("coverImage", undefined as any, { shouldValidate: true, shouldDirty: true });
    if (previewImage && previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage(null);
  };

  const handleFlagSelect = ( value: string, nameField: "homeTeamName" | "guestTeamName", flagField: "homeTeamFlag" | "guestTeamFlag") => {
    const [name, flag] = value.split(":");
    setValue(nameField, name, { shouldTouch: true, shouldDirty: true, shouldValidate: true });
    setValue(flagField, flag, { shouldTouch: true, shouldDirty: true, shouldValidate: true });
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] rounded-xl py-4 px-5 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {element ? "O'yinni tahrirlash" : "Yangi o'yin qo'shish"}
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
              name="homeTeamName"
              render={({ }) => (
                <FormItem>
                  <FormLabel>Uy jamoasi nomi</FormLabel>
                  <FormControl>
                  <Select
                    value={watch("homeTeamName") && watch("homeTeamFlag") ? `${watch("homeTeamName")}:${watch("homeTeamFlag")}` : ""}
                    onValueChange={(value) => handleFlagSelect(value, "homeTeamName", "homeTeamFlag")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Jamoa tanlang" />
                      </SelectTrigger>
                      <SelectContent className="z-[103]">
                        {flags.map((flag) => (
                          <SelectItem key={flag.id} value={`${flag.name}:${flag.image}`}>
                            {flag.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="guestTeamName"
              render={({ }) => (
                <FormItem>
                  <FormLabel>Mehmon jamoa nomi</FormLabel>
                  <FormControl>
                  <Select
                        value={watch("guestTeamName") && watch("guestTeamFlag") ? `${watch("guestTeamName")}:${watch("guestTeamFlag")}` : ""}
                        onValueChange={(value) => handleFlagSelect(value, "guestTeamName", "guestTeamFlag")}
                        >

                      <SelectTrigger>
                        <SelectValue placeholder="Jamoa tanlang" />
                      </SelectTrigger>
                      <SelectContent className="z-[103]">
                        {flags.map((flag) => (
                          <SelectItem key={flag.id} value={`${flag.name}:${flag.image}`}>
                            {flag.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          <FormField
              control={control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Boshlanish vaqti</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ""}
                        onChange={(e) => {
                        const date = new Date(e.target.value);
                        setValue("startTime", date, { shouldValidate: true, shouldDirty: true });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="coverImage"
              render={() => (
                <FormItem>
                  <FormLabel>O'yin rasmi</FormLabel>
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
              {element ? "O'zgartirish" : "Yaratish"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;