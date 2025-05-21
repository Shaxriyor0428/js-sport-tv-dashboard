import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";
import { X, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaffCreateRequest } from "@/types";
import { useGetAllRegions } from "@/hooks/region/get-all-regions";
import { useCreateStaff } from "@/hooks/staff/create-staff";
import { useUpdateStaff } from "@/hooks/staff/update-staff";
import { IMG_DOMAIN } from "@/constants";
import { cn } from "@/lib/utils";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: StaffCreateRequest;
}

const formSchema = z.object({
  fullname: z.string().min(1, "Ism majburiy"),
  level: z.string().min(1, "Lavozim majburiy"),
  region_id: z.string().min(1, "Hudud ID majburiy"),
  image_url: z.any().refine(
    (file) => file instanceof File || typeof file === "string",
    "Rasm majburiy"
  ),
  more_info: z
    .object({
      email: z.string().optional(),
      phone: z.string().optional(),
      website: z.string().optional(),
      work_time: z.string().optional(),
    })
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface StepOneProps {
  control: any;
  regions: any[];
  coverImage: File | null;
  previewImage: string | null;
  setCoverImage: (file: File | null) => void;
  setPreviewImage: (url: string | null) => void;
  setValue: any;
}

const StepOne = ({
  control,
  regions,
  coverImage,
  previewImage,
  setCoverImage,
  setPreviewImage,
  setValue,
}: StepOneProps) => {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={control}
        name="fullname"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">To‘liq ism</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Masalan: Shaxriyor Karimov"
                className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] transition-colors rounded-lg"
              />
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Lavozim</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Masalan: Federatsiya rahbari"
                className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] transition-colors rounded-lg"
              />
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="region_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Hudud</FormLabel>
            <FormControl>
              <Select
                value={field.value || ""}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg">
                  <SelectValue placeholder="Hududni tanlang" />
                </SelectTrigger>
                <SelectContent className="z-[103] bg-white border-gray-200 rounded-lg shadow-lg">
                  {regions?.map((region) => (
                    <SelectItem
                      key={region.id}
                      value={region.id.toString()}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="image_url"
        render={() => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Rasm</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] rounded-lg cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 50 * 1024 * 1024) {
                        setValue("image_url", undefined, { shouldValidate: true });
                        return;
                      }
                      if (!file.type.startsWith("image/")) {
                        setValue("image_url", undefined, { shouldValidate: true });
                        return;
                      }
                      setValue("image_url", file, { shouldValidate: true, shouldDirty: true });
                      setCoverImage(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Upload className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      {(coverImage || previewImage) && (
        <div className="mt-4 flex flex-col gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            Tanlangan rasm: <strong>{coverImage?.name || "Yuklangan rasm"}</strong>
          </p>
          <img
            src={coverImage ? URL.createObjectURL(coverImage) : previewImage ?? undefined}
            alt="Cover Preview"
            className="w-[160px] h-[160px] object-cover rounded-lg border border-gray-300 shadow-sm"
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setCoverImage(null);
              setValue("image_url", undefined, { shouldValidate: true, shouldDirty: true });
              setPreviewImage(null);
            }}
            className="w-fit bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4"
          >
            Rasmni o‘chirish
          </Button>
        </div>
      )}
    </div>
  );
};

const StepTwo = ({ control }: { control: any }) => {
  return (
    <div className="flex flex-col gap-6">
      <FormField
        control={control}
        name="more_info.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder="Masalan: shaxriyor@gmail.com"
                className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] transition-colors rounded-lg"
              />
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="more_info.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Telefon raqam</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder="Masalan: +998901234567"
                className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] transition-colors rounded-lg"
              />
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="more_info.website"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Veb-sayt</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder="Masalan: https://example.com"
                className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] transition-colors rounded-lg"
              />
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="more_info.work_time"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Ish vaqti</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder="Masalan: Dushanba-Juma, 09:00-18:00"
                className="border-gray-300 focus:border-[#393F5F] focus:ring-[#393F5F] transition-colors rounded-lg"
              />
            </FormControl>
            <FormMessage className="text-red-500 text-xs mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};

const StaffModal = ({ isOpen, handleOpen, element }: ModalProp) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: updateStaff, isError: updateError, error: updateErrorMsg } = useUpdateStaff();
  const { mutate: createStaff, isError: createError, error: createErrorMsg } = useCreateStaff();
  const { data: regionsData } = useGetAllRegions();
  const regions = regionsData?.data ?? [];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      level: "",
      region_id: "",
      image_url: undefined,
      more_info: {
        email: "",
        phone: "",
        website: "",
        work_time: "",
      },
    },
    mode: "onChange",
  });

  const { control, handleSubmit, reset, setValue, formState, trigger } = form;
  const { isValid, isDirty } = formState;

  const canSubmit = isValid && isDirty;

  useEffect(() => {
    if (isOpen) {
      if (element && element.id) {
        let parsedMoreInfo = {};
        try {
          parsedMoreInfo =
            typeof element?.more_info === "string"
              ? JSON.parse(element.more_info)
              : element.more_info ?? {};
        } catch (e) {
          parsedMoreInfo = {};
        }
        form.reset({
          fullname: element.fullname ?? "",
          level: element.level ?? "",
          region_id: element.region?.id?.toString() ?? "",
          image_url: element.image_url ?? undefined,
          more_info: parsedMoreInfo,
        });
        if (typeof element.image_url === "string") {
          setPreviewImage(`${IMG_DOMAIN}/${element.image_url}`);
        }
      } else {
        reset({
          fullname: "",
          level: "",
          region_id: "",
          image_url: undefined,
          more_info: {
            email: "",
            phone: "",
            website: "",
            work_time: "",
          },
        });
        setPreviewImage(null);
        setCoverImage(null);
      }
    }
  }, [isOpen, element, form, reset]);

  useEffect(() => {
    if (createError || updateError) {
      console.error("Error:", createErrorMsg || updateErrorMsg);
    }
  }, [createError, updateError, createErrorMsg, updateErrorMsg]);

  const onClose = () => {
    reset({
      fullname: "",
      level: "",
      region_id: "",
      image_url: undefined,
      more_info: {
        email: "",
        phone: "",
        website: "",
        work_time: "",
      },
    });
    setPreviewImage(null);
    setCoverImage(null);
    setStep(1);
    setIsSubmitting(false);
    handleOpen();
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("level", data.level);
      formData.append("region_id", data.region_id);
      formData.append("role", "Rahbariyat");
      if (data.image_url instanceof File) {
        formData.append("image_url", data.image_url);
      }
      if (data.more_info && Object.values(data.more_info).some((val) => val)) {
        formData.append("more_info", JSON.stringify(data.more_info));
      }

      if (element && element.id) {
        updateStaff({ id: element.id, data: formData });
      } else {
        createStaff(formData);
      }
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    const isStepOneValid = await trigger(["fullname", "level", "region_id", "image_url"]);
    if (isStepOneValid) {
      setStep(2);
    }
  };

  const steps = ["Asosiy ma’lumotlar", "Qo‘shimcha ma’lumotlar"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[650px] rounded-lg py-8 px-6 bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {element ? "Rahbariyatni tahrirlash" : "Yangi rahbariyat qo‘shish"}
          </DialogTitle>
          <div className="flex gap-4 mt-4">
            {steps.map((label, index) => {
              const isActive = index + 1 === step;
              return (
                <div
                  key={index}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium border cursor-pointer transition",
                    isActive
                      ? "bg-gray-600 text-white border-gray-600"
                      : "bg-transparent text-header border-gray-300 hover:bg-gray-100"
                  )}
                  onClick={() => {
                    if (element?.id) {
                      setStep(index + 1);
                    }
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </DialogHeader>
        <DialogDescription className="hidden" />
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6">
            {step === 1 && (
              <StepOne
                control={control}
                regions={regions}
                coverImage={coverImage}
                previewImage={previewImage}
                setCoverImage={setCoverImage}
                setPreviewImage={setPreviewImage}
                setValue={setValue}
              />
            )}
            {step === 2 && <StepTwo control={control} />}

            <div className="flex gap-4 mt-6">
              {step > 1 && (
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 border-gray-300 rounded-lg"
                  disabled={isSubmitting}
                >
                  Orqaga
                </Button>
              )}
              {step < steps.length && (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="flex-1 bg-[#393F5F] text-white hover:bg-[#2F3550] rounded-lg"
                  disabled={isSubmitting}
                >
                  Keyingi
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 bg-[#393F5F] text-white hover:bg-[#2F3550] rounded-lg"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Yuklanmoqda..." : element ? "O‘zgartirish" : "Yaratish"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StaffModal;