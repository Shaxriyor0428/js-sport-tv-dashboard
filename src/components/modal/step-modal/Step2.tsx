import { UseFormReturn } from "react-hook-form";
import { ChevronRight, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DialogTitle } from "@/components/ui/dialog";

interface FormData {
  country: string;
  come: string;
  pol: string;
  accept: string;
}

interface Props {
  handleClose: (newStep?: number) => void;
  formMethods: UseFormReturn<FormData>;
  fullClose: () => void;
}

const Step2 = ({ handleClose, formMethods, fullClose }: Props) => {
  const { handleSubmit, control } = formMethods;

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    handleClose(3);
  };

  return (
    <div>
      <DialogTitle>
        <div className="flex justify-between gap-0 items-center px-0">
          <button onClick={() => handleClose(1)} className="flex gap-1 items-center">
            <ChevronRight className="rotate-180" />
            <span className="text-textColor font-medium text-sm">Назад</span>
          </button>
          <button
            onClick={() => fullClose()}
            className="text-black hover:text-gray-600 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </DialogTitle>
      <div className="px-6">
        <div className="mb-1">
          <h2 className="text-xl font-semibold pt-4 mb-0">Данные гостя</h2>
          <p className="text-[#929CAC] font-medium text-sm text-end">Шаг 2/3</p>
        </div>
        <Form {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">
                        Страна рождения
                      </Label>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выбирать" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[103]">
                          <SelectItem value="uz">Uzbekistan</SelectItem>
                          <SelectItem value="ru">Russia</SelectItem>
                          <SelectItem value="us">USA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="come"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">
                        Откуда прибыл
                      </Label>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выбирать" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[103]">
                          <SelectItem value="1">101</SelectItem>
                          <SelectItem value="2">102</SelectItem>
                          <SelectItem value="3">103</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="pol"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">
                        Пол
                      </Label>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger className="text-black">
                            <SelectValue placeholder="Выбирать" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="z-[103]">
                          <SelectItem value="2000">2000</SelectItem>
                          <SelectItem value="2001">2001</SelectItem>
                          <SelectItem value="2002">2002</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="accept"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">
                        Дата прибытия
                      </Label>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Введите"
                        className="border rounded-[9px] border-[#E9ECEE]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button className="w-full h-[52px] flex justify-center items-center bg-[#393F5F] text-white hover:opacity-90 transition-colors rounded-[10px] text-lg font-semibold" type="submit">
              Продолжать
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Step2;
