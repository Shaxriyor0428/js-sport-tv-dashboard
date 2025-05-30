import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter, Plus, Trash2Icon, Edit, MoreHorizontal, Link2  } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import AdminModal from "@/components/modal/AdminModal";
import { useGetAdmins } from "@/hooks/admin/get-admin";
import { IAdminData } from "@/types";
import { useDeleteAdmin } from "@/hooks/admin/delete-admin";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useConfirmModal } from "@/components/modal/useConfirmMOdal";
import { toast } from "react-toastify";
import { encrypt } from "@/lib/crypto-js";

interface FormData {                
  name?: string;
  date?: string;
}

const Admin = () => {
  const form = useForm<FormData>();
  const formValues = useWatch({ control: form.control });
  const [isOpen, setIsOpen] = useState(false);
  const [element, setElement] = useState<IAdminData | undefined>(undefined);
  const { mutate: deleteAdmin } = useDeleteAdmin();

  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();
  const handleDeleteClick = (id: string) => {
     openModal("Ishonchingiz komilmi siz rostdan ham ushbu adminni o'chirishga rozimisiz ?", () => {
      deleteAdmin({ id: id.toString() });
    });
  };

  const handleOpen = (element?: IAdminData) => {
    setElement(element);
    setIsOpen(!isOpen);
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
  const admins = useGetAdmins().data?.data ?? [];


  const handleCopy = (id: string) => {
    if (id) {
      const newUrl = new URL("https://jsporttv.com");
      newUrl.searchParams.append("page", "subscribe");
      const encryptedId = encrypt(id)
      newUrl.searchParams.append("r", encryptedId);

      navigator.clipboard
        .writeText(newUrl.toString())
        .then(() => {
          toast.success(`URL nusxalandi: ${newUrl.toString().toLowerCase()}`, {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((err) => {
          toast.error("Nusxalashda xatolik yuz berdi: " + err.message, {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      toast.error("Ma'lumotlar mavjud emas", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admins</h1>
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
            Admin yaratish
          </Button>
      </div>

    <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
    <TableHeader>
    <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
        <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
        <TableHead className="px-2 text-black py-5">Ism Familya</TableHead>
        <TableHead className="px-2 text-black py-5">Username</TableHead>
        <TableHead className="px-2 text-black py-5">Roli</TableHead>
        <TableHead className="px-2 text-black py-5">Holati</TableHead>
        <TableHead className="px-2 text-black py-5">Taklif Linki</TableHead>
        <TableHead className="pr-6 text-right text-black py-5">Harakat</TableHead>
    </TableRow>
    </TableHeader>

    <TableBody>
        {admins?.map((item, inx) => (
        <TableRow
            key={item.id}
            className="bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE]"
        >
            <TableCell className="pl-6">{inx + 1}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>
              <button onClick={() => handleCopy(item?.id || "")}>
              <Link2 />
              </button>
            </TableCell>
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
                        onClick={() => handleOpen(item as IAdminData)}
                          className="w-full flex gap-2 items-center"
                        >
                          <Edit className="mr-2 w-4 h-4 text-blue-600" />
                          <span className={`min-w-[47px]`}>Edit</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button className="w-full flex gap-2 items-center" onClick={() => handleDeleteClick(item.id ?? "")}>
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
      <AdminModal handleOpen={handleOpen} isOpen={isOpen} element={element} />
      <ConfirmModal isOpen={isConfirmOpen} message={message} onConfirm={onConfirm} closeModal={closeModal} />
    </div>
  );
};

export default Admin;
