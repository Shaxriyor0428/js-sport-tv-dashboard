import { useForm, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";
import { HandleImage } from "../handle-image/HandleImage";
import { useState } from "react";
import {
  Edit,
  ListFilter,
  MoreHorizontal,
  Plus,
  Trash2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FormData {
  name?: string;
  date?: string;
}

type TableData = {
  id: number;
  image: string;
  title: string;
  position: string;
  created_at: string;
};

type MediaStructureProps = {
  texts: {
    title: string;
    add: string;
    image: string;
    name: string;
    page: string;
    regDate: string;
    action: string;
  };
  data: TableData[];
  onAddClick?: () => void;
  onEdit?: (item: TableData) => void;
  onDelete?: (id: number) => void;
  children?: React.ReactNode;
};

const MediaStructure: React.FC<MediaStructureProps> = ({
  texts,
  data,
  onAddClick,
  onEdit,
  onDelete,
  children,
}) => {
  const form = useForm<FormData>();
  const formValues = useWatch({ control: form.control });

  const isAtLeastOneFieldFilled = Object.values(formValues).some((value) =>
    typeof value === "string" ? value.trim() !== "" : false
  );

  const onSubmit = async (data: FormData) => {
    console.log("Filter ma'lumotlari:", data);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{texts.title}</h1>

      {/* FILTER FORM */}
      <div className="mb-6 flex justify-end">
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
            <Button type="submit" disabled={!isAtLeastOneFieldFilled}>
              <ListFilter className="mr-2" />
              Filter
            </Button>
          </form>
        </Form>

        {/* ADD BUTTON */}
        <Button
          className="ml-auto bg-mainBtnColor text-white"
          onClick={onAddClick}
        >
          <Plus />
          {texts.add}
        </Button>
      </div>

      {/* TABLE */}
      <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
        <TableHeader>
          <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
            <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
            <TableHead className="px-3 text-black py-5">
              {texts.image}
            </TableHead>
            <TableHead className="px-3 text-black py-5">{texts.name}</TableHead>
            <TableHead className="px-3 text-black py-5">{texts.page}</TableHead>
            <TableHead className="px-3 text-black py-5">
              {texts.regDate}
            </TableHead>
            <TableHead className="pr-6 text-right text-black py-5">
              {texts.action}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id}
              className="bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE]"
            >
              <TableCell className="pl-6">{index + 1}</TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    setIsOpen(true);
                    setImage(item.image);
                  }}
                >
                  <img
                    src={item.image}
                    alt="img"
                    className="w-[35px] h-[35px] rounded-md"
                  />
                </button>
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell className="text-right pr-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="h-8 w-8 p-0 bg-white"
                    >
                      <MoreHorizontal className={cn("w-4 h-4 text-header")} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white">
                    <DropdownMenuItem>
                      <button
                        onClick={() => onEdit?.(item)}
                        className="w-full flex gap-2 items-center"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                        <span>Edit</span>
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button
                        onClick={() => onDelete?.(item.id)}
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

      {/* Image Preview */}
      <HandleImage isOpen={isOpen} setIsOpen={setIsOpen} image={image} />

      {/* ✅ MODAL CHILDREN */}
      {children}
    </div>
  );
};

export default MediaStructure;
