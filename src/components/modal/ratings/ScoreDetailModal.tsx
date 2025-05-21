import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateRating } from "@/hooks/rating/update-rating";
import { IRatingData, RatingCreateRequest } from "@/types";

interface ModalProp {
  isOpen: boolean;
  handleOpen: (scoreDetail: IRatingData["score_details"], id: string, shortname_our_team: string) => void;
  id: string;
  score_details: IRatingData["score_details"] | undefined;
  shortname_our_team: string;
}

const formSchema = z.object({
  score_details: z.array(z.object({
        id: z.number().optional(),
        date: z.string().optional(),
        shortname_enemy_team: z.string().optional(),
        shortname_our_team: z.string().optional(),
        enemy_team_points: z.coerce.number().optional(),
        our_team_point: z.coerce.number().optional(),
        our_team_result: z.coerce.number().optional(),
        enemy_team_result: z.coerce.number().optional(),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ScoreDetailModal = ({ handleOpen, isOpen, id, score_details, shortname_our_team }: ModalProp) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      score_details: [],
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, formState } = form;
  const { isValid, isDirty } = formState;
  const { fields, insert, remove } = useFieldArray({
    control,
    name: "score_details",
  });

  const canSubmit = isValid && (isDirty || fields.length > 0);

  const { mutate: updateRating } = useUpdateRating();

  const onClose = () => {
    reset({ score_details: [] });
    setIsSubmitting(false);
    handleOpen(score_details ?? [], id, shortname_our_team);
  };

  useEffect(() => {
    if (isOpen) {
      if (score_details) {
        const parsedDetails =
          typeof score_details === "string" ? JSON.parse(score_details) : score_details;
        reset({
          score_details: Array.isArray(parsedDetails) ? parsedDetails : [],
        });
      } else {
        reset({ score_details: [] });
      }
    }
  }, [isOpen, reset, score_details]);

  const handleAddNew = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map((f: any) => f.id || 0)) + 1 : 1;
    insert(0, {
      id: newId, // yangi id
      date: "",
      shortname_enemy_team: "",
      shortname_our_team: shortname_our_team,
      enemy_team_points: 0,
      our_team_point: 0,
      our_team_result: 0,
      enemy_team_result: 0,
    });
  };
  

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const submitData = {
        score_details: JSON.stringify(data.score_details ?? []),
      };

      updateRating(
        { id, data: submitData as unknown as RatingCreateRequest },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            console.error("Update error:", error);
          },
        }
      );
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] rounded-xl bg-white max-h-[85vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Reyting ballini tahrirlash</DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4 ">
                <Button
                  type="submit"
                  className="flex-1 bg-[#393F5F] text-white hover:bg-[#2F3550] rounded-lg"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? "Yuklanmoqda..." : "Saqlash"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddNew}
                  className="border-[#393F5F] text-[#393F5F] bg-white hover:bg-[#393F5F] hover:text-white"
                >
                  Yangi qo‘shish
                </Button>
              </div>

              {fields.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Hozircha qo‘shimcha ma’lumotlar yo‘q. Yangi qo‘shish uchun tugmani bosing.
                </p>
              )}

              {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-lg bg-gray-50 relative">
                  <Button
                    type="button"
                    variant="default"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={control}
                      name={`score_details.${index}.date`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sana</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value || ""}
                              onChange={(e) => field.onChange(e.target.value || undefined)}
                              className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`score_details.${index}.shortname_our_team`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bizning jamoa qisqa nomi</FormLabel>
                          <FormControl>
                            <Input  
                              {...field}
                              value={shortname_our_team}
                              title="Bu jamoa allaqachon mavjud"
                              placeholder="Masalan: UZB"
                              className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg disabled:bg-gray-100 disabled:text-black"
                              disabled
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`score_details.${index}.shortname_enemy_team`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Raqib jamoa qisqa nomi</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Masalan: RUS"
                              className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`score_details.${index}.our_team_point`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bizning jamoa balli</FormLabel>
                          <FormControl>
                            <Input
                             type="number"
                             {...field}
                             value={field.value ?? ""}
                             placeholder="Masalan: 45"
                             className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                             />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`score_details.${index}.enemy_team_points`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Raqib jamoa balli</FormLabel>
                          <FormControl>
                            <Input
                               type="number"
                               {...field}
                               value={field.value ?? ""}
                               placeholder="Masalan: 28"
                               className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                               />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`score_details.${index}.our_team_result`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bizning jamoa natijasi</FormLabel>
                          <FormControl>
                            <Input
                             type="number"
                             {...field}
                             value={field.value ?? ""}
                             placeholder="Masalan: 3"
                             className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                             />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`score_details.${index}.enemy_team_result`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Raqib jamoa natijasi</FormLabel>
                          <FormControl>
                            <Input
                               type="number"
                               {...field}
                               value={field.value ?? ""}
                               placeholder="Masalan: 1"
                               className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                               />
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs mt-1" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreDetailModal;
