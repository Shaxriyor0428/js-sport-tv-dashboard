import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter, Plus, Trash2Icon, Edit, MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { IRatingData } from "@/types";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useConfirmModal } from "@/components/modal/useConfirmMOdal";
import { useDeleteRating } from "@/hooks/rating/delete-rating";
import { useGetRatings } from "@/hooks/rating/get-ratings";
import RatingsModal from "@/components/modal/ratings/RatingsModal";
import { IMG_DOMAIN } from "@/constants";
import { HandleImage } from "@/components/handle-image/HandleImage";
// import ScoreDetailModal from "@/components/modal/ratings/ScoreDetailModal";
import ScoreDetailTable from "@/components/table/ScoreDetailTable";

interface FormData {
  name?: string;
  date?: string;
}

const Rating = () => {
  const form = useForm<FormData>();
  const formValues = useWatch({ control: form.control });
  const [isOpen, setIsOpen] = useState(false);
  const [element, setElement] = useState<IRatingData | undefined>(undefined);
  // const [isOpenScoreDetail, setIsOpenScoreDetail] = useState(false);
  // const [scoreDetail, setScoreDetail] = useState<IRatingData["score_details"] | undefined>(undefined);
  // const [id, setId] = useState<string | undefined>(undefined);
  const [openDetails, setOpenDetails] = useState<{ [key: string]: boolean }>({});
  const { mutate: deleteRating } = useDeleteRating();
  const [image, setImage] = useState<string | undefined>(undefined);
  const [isOpenImage, setIsOpenImage] = useState(false);
  
  // const [shortname_our_team, setShortnameOurTeam] = useState<string | undefined>(undefined);

  // const handleOpenScoreDetail = (scoreDetail: IRatingData["score_details"], id: string, shortname_our_team: string) => {
  //   setIsOpenScoreDetail(!isOpenScoreDetail);
  //   setScoreDetail(scoreDetail);
  //   setId(id);
  //   setShortnameOurTeam(shortname_our_team);
  // };

  const handleToggleDetails = (id: string) => {
    setOpenDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();
  const handleDeleteClick = (id: string) => {
    openModal("Ishonchingiz komilmi siz rostdan ham ushbu ratingni o'chirishga rozimisiz ?", () => {
      deleteRating({ id: id.toString() });
    });
  };

  const handleOpen = (element?: IRatingData) => {
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
  const ratings = useGetRatings().data?.data ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Rating</h1>
      <div className="mb-6 flex justify-end">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-center gap-4">
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
        <Button className="ml-auto bg-mainBtnColor text-white" onClick={() => setIsOpen(true)}>
          <Plus className="" />
          Create rating
        </Button>
      </div>

      <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
        <TableHeader>
          <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
            <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
            <TableHead className="px-2 text-black py-5">Rasm</TableHead>
            <TableHead className="px-2 text-black py-5">Ball</TableHead>
            <TableHead className="px-2 text-black py-5">Klub nomi</TableHead>
            <TableHead className="px-2 text-black py-5">Klub qisqacha nomi</TableHead>
            <TableHead className="px-2 text-black py-5">Federatsiya turi</TableHead>
            <TableHead className="pr-6 text-right text-black py-5">Harakat</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ratings?.map((item, inx) => (
            <React.Fragment key={item.id}>
              <TableRow
                key={item.id}
                className={cn(
                  "bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE] cursor-pointer",
                  openDetails[item.id ?? ""] && "bg-blue-50"
                )}
                onClick={() => handleToggleDetails(item.id ?? "")}
              >
                <TableCell className="pl-6">{inx + 1}</TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setIsOpenImage(true);
                      setImage(item.club.club_image);
                    }}
                  >
                    <img
                      src={`${IMG_DOMAIN}/${item.club.club_image}`}
                      alt="news"
                      className="w-[35px] h-[35px] rounded-md"
                    />
                  </button>
                </TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.club.name}</TableCell>
                <TableCell>{item.club.short_name}</TableCell>
                <TableCell>{item.club.federation_type}</TableCell>
                <TableCell className="text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        className="h-8 w-8 p-0 bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className={cn("w-4 h-4 text-header")} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen(item);
                          }}
                          className="w-full flex gap-2 items-center"
                        >
                          <Edit className="mr-2 w-4 h-4 text-blue-600" />
                          <span className={`min-w-[47px]`}>Ratingni tahrirlash</span>
                        </button>
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // handleOpenScoreDetail(item.score_details, item.id ?? "", item.club.short_name);
                          }}
                          className="w-full flex gap-2 items-center"
                        >
                          <Plus className="mr-2 w-4 h-4 text-green-600" />
                          <span className={`min-w-[47px]`}>Reyting ballini qo'shish</span>
                        </button>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleDetails(item.id ?? "");
                          }}
                          className="w-full flex gap-2 items-center"
                        >
                          {openDetails[item.id ?? ""] ? (
                            <ChevronUp className="mr-2 w-4 h-4 text-blue-600" />
                          ) : (
                            <ChevronDown className="mr-2 w-4 h-4 text-blue-600" />
                          )}
                          <span className={`min-w-[47px]`}>Barcha reyting detallari</span>
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <button
                          className="w-full flex gap-2 items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(item.id ?? "");
                          }}
                        >
                          <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                          <span className={`min-w-[47px]`}>O'chirish</span>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              {openDetails[item.id ?? ""] && <ScoreDetailTable item={item} />}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <ConfirmModal isOpen={isConfirmOpen} message={message} onConfirm={onConfirm} closeModal={closeModal} />
      <HandleImage isOpen={isOpenImage} setIsOpen={setIsOpenImage} image={image ?? ""} />
      <RatingsModal handleOpen={handleOpen} isOpen={isOpen} element={element as IRatingData} />
      {/* <ScoreDetailModal handleOpen={handleOpenScoreDetail} isOpen={isOpenScoreDetail} score_details={scoreDetail ?? []} id={id ?? ""} shortname_our_team={shortname_our_team ?? ""} /> */}
    </div>
  );
};

export default Rating;