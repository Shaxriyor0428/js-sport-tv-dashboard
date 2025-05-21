import { useEffect, useState } from "react";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import {Form,FormField,FormItem,FormControl,FormMessage,FormLabel} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateRating } from "@/hooks/rating/update-rating";
import { IScoreOneDetailModal, RatingCreateRequest } from "@/types";
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from "@/components/ui/select";

interface ScoreOneDetailModalProps {
  id: string;
  handleOpen: () => void;
  isOpen: boolean;
  score_details: IScoreOneDetailModal;
  element: IScoreOneDetailModal[] | null;
  shortname_our_team: string;
  score: number;
}

const formSchema = z.object({
  date: z.string().optional(),
  shortname_enemy_team: z.string().optional(),
  shortname_our_team: z.string().optional(),
  enemy_team_points: z.coerce.number().optional(),
  our_team_point: z.coerce.number().optional(),
  our_team_result: z.coerce.number().optional(),
  enemy_team_result: z.coerce.number().optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ScoreOneDetailModal = ({ id, handleOpen, isOpen, score_details, element, shortname_our_team, score }: ScoreOneDetailModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: updateRating } = useUpdateRating();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      shortname_enemy_team: "",
      shortname_our_team: shortname_our_team,
      enemy_team_points: 0,
      our_team_point: 0,
      our_team_result: 0,
      enemy_team_result: 0,
      location: "home",
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, formState } = form;
  const { isValid, isDirty } = formState;

  useEffect(() => {
    if (isOpen) {
        if(score_details && id){
            reset({
                date: score_details.date || "",
                shortname_enemy_team: score_details.shortname_enemy_team || "",
                shortname_our_team: shortname_our_team,
                enemy_team_points: score_details.enemy_team_points ?? 0,
                our_team_point: score_details.our_team_point ?? 0,
                our_team_result: score_details.our_team_result ?? 0,
                enemy_team_result: score_details.enemy_team_result ?? 0,
                location: score_details.location || "",
            }); 
        }
    } else {
      reset({
            date: "",
            shortname_enemy_team: "",
            shortname_our_team: shortname_our_team,
            enemy_team_points: 0,
            our_team_point: 0,
            our_team_result: 0,
            enemy_team_result: 0,
            location: "home",
      });
    }
  }, [isOpen, score_details, reset]);

    const onSubmit = (data: FormValues) => {
        setIsSubmitting(true);
        try {
            const newId = element && element.length > 0
            ? Math.max(...element.map((f) => f.id ?? 0)) + 1
            : 1;
                      
        const newDetail = {
            id: id in score_details ? score_details.id : newId,
            date: data.date || "",
            shortname_enemy_team: data.shortname_enemy_team || "",
            shortname_our_team: data.shortname_our_team || "",
            enemy_team_points: data.enemy_team_points ?? 0,
            our_team_point: data.our_team_point ?? 0,
            our_team_result: data.our_team_result ?? 0,
            enemy_team_result: data.enemy_team_result ?? 0,
            location: data.location || "",
        };
    
        let updatedDetails: IScoreOneDetailModal[] = [];
        // if(score > 0){
        //     score = score + (data.our_team_point ?? 0)
        // }else {
        //     score = score - (data.our_team_point ?? 0)
        // }
    
        if (score_details && "id" in score_details) {
            updatedDetails = (element || []).map((item: IScoreOneDetailModal) =>
              item.id === score_details.id ? newDetail : item
            );
          } else {
            updatedDetails = [newDetail, ...(element || [])];
          }
          
    
        const submitData = {
            score_details: JSON.stringify(updatedDetails),
            score: score,
        };

        
        updateRating(
            { id, data: submitData as unknown as RatingCreateRequest },
            {
            onSuccess: () => {
                handleOpen(); // Modalni yopish
                setIsSubmitting(false);
                onClose();
            },
            onError: (error) => {
                console.error("Update error:", error);
                setIsSubmitting(false);
            },
            }
        );
        } catch (error) {
        console.error("Submit error:", error);
        setIsSubmitting(false);
        }
    };
  
  const onClose = () => {
    reset({
        date: "",
        shortname_enemy_team: "",
        shortname_our_team: shortname_our_team,
        enemy_team_points: 0,
        our_team_point: 0,
        our_team_result: 0,
        enemy_team_result: 0,
        location: "home",
    });
    handleOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px] rounded-xl bg-white max-h-[85vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {"id" in score_details   ? "Score detailni tahrirlash" : "Yangi score detail qo‘shish"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-4">
              <FormField
                control={control}
                name="date"
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
                name="shortname_our_team"
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
                name="shortname_enemy_team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raqib jamoa qisqa nomi</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
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
                name="our_team_point"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bizning jamoa balli</FormLabel>
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
                name="enemy_team_points"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raqib jamoa balli</FormLabel>
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
                name="our_team_result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bizning jamoa natijasi</FormLabel>
                    <FormControl>
                      <Input
                       type="number"
                       {...field}
                       value={field.value ?? ""}
                       placeholder="Masalan: 5"
                       className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                       />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="enemy_team_result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raqib jamoa natijasi</FormLabel>
                    <FormControl>
                      <Input
                       type="number"
                       {...field}
                       value={field.value ?? ""}
                       placeholder="Masalan: 0"
                       className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg"
                       />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />


              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>O'yin bo'lib o'tgan joyni tanlang<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg">
                          <SelectValue placeholder="Tanlang" />
                        </SelectTrigger>
                        <SelectContent className="z-[103] bg-white border-gray-200 rounded-lg shadow-lg">
                          <SelectItem value="home">Uyda</SelectItem>
                          <SelectItem value="guest">Mehmonda</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs mt-1" />
                  </FormItem>
                )}
              />

            </div>

            

            <div className="flex gap-4 mt-6">
              <Button
                type="submit"
                className="flex-1 bg-[#393F5F] text-white hover:bg-[#2F3550] rounded-lg"
                disabled={!isValid || !isDirty || isSubmitting}
              >
                {isSubmitting ? "Yuklanmoqda..." : "id" in score_details ? "Tahrirlash" : "Qo'shish"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreOneDetailModal;