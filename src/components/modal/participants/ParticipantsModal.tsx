import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";

type Props = {
  formMethods: UseFormReturn<any>;
  fullClose: () => void;
};

const ParticipantsModal = ({ formMethods, fullClose }: Props) => {
  const { control, watch } = formMethods;
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const selectedFile = watch("cover_image");

  useEffect(() => {
    if (selectedFile instanceof File) {
      setCoverImage(selectedFile);
    }
  }, [selectedFile]);

  return (
    <div>
      <DialogTitle>
        <div className="flex justify-between items-center px-0">
          <span />
          <button onClick={fullClose}>
            <X className="w-5 h-5 text-black" />
          </button>
        </div>
      </DialogTitle>

      <div className="px-6">
        <h2 className="text-xl font-semibold pt-4">Ishtirokchilar</h2>

        <Form {...formMethods}>
          <form
            onSubmit={(e) => e.preventDefault()} // ❌ Submit bloklangan
            className="flex flex-col gap-5 mt-4"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>Sarlavha</Label>
                  <FormControl>
                    <Input placeholder="Masalan: Rasm nomi" {...field} />
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
                  <Label>Tavsif</Label>
                  <FormControl>
                    <Input placeholder="Izoh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <Label>Pozitsiya</Label>
                  <FormControl>
                    <Input placeholder="1, 2, 3..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="cover_image"
              render={({ field }) => (
                <FormItem>
                  <Label>Galereya uchun rasm</Label>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {coverImage && (
              <div>
                <p className="text-sm text-gray-500">
                  Tanlangan: <strong>{coverImage.name}</strong>
                </p>
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="preview"
                  className="rounded mt-2 max-h-[200px] object-cover"
                />
              </div>
            )}

            <Button type="submit" className="bg-[#393F5F] text-white h-[52px]">
              (Faol emas) Davom etish
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ParticipantsModal;
