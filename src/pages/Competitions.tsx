import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter, Plus, Trash2Icon, Edit, MoreHorizontal  } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { scheduleOptions } from "@/lib/data-options";
import { ScheduleCreateRequest } from "@/types";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useConfirmModal } from "@/components/modal/useConfirmMOdal";
import { useGetAllSchedule } from "@/hooks/schedule/get-all-sechedule";
import { useDeleteSchedule } from "@/hooks/schedule/delete-schedule";
import ScheduleModal from "@/components/modal/schedule/ScheduleModal";
interface FormData {                
  name?: string;
  date?: string;
}

const Competitions = () => {
  const form = useForm<FormData>();
  const formValues = useWatch({ control: form.control });
  const [isOpen, setIsOpen] = useState(false);
  const [element, setElement] = useState<ScheduleCreateRequest | undefined>(undefined);
  const { mutate: deleteSchedule } = useDeleteSchedule();


  const handleOpen = (element?: ScheduleCreateRequest) => {
    setElement(element);
    setIsOpen(!isOpen);
  }

  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();
  const handleDeleteClick = (id: number) => {
     openModal("Ishonchingiz komilmi siz rostdan ham ushbu turnirni o'chirishga rozimisiz ?", () => {
      deleteSchedule({ id: id.toString() });
    });
  };  

  const isAtLeastOneFieldFilled = Object.values(formValues).some((value) => {
    if (typeof value === "string") {
      return value.trim() !== "";
    }
    return false;
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form ma'lumotlari:", data);
  };
  const schedules = useGetAllSchedule ({ all: true }).data?.data ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Jadval</h1>
      <div className="mb-6 flex justify-end">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap items-center gap-4"
        >

          {/* Fullname */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[220px]">
                <FormControl>
                  <Input placeholder="Search for name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-[220px]">
                <FormControl>       
                  <Input placeholder="12.03.2025" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          

          {/* Yuborish tugmasi */}
          <Button type="submit" disabled={!isAtLeastOneFieldFilled}>
            <ListFilter className="mr-2" />
            Filter
          </Button>
        </form>
      </Form>
        <Button
         className="ml-auto bg-mainBtnColor text-white"
         onClick={() => setIsOpen(true)}
        >
            <Plus className="" />
            Jadval yaratish
          </Button>
      </div>

    <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
    <TableHeader>
    <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
        <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
        <TableHead className="px-2 text-black py-5">Turnir sarlavhasi</TableHead>
        <TableHead className="px-2 text-black py-5">Boshlanish sanasi</TableHead>
        <TableHead className="px-2 text-black py-5">Tugash sanasi</TableHead>
        <TableHead className="px-2 text-black py-5">Jins</TableHead>
        <TableHead className="px-2 text-black py-5">Turnir turi</TableHead>
        <TableHead className="px-2 text-black py-5">Status</TableHead>
        <TableHead className="pr-6 text-right text-black py-5">Harakat</TableHead>
    </TableRow>
    </TableHeader>


    <TableBody>
        {schedules?.map((item, inx) => (
        <TableRow
            key={item.id}
            className="bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE]"
        >
            <TableCell className="pl-6">{inx + 1}.</TableCell>
            <TableCell className="max-w-[200px] truncate" title={item.title}>{item.title}</TableCell>
            <TableCell>{new Date(item.start_period).toLocaleDateString('uz-UZ', scheduleOptions)}</TableCell>
            <TableCell>{new Date(item.end_period).toLocaleDateString('uz-UZ', scheduleOptions)}</TableCell>
            <TableCell>{item.gender_type === "erkak" ? "Erkaklar" : "Ayollar"}</TableCell> 
            <TableCell>{item.type === "classic" ? "Klassik" : "Plaj"}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell className="text-right pr-6">
              <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" className="h-8 w-8 p-0 bg-white">
                        <MoreHorizontal className={cn("w-4 h-4 text-header")} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem>
                        <button
                        onClick={() => handleOpen(item)}
                          className="w-full flex gap-2 items-center"
                        >
                          <Edit className="mr-2 w-4 h-4 text-blue-600" />
                          <span className={`min-w-[47px]`}>Edit</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button className="w-full flex gap-2 items-center" onClick={() => handleDeleteClick(item.id ?? 0)}>
                          <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                          <span className={`min-w-[47px]`}>Delete</span>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
            </TableCell>

        </TableRow>
        ))}
    </TableBody>
    </Table>
      <ScheduleModal handleOpen={handleOpen} isOpen={isOpen} element={element} />
      <ConfirmModal isOpen={isConfirmOpen} message={message} onConfirm={onConfirm} closeModal={closeModal} />
    </div>
  );
};

export default Competitions;
