import { useEffect, useState } from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormField, FormItem, FormControl, FormMessage, FormLabel} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateRating } from "@/hooks/rating/create-rating";
import { useUpdateRating } from "@/hooks/rating/update-rating";
import { IRatingData, RatingCreateRequest } from "@/types";
import { useGetAllClub } from "@/hooks/club/get-club";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: IRatingData;
}

const formSchema = z.object({
  score: z.coerce.number().min(0, "Bahoni kiriting"),
  gender_type: z.string().min(1, "Jins tanlanmagan"),
  sport_type: z.string().min(1, "Sport turi tanlanmagan"),
  club_id: z.string().min(1, "Klub tanlanmagan"),
});

type FormValues = z.infer<typeof formSchema>;

interface StepOneProps {
  control: any;
  clubs: any[];
}

const StepOne = ({ control, clubs }: StepOneProps) => {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={control}
        name="score"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Reyting balli<span className="text-red-500">*</span></FormLabel>
            <FormControl>
            <Input
              type="number"
                {...field}
                value={field.value ?? ""}
                placeholder="Masalan: 20"
                className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                />
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="gender_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Jinsi<span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg">
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[103] bg-white border-gray-200 rounded-lg shadow-lg">
                  <SelectItem value="erkak">Erkak</SelectItem>
                  <SelectItem value="ayol">Ayol</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sport_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sport turi<span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg">
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[103] bg-white border-gray-200 rounded-lg shadow-lg">
                  <SelectItem value="classic">Klassik</SelectItem>
                  <SelectItem value="beach">Plaj</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="club_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Klub<span className="text-red-500">*</span></FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg">
                  <SelectValue placeholder="Tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[103] bg-white border-gray-200 rounded-lg shadow-lg">
                  {clubs?.map((club) => (
                    <SelectItem key={club.id} value={club.id.toString()}>
                      {club.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};

const RatingsModal = ({ handleOpen, isOpen, element }: ModalProp) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score: 0,
      gender_type: "",
      sport_type: "",
      club_id: "",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, formState } = form;
  const { isValid, isDirty } = formState;

  const canSubmit = isValid && isDirty;

  const { mutate: createRating } = useCreateRating();
  const { mutate: updateRating } = useUpdateRating();
  const clubs = useGetAllClub().data?.data ?? [];

  const onClose = () => {
    reset({
      score: 0,
      gender_type: "",
      sport_type: "",
      club_id: "",
    });
    setIsSubmitting(false);
    handleOpen();
  };

  useEffect(() => {
    if (isOpen) {
      if (element && element.id) {
        reset({
          score: element.score || 0,
          gender_type: element.gender_type || "",
          sport_type: element.sport_type || "",
          club_id: element.club_id ? element.club_id.toString() : "",
        });
      } else {
        reset({
          score: 0,
          gender_type: "",
          sport_type: "",
          club_id: "",
        });
      }
    }
  }, [isOpen, element, reset]);

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const submitData = { ...data };

      if (element && element.id) {
        updateRating(
          { id: element.id, data: submitData as unknown as RatingCreateRequest },
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
        createRating(submitData as unknown as RatingCreateRequest, {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] rounded-xl bg-white max-h-[85vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {element?.id ? "Reytingni tahrirlash" : "Yangi reyting qo'shish"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6">
            <StepOne control={control} clubs={clubs} />
            <div className="flex gap-4 mt-6">
              <Button
                type="submit"
                className="flex-1 bg-[#393F5F] text-white hover:bg-[#2F3550] rounded-lg"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Yuklanmoqda..." : element?.id ? "O'zgartirish" : "Yaratish"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RatingsModal;