import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { PositionSelector } from "@/lib/selectPosition";

interface FormData {  
  title: string; 
  description: string; 
  position: string; 
  cover_image?: File;
  createdAt?: string;
}
interface StepOneProps { formMethods: UseFormReturn<FormData>; onNext: () => void; previewImage?: string | null; setPreviewImage: (image: string | null) => void; }

const StepOne = ({ formMethods, onNext, previewImage, setPreviewImage }: StepOneProps) => {
  const { control, handleSubmit, watch, setValue, formState: { errors, isDirty }, trigger } = formMethods;
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const positionRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const watchedImage = watch("cover_image");
    if (watchedImage instanceof File) {
      setCoverImage(watchedImage);
    }
  }, [watch("cover_image")]);

  const handleKeyDown = (e: React.KeyboardEvent, nextRef?: React.RefObject<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  const isFormFilled = !!watch("title") && !!watch("description") &&  !!watch("position") &&  (!!coverImage || !!previewImage);

  const onSubmit = async () => {
    const isValid = await trigger();
    const image = watch("cover_image");

    if (!previewImage && !image) {
      setValue("cover_image", undefined as any, { shouldValidate: true });
      return;
    }

    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="px-6">
      <div className="mb-1">
        <h2 className="text-xl font-semibold pt-4">Yangiliklar</h2>
        <p className="text-[#929CAC] font-medium text-sm text-end">Qadam 1/2</p>
      </div>

      <div className="max-h-[60vh] overflow-y-auto px-2">
        <Form {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-textColor pb-2">Sarlavha</Label>
                  <FormControl>
                    <Input
                      {...field}
                      ref={titleRef}
                      onKeyDown={(e) => handleKeyDown(e, descriptionRef as React.RefObject<HTMLElement>)}
                      placeholder="Masalan: Yangilik nomi"
                      className="border border-[#E4E6EE] rounded-[9px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-textColor pb-2">Tavsif</Label>
                  <FormControl>
                    <Textarea
                      {...field}
                      ref={descriptionRef}
                      onKeyDown={(e) => handleKeyDown(e, positionRef as React.RefObject<HTMLElement>)}
                      placeholder="Qisqacha izoh"
                      className="border border-[#E4E6EE] rounded-[9px] h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PositionSelector control={control} name="position" label="Qaysi bo'limda chiqishligi" placeholder="Bo'limni tanlang" options={[
                { label: "Bosh sahifa", value: "home" },
                { label: "Yangiliklar", value: "news" },
                { label: "Sohil volleybol", value: "beach" },
                { label: "Klassik volleybol", value: "classic" },
              ]} />

              <FormField
                control={control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-textColor pb-2">Yangilik chiqish sanasi</Label>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="border border-[#E4E6EE] rounded-[9px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />  

              <FormField
                control={control}
                name="cover_image"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-textColor pb-2">Yangilik uchun rasm</Label>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setCoverImage(file);
                          }
                        }}
                        className="border border-[#E4E6EE] rounded-[9px] file:cursor-pointer"
                      />
                    </FormControl>

                    {!coverImage && !previewImage && errors.cover_image && (
                      <p className="text-sm text-red-500 mt-1">Rasm majburiy</p>
                    )}

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
                    src={coverImage ? URL.createObjectURL(coverImage) : previewImage!}
                    alt="Cover Preview"
                    className="w-[160px] h-[160px] object-cover rounded-[10px] border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      setCoverImage(null);
                      setValue("cover_image", undefined as any, { shouldValidate: true });
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
              className="w-full py-4 bg-[#393F5F] text-white hover:opacity-90 rounded-[10px] text-lg font-semibold mt-4"
              disabled={!isFormFilled || !isDirty}
            >
              Davom etish
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StepOne;
