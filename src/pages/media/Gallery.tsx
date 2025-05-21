import { useState } from "react";
import GalleryModalWrapper from "@/components/modal/gallery/GalleryModalWrapper";
import { IGalleryData } from "@/types";
import { useGetAllGallery } from "@/hooks/gallery/get-all-gallery";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem,FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, ListFilter, MoreHorizontal, Edit, Trash2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { IMG_DOMAIN } from "@/constants";
import { useDeleteGallery } from "@/hooks/gallery/delete-gallery";
import { useConfirmModal } from "@/components/modal/useConfirmMOdal";
import { HandleImage } from "@/components/handle-image/HandleImage";
import { dateOptions } from "@/lib/data-options";
const formSchema = z.object({
  name: z.string().optional(),
  date: z.string().optional(),
});

interface FormData {
  name?: string;
  date?: string;
}

const Gallery = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
    },
  });

  const galleryData = useGetAllGallery({ all: true }).data?.data;
  const [modalOpen, setModalOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleOpen = (el?: IGalleryData) => {
    setElement(el);
    setModalOpen(!modalOpen);
  }
  const [element, setElement] = useState<IGalleryData | undefined>(undefined);

  const { mutate: deleteGallery } = useDeleteGallery();

  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();
  const handleDeleteClick = (id: number) => {
     openModal("Ishonchingiz komilmi siz rostdan ham ushbu galereyani o'chirishga rozimisiz ?", () => {
      deleteGallery({ id: id.toString() });
    });
  };
  const isAtLeastOneFieldFilled = !!form.watch("name") || !!form.watch("date");

  const onSubmit = (data: FormData) => {
    console.log("Filter:", data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Media Sahifasi</h1>

      <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap items-center gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-[220px]">
                  <FormControl>
                    <Input placeholder="Search for title" {...field} />
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
            <Button type="submit" disabled={!isAtLeastOneFieldFilled}>
              <ListFilter className="mr-2" />
              Filter
            </Button>
          </form>
        </Form>

        <Button
          className="bg-mainBtnColor text-white"
          onClick={() => handleOpen()}
        >
          <Plus className="mr-1" />
          Galereya qo'shish
        </Button>
      </div>

      <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
        <TableHeader>
          <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
            <TableHead className="pl-6">№</TableHead>
            <TableHead>Rasm</TableHead>
            <TableHead>Sarlavha</TableHead>
            <TableHead>Pozitsiya</TableHead>
            <TableHead>Sana</TableHead>
            <TableHead className="text-right pr-6">Harakat</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {galleryData?.map((item, index) => (
            <TableRow key={item.id} className="bg-white hover:bg-[#F5F6FA] border-b">
              <TableCell className="pl-6">{index + 1}</TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    setIsImageOpen(true);
                    setImage(item.video_img_url[0]);
                  }}
                >
                  <img
                    src={`${IMG_DOMAIN}/${item.video_img_url[0]}`}
                    alt="gallery"
                    className="w-[35px] h-[35px] rounded-md object-cover"
                  />
                </button>
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.position === "home" ? "Bosh sahifa" : item.position === "media" ? "Media" : item.position === "news" ? "Yangiliklar" : item.position === "beach" ? "Sohil volleybol" : item.position === "classic" ? "Klassik volleybol" : "Bosh sahifa"}</TableCell>
              <TableCell>
                {new Date(item.created_at).toLocaleDateString("uz-UZ", dateOptions)}
              </TableCell>
              <TableCell className="text-right pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="h-8 w-8 p-0 bg-white">
                      <MoreHorizontal className="w-4 h-4 text-header" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleOpen(item)}
                        className="w-full flex gap-2 items-center"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                        <span>Edit</span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => handleDeleteClick(item.id)}
                        className="w-full flex gap-2 items-center"
                      >
                        <Trash2Icon className="w-4 h-4 text-red-600" />
                        <span>Delete</span>
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <HandleImage
        isOpen={isImageOpen}
        setIsOpen={setIsImageOpen}
        image={image ?? ""}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
      <GalleryModalWrapper
        isOpen={modalOpen}
        handleOpen={handleOpen}
        element={element}   
      />
    </div>
  );
};

export default Gallery;
