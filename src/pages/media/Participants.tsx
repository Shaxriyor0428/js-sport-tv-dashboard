import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter, Plus, Trash2Icon, Edit, MoreHorizontal  } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { StaffCreateRequest } from "@/types";
import { useState } from "react";
import { useGetAllStaff } from "@/hooks/staff/get-all-staff";
import { HandleImage } from "@/components/handle-image/HandleImage";
import { IMG_DOMAIN } from "@/constants";
import { dateOptions } from "@/lib/data-options";
import { useConfirmModal } from "@/components/modal/useConfirmMOdal";
import { useDeleteStaff } from "@/hooks/staff/delete-staff";
import ConfirmModal from "@/components/modal/ConfirmModal";
import PartisipantModal from "@/components/modal/staff/PartisipantModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {                
  name?: string;
  select_name: "Rahbariyat" | "Sportchilar" | "Murabbiylar" | "Jamoa" ;
}

const Participants = () => {
  const form = useForm<FormData>({
    defaultValues: {
      name:"",
      select_name: "Sportchilar"
    },
      mode:"onChange"
  });
  
  const select_name = useWatch({
    control: form.control,
    name: "select_name"
  })

  const formValues = useWatch({ control: form.control });
  const [isOpen, setIsOpen] = useState(false);
  const [element, setElement] = useState<StaffCreateRequest | undefined>(undefined);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const handleOpen = (element?: StaffCreateRequest) => {
    setElement(element);
    setIsOpen(!isOpen);
  };

  const { mutate: deleteStaff } = useDeleteStaff();

  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();
  const handleDeleteClick = (id: number | undefined) => {
     openModal("Ishonchingiz komilmi siz rostdan ham ushbu qatnashuvchini o'chirishga rozimisiz ?", () => {
      deleteStaff({ id: id?.toString() ?? "" });  
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

  const { data } = useGetAllStaff({ name: select_name || "Sportchilar" });
  let staffData = data?.data
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sportchilar</h1>
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
                    name="select_name"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <div className="relative w-full">
                            <Select
                                value={field.value || ""}
                                onValueChange={(value) => field.onChange(value)}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sportchilar toifasini tanlang" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-[103]">
                                <SelectItem value="Sportchilar">Hammasi</SelectItem>
                                <SelectItem value="Jamoa">Jamoa</SelectItem>
                                <SelectItem value="Murabbiylar">Murabbiylar</SelectItem>
                                </SelectContent>
                            </Select>
                            </div>
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
        <Button className="ml-auto bg-mainBtnColor text-white" onClick={() => handleOpen()}>
            <Plus className="" />
            Sportchilarni qo'shish
          </Button>
      </div>
      {staffData?.length === 0 ?  (
       <div className="flex flex-col items-center justify-center h-full py-10 text-center text-gray-500">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 mb-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 16h-1v-4h-1m1-4h.01M12 20.25C7.167 20.25 3.25 16.333 3.25 11.5S7.167 2.75 12 2.75s8.75 3.917 8.75 8.75-3.917 8.75-8.75 8.75z"
          />
        </svg>
        <p className="text-lg font-medium">Sportchilar topilmadi</p>
        <p className="text-sm text-gray-400 mt-1">
          Qidiruvga mos keluvchi sportchi mavjud emas yoki ular hali qo‘shilmagan.
        </p>
      </div>
    ) : (
    <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
    <TableHeader>
    <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
        <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
        <TableHead className="px-3 text-black py-5">Rasm</TableHead>
        <TableHead className="px-3 text-black py-5">Ism Familya</TableHead>
        <TableHead className="px-3 text-black py-5">Lavozim</TableHead>
        <TableHead className="px-3 text-black py-5">Roli</TableHead>
        <TableHead className="px-3 text-black py-5">Sana</TableHead>
        <TableHead className="pr-6 text-right text-black py-5">Harakat</TableHead>
    </TableRow>
    </TableHeader>


    <TableBody>
        {staffData?.map((item, index) => (
        <TableRow
            key={item.id}
            className="bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE]"
        >
            <TableCell className="pl-6">{index + 1}</TableCell>
              <TableCell>
              <button onClick={() => {
                setIsImageOpen(true);
                setImage(item.image_url);
              }}>
                <img src={`${IMG_DOMAIN}/${item.image_url}`} alt="news" className="w-[35px] h-[35px] rounded-md" />
              </button>
            </TableCell>
            <TableCell>{item.fullname}</TableCell>
            <TableCell>{item.level}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>{new Date(item.created_at).toLocaleDateString("uz-UZ", dateOptions)}</TableCell>
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
                        <button onClick={() => handleDeleteClick(item.id)} className="w-full flex gap-2 items-center">
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
    )}
    <PartisipantModal isOpen={isOpen} handleOpen={handleOpen} element={element} />
    <HandleImage isOpen={isImageOpen} setIsOpen={setIsImageOpen} image={image ?? ""} />
    <ConfirmModal isOpen={isConfirmOpen} message={message} onConfirm={onConfirm} closeModal={closeModal} />

    </div>
  );
};

export default Participants;
