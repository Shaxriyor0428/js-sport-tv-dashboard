import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
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
  citizenship: string;
  passportType: string;
  birthday: string;
  seria: string;
}

interface Props {
  handleClose: (newStep?: number) => void;
  formMethods: UseFormReturn<FormData>;
  fullClose: () => void;
}

const Step1 = ({ handleClose, formMethods, fullClose }: Props) => {
  const { handleSubmit, control } = formMethods;

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    handleClose(2);
  };

  return (
    <div>
      <DialogTitle>
        <div className="flex justify-between gap-0 items-center px-0">
          <span></span>
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
          <p className="text-[#929CAC] font-medium text-sm text-end">Шаг 1/3</p>
        </div>
        <Form {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">
                        Гражданство
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
              name="passportType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">
                        Тип паспорта
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
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">
                        Дата рождения
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
              name="seria"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative w-full">
                      <Label className="text-textColor inline-block pb-2">
                        Паспорт серия
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

export default Step1;
