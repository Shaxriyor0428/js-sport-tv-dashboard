import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Control } from "react-hook-form";

interface PositionSelectorProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  defaultValues?: string;
}

export const PositionSelector = ({
  control,
  name,
  label = "Bo‘lim",
  placeholder = "Bo‘limni tanlang",
  options,
  defaultValues,
}: PositionSelectorProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label className="inline-block pb-2">{label}</Label>
          <FormControl>
            <Select value={defaultValues || field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="z-[103]">
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
