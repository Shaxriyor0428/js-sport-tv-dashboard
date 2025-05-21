import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload } from "lucide-react";
import { IGalleryData } from "@/types";
import { useCreateGallery } from "@/hooks/gallery/create-gallery";
import { useUpdateGallery } from "@/hooks/gallery/update-gallery";
import { IMG_DOMAIN } from "@/constants";
import { PositionSelector } from "@/lib/selectPosition";

type Props = { isOpen: boolean; handleOpen: () => void; element?: IGalleryData };

const formSchema = z.object({
  title: z.string().min(1, "Sarlavha majburiy"),
  position: z.string().optional(),
  images: z.array(z.any()).min(1, "Kamida bitta rasm tanlang").max(12, "12 tadan ortiq rasm yuklab bo‘lmaydi"),
});

const GalleryModalWrapper = ({ isOpen, handleOpen, element }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      position: "",
      images: [],
    },
    mode: "onChange",
  });

  const { control, handleSubmit, setValue, watch, reset, formState } = form;
  const { isValid, isDirty } = formState;

  const images = watch("images");
  const { mutate: createGallery } = useCreateGallery();
  const { mutate: updateGallery } = useUpdateGallery();
  const [previewImages, setPreviewImages] = useState<(string | null)[]>(Array(12).fill(null));
  const [deletedImages, setDeletedImages] = useState<string[]>([]); // O‘chirilgan eski rasmlar ro‘yxati

  const handleClose = () => {
    handleOpen();
    reset({
      title: "",
      position: "",
      images: [],
    });
    setPreviewImages(Array(12).fill(null));
    setDeletedImages([]);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];

    updatedImages[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    // Agar bu indexda eski rasm bo‘lsa, uni deletedImages dan olib tashlaymiz
    if (element?.video_img_url?.[index]) {
      setDeletedImages((prev) => prev.filter((url) => url !== element.video_img_url![index]));
    }

    setValue("images", updatedImages, { shouldValidate: true, shouldDirty: true });
    setPreviewImages(updatedPreviews);
    form.trigger("images");
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];

    // Agar bu eski rasm bo‘lsa (video_img_url dan), deletedImages ga qo‘shamiz
    if (element?.video_img_url?.[index] && !updatedImages[index]?.name) {
      setDeletedImages((prev) => [...prev, element.video_img_url![index]]);
    }

    updatedImages[index] = undefined;
    updatedPreviews[index] = null;

    setValue("images", updatedImages.filter((img) => img !== undefined), { shouldValidate: true, shouldDirty: true });
    setPreviewImages(updatedPreviews);
    form.trigger("images");
  };

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("position", data.position ?? "");

      data.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("image_url", image);
        }
      });

      if (element?.video_img_url) {
        const existingImagePromises = element.video_img_url.map(async (url, index) => {
          const isDeleted = deletedImages.includes(url);
          const isReplaced = data.images[index] instanceof File;

          if (!isDeleted && !isReplaced) {
            const isVideo = /\.(mp4|mov|avi|webm)$/i.test(url);
            if (isVideo) {
              return url;
            }
            try {
              const response = await fetch(`${IMG_DOMAIN}/${url}`);
              if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
              const blob = await response.blob();

              const ext = blob.type.split("/")[1] || "jpg";
              const fileName = `image-${index}.${ext}`;
              return new File([blob], fileName, { type: blob.type });
            } catch (err) {
              console.error("Image fetch error:", err);
              return null;
            }
          }

          return null;
        });

        const resolved = await Promise.all(existingImagePromises);
        resolved.filter((img): img is File | string => !!img).forEach((item) => {
            formData.append("image_url", item);
          });
      }

      if (element?.id) {
        updateGallery({ id: element.id.toString(), data: formData });
      } else {
        createGallery(formData);
      }

      handleClose();
    };


  useEffect(() => {
    if (isOpen) {
      if (element && element.id) {
        const existingImages = element.video_img_url || [];
        const filledImages = Array(12).fill(undefined).map((_, i) => existingImages[i] || undefined);
        const filledPreviews = Array(12).fill(null).map((_, i) => existingImages[i] || null);

        reset({
          title: element.title,
          position: element.position,
          images: filledImages,
        });
        setPreviewImages(filledPreviews);
        setDeletedImages([]);
      } else {
        reset({
          title: "",
          position: "media",
          images: [],
        });
        setPreviewImages(Array(12).fill(null));
        setDeletedImages([]);
      }
    }
  }, [isOpen, reset, element]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="max-w-[750px] rounded-3xl py-6 px-5 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Rasm qo’shish</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <button onClick={handleClose}>
          <X className="w-5 h-5 absolute top-4 right-4" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Sarlavha</Label>
                  <FormControl>
                    <Input {...field} placeholder="Rasm nomi" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PositionSelector
              control={control}
              name="position"
              label="Qaysi bo'limda chiqishligi"
              placeholder="Bo'limni tanlang"
              options={[
                { label: "Bosh sahifa", value: "home" },
                { label: "Yangiliklar", value: "news" },
                { label: "Sohil volleybol", value: "beach" },
                { label: "Klassik volleybol", value: "classic" },
                { label: "Media", value: "media" },
              ]}
            />

            <FormField
              control={control}
              name="images"
              render={() => (
                <FormItem>
                  <Label>Rasmlar</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 12 }).map((_, index) => {
                      const file = images?.[index];
                      const preview = file instanceof File ? URL.createObjectURL(file) : previewImages[index];

                      return (
                        <div
                          key={index}
                          className="relative border border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center group overflow-hidden"
                        >
                          {preview ? (
                            <>
                              <img
                                src={preview.startsWith("blob:") ? preview : `${IMG_DOMAIN}/${preview}`}
                                alt={`preview-${index}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                                onClick={() => handleImageRemove(index)}
                              >
                                <X className="w-4 h-4 text-red-500" />
                              </button>
                            </>
                          ) : (
                            <label className="flex flex-col items-center justify-center text-gray-400 text-sm w-full h-full cursor-pointer">
                              <Upload className="w-6 h-6 mb-1" />
                              <span>Rasm joylash</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageSelect(e, index)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                            </label>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 bg-[#393F5F] text-white hover:opacity-90 rounded-[10px] text-md font-semibold mt-2"
              disabled={!isValid || !isDirty}
            >
              Saqlash
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryModalWrapper;