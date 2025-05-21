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
import StaffModal from "@/components/modal/staff/StaffModal";
import { useGetAllStaff } from "@/hooks/staff/get-all-staff";
import { HandleImage } from "@/components/handle-image/HandleImage";
import { IMG_DOMAIN } from "@/constants";
import { dateOptions } from "@/lib/data-options";
import { useConfirmModal } from "@/components/modal/useConfirmMOdal";
import { useDeleteStaff } from "@/hooks/staff/delete-staff";
import ConfirmModal from "@/components/modal/ConfirmModal";

interface FormData {                
  name?: string;
  date?: string;
}

const Leadership = () => {
  const form = useForm<FormData>();
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

  const staffData = useGetAllStaff({ name: "Rahbariyat" }).data?.data
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Rahbariyat</h1>
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
        <Button className="ml-auto bg-mainBtnColor text-white" onClick={() => handleOpen()}>
            <Plus className="" />
            Rahbariyat qo'shish
          </Button>
      </div>

    <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
    <TableHeader>
    <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
        <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
        <TableHead className="px-2 text-black py-5">Rasm</TableHead>
        <TableHead className="px-2 text-black py-5">Ism Familya</TableHead>
        <TableHead className="px-2 text-black py-5">Lavozim</TableHead>
        <TableHead className="px-2 text-black py-5">Roli</TableHead>
        <TableHead className="px-2 text-black py-5">Sana</TableHead>
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
    <StaffModal isOpen={isOpen} handleOpen={handleOpen} element={element} />
    <HandleImage isOpen={isImageOpen} setIsOpen={setIsImageOpen} image={image ?? ""} />
    <ConfirmModal isOpen={isConfirmOpen} message={message} onConfirm={onConfirm} closeModal={closeModal} />

    </div>
  );
};

export default Leadership;
