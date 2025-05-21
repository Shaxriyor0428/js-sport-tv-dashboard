import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter, Plus, Trash2Icon, Edit, MoreHorizontal  } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { IClubData } from "@/types";
import { useState } from "react";
import { useGetAllClub } from "@/hooks/club/get-club";
import { HandleImage } from "@/components/handle-image/HandleImage";
import { IMG_DOMAIN } from "@/constants";
import { dateOptions } from "@/lib/data-options";
import { useConfirmModal } from "@/components/modal/useConfirmMOdal";
import { useDeleteClub } from "@/hooks/club/delete-club";
import ConfirmModal from "@/components/modal/ConfirmModal";
import ClubModal from "@/components/modal/club/ClubModal";
interface FormData {                
  name?: string;
  date?: string;
}

const Clubs = () => {
  const form = useForm<FormData>();
  const formValues = useWatch({ control: form.control });
  const [isOpen, setIsOpen] = useState(false);
  const [element, setElement] = useState<IClubData | undefined>(undefined);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const handleOpen = (element?: IClubData) => {
    setElement(element);
    setIsOpen(!isOpen);
  };

  const { mutate: deleteClub } = useDeleteClub();

  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();
  const handleDeleteClick = (id: number | undefined) => {
     openModal("Ishonchingiz komilmi siz rostdan ham ushbu qatnashuvchini o'chirishga rozimisiz ?", () => {
      deleteClub({ id: id?.toString() ?? "" });  
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

  const clubData = useGetAllClub().data?.data

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Clublar</h1>
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
              Club qo'shish
          </Button>
      </div>
      {clubData?.length === 0 ?  (
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
        <p className="text-lg font-medium">Club topilmadi</p>
        <p className="text-sm text-gray-400 mt-1">
          Qidiruvga mos keluvchi club mavjud emas yoki ular hali qo'shilmagan.
        </p>
      </div>
    ) : (
    <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
    <TableHeader>
    <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
        <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
        <TableHead className="px-2 text-black py-5">Rasm</TableHead>
        <TableHead className="px-2 text-black py-5">Club nomi</TableHead>
        <TableHead className="px-2 text-black py-5">Club qisqa nomi</TableHead>
        <TableHead className="px-2 text-black py-5">Federatsiya turi</TableHead>
        <TableHead className="px-2 text-black py-5">Manzili</TableHead>
        <TableHead className="px-2 text-black py-5">Sana</TableHead>
        <TableHead className="pr-6 text-right text-black py-5">Harakat</TableHead>
    </TableRow>
    </TableHeader>


    <TableBody>
        {clubData?.map((item, index) => (
        <TableRow
            key={item.id}
            className="bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE]"
        >
            <TableCell className="pl-5">{index + 1}</TableCell>
              <TableCell>
              <button onClick={() => {
                setIsImageOpen(true);
                setImage(item.club_image);
              }}>
                <img src={`${IMG_DOMAIN}/${item.club_image}`} alt="news" className="w-[35px] h-[35px] rounded-md" />
              </button>
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.short_name}</TableCell>
            <TableCell>{item.federation_type}</TableCell>
            <TableCell>{item.location_type}</TableCell>
            <TableCell>{new Date(item.created_at).toLocaleDateString("uz-UZ", dateOptions)}</TableCell>
            <TableCell className="text-right pr-5">
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
    <ClubModal isOpen={isOpen} handleOpen={handleOpen} element={element as IClubData} />
    <HandleImage isOpen={isImageOpen} setIsOpen={setIsImageOpen} image={image ?? ""} />
    <ConfirmModal isOpen={isConfirmOpen} message={message} onConfirm={onConfirm} closeModal={closeModal} />

    </div>
  );
};

export default Clubs;
