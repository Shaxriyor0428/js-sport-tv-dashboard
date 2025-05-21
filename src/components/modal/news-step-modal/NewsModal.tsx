import { memo, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { INewsData } from "@/types";
import { X } from "lucide-react";
import { useCreateNews } from "@/hooks/media-news/create-news";
import { IMG_DOMAIN } from "@/constants";
import { useUpdateNews } from "@/hooks/media-news/update-news";
import { replaceImageUrls } from "@/lib/replace-image-url";

interface ModalProp {
  isOpen: boolean;
  handleOpen: () => void;
  element?: INewsData;
}

interface StoredImage {
  base64: string;
  name: string;
}

export interface Block {
  type: string;
  data: {
    file: {
      url: string;
    };
  };
}

const formSchemaStep1 = z.object({
  title: z.string(),
  description: z.string(),
  position: z.string(),
  cover_image: z.instanceof(File).optional(),
  createdAt: z.string().optional(),
});

const formSchemaStep2 = z.object({
  content: z.string(),
});

const NewsModal = ({ handleOpen, isOpen, element }: ModalProp) => {
  const [step, setStep] = useState(1);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const formStep1 = useForm({
    resolver: zodResolver(formSchemaStep1),
    defaultValues: { title: "", description: "", position: "", createdAt: new Date().toISOString() },
  });

  const formStep2 = useForm({
    resolver: zodResolver(formSchemaStep2),
    defaultValues: { content: "" },
  });

  const resetForm = () => {
    formStep1.reset({
      title: "",
      description: "",
      position: "news",
      cover_image: undefined, // because we can't make string to File directly
    });
    formStep2.reset({
      content: "",
    });
    setCoverPreview(null);
  };

  const fullClose = () => {
    handleOpen();
    formStep1.reset();
    formStep2.reset();
    setStep(1);
    setCoverPreview(null);
    localStorage.removeItem("editorImages");
  };

  const { mutate: createNews } = useCreateNews();
  const { mutate: updateNews } = useUpdateNews();

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (element && element.id) {
        replaceImageUrls(element);
        const createdAt = new Date(element.created_at);
        const formattedDate = createdAt.toISOString().split('T')[0];
        formStep1.reset({
          title: element.title,
          description: element.description,
          position: element.position,
          cover_image: undefined, // because we can't make string to File directly
          createdAt: formattedDate,
        });
        formStep2.reset({
          content: element.content,
        });
        setCoverPreview(`${IMG_DOMAIN}/${element.cover_image}`);
      } else {
        resetForm();
        setCoverPreview(null);
        localStorage.removeItem("editorImages");
      }
    }
  }, [isOpen, element]);

  const handleNextStepOne = async () => {
    const isValid = await formStep1.trigger();
    if (isValid) {
      setStep(2);
    }
  };

  const handleSubmitAll = async () => {
    const isValidStep1 = await formStep1.trigger();
    const isValidStep2 = await formStep2.trigger();
    if (!isValidStep1 || !isValidStep2) return;

    const step1Data = formStep1.getValues();
    const step2Data = formStep2.getValues();
    const formData = new FormData();

    formData.append("title", step1Data.title);
    formData.append("description", step1Data.description);
    formData.append("position", step1Data.position);

    if (step1Data.cover_image instanceof File) {
      formData.append("cover_image", step1Data.cover_image);
    }

    formData.append("content", step2Data.content);
    formData.append("createdAt", new Date(step1Data?.createdAt || new Date()).toISOString());

    if (step2Data.content.includes("http")) {
      const storedImages = JSON.parse(
        localStorage.getItem("editorImages") || "[]"
      );
      // const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
      // const invalidImages = storedImages.filter((image: StoredImage) => {
      //   const ext = image.name.split(".").pop()?.toLowerCase();
      //   console.log(ext);
        
      //   return !allowedExtensions.includes(ext || "");
      // });
  
      // if (invalidImages.length > 0) {
      //   toast.error("Ruxsat berilmagan rasm formati yuklandi. Faqat JPG, PNG yoki WEBP fayllarga ruxsat berilgan.");
      //   return;
      // }
      storedImages.forEach((image: StoredImage) => {
        const byteString = atob(image.base64.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        const file = new Blob([uint8Array], { type: "image/png" });
        formData.append("content_images", file, image.name);
      });
    }

    if (element && element.id) {
      updateNews({ id: element.id, data: formData });
      localStorage.removeItem("editorImages");
    } else {
      createNews(formData);
      localStorage.removeItem("editorImages");
    }
    fullClose();
  };

  const handleBack = () => setStep(1);

  const steps = ["Title, Description, Position, Cover Image", "Content"];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleOpen()}>
      <DialogContent className="max-w-[1000px] rounded-lg pt-5 pb-10 bg-white overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            <div className="flex gap-5">
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
          </DialogTitle>
          <button onClick={fullClose}>
            <X className="w-6 h-6 absolute top-4 right-4" />
          </button>
        </DialogHeader>
        <DialogDescription className="hidden" />
        {step === 1 && (
          <StepOne
            formMethods={formStep1}
            onNext={handleNextStepOne}
            previewImage={coverPreview}
            setPreviewImage={setCoverPreview}
          />
        )}
        {step === 2 && (
          <StepTwo
            setValue={formStep2.setValue}
            getValues={formStep2.getValues}
            handleClose={handleSubmitAll}
            handleBack={handleBack}
            element={element}
            isDirty={formStep1.formState.isDirty || formStep2.formState.isDirty}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default memo(NewsModal);
