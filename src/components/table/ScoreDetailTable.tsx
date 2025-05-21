import { IRatingData, IScoreOneDetailModal, RatingCreateRequest } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Edit, MoreHorizontal, Trash2Icon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import ScoreOneDetailModal from "../modal/ratings/ScoreOneDetailModal";
import { useUpdateRating } from "@/hooks/rating/update-rating";
import { useConfirmModal } from "../modal/useConfirmMOdal";
import ConfirmModal from "../modal/ConfirmModal";

const ScoreDetailTable = ({ item }: { item: IRatingData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scoreDetail, setScoreDetail] = useState<IScoreOneDetailModal | null>(null);
  const [element, setElement] = useState<IScoreOneDetailModal[] | null>(null);
  const [id, setId] = useState<string | null>(null);


  const handleOpen = (element?: IScoreOneDetailModal, id?: string) => {
    setIsOpen(!isOpen);
    setScoreDetail(element ?? null);
    setId(id ?? null);
    setElement(
      typeof item.score_details === "string"
        ? JSON.parse(item.score_details)
        : item.score_details
    );
  };
  
  const { mutate: updateRating } = useUpdateRating();

  const handleDelete = (scoreDetailId: number) => {
    const details =
      typeof item.score_details === "string"
        ? JSON.parse(item.score_details)
        : item.score_details;
  
    const updatedDetails = details.filter(
      (detail: IScoreOneDetailModal) => detail.id !== scoreDetailId
    );
  
    const submitData = {
      score_details: JSON.stringify(updatedDetails),
    };
  
    updateRating({
      id: item.id.toString(),
      data: submitData as unknown as RatingCreateRequest,
    });
  };
  

  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();
  const handleDeleteClick = (id: number) => {
    openModal("Ishonchingiz komilmi siz rostdan ham ushbu ratingni o'chirishga rozimisiz ?", () => {
      handleDelete(id);
    });
  };


  return (
    <TableRow className="transition-all duration-300">
      <TableCell colSpan={7} className="p-4 bg-gray-50">
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Reyting detallari</h3>
              <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen(undefined, item.id.toString());
              }}
              className="border-[#393F5F] text-[#393F5F] bg-white hover:bg-[#393F5F] hover:text-white"
            >
              <Plus className="mr-2 w-4 h-4" />
              Yangi bitta score detail qo‘shish
            </Button>
          </div>
          {item.score_details ? (
            <Table className="mt-4">
              <TableHeader>
                <TableRow className="bg-white">
                  <TableHead className="text-black">Sana</TableHead>
                  <TableHead className="text-black">Jamoa</TableHead>
                  <TableHead className="text-black">Ballar</TableHead>
                  <TableHead className="text-black">Ballar</TableHead>
                  <TableHead className="text-black">Jamoa</TableHead>
                  <TableHead className="text-black">Natijalar</TableHead>
                  <TableHead className="text-black">Manzil</TableHead>
                  <TableHead className="text-black text-left"> 
                    <div className="flex flex-col items-start"> 
                        <span className="text-center">
                            Ballar
                        </span>
                    <span className="text-center">
                            + / -
                        </span>
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-black">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  const details =
                    typeof item.score_details === "string"
                      ? JSON.parse(item.score_details)
                      : item.score_details;

                  if (!Array.isArray(details) || details.length === 0) {
                    return (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-gray-500">
                          Hozircha reyting detallari yo‘q. Yangi qo‘shish uchun tugmani bosing.
                        </TableCell>
                      </TableRow>
                    );
                  }

                  let currentScore = item.score;

                  return details.map((detail: any, index: number) => {
                    const isHome = detail.location === "home";
                    const displayScore = currentScore
                    const nextScore = currentScore + detail.our_team_point;

                    const row = (
                      <TableRow key={detail.id ?? index}>
                        <TableCell>
                          {detail.date
                            ? new Date(detail.date).toLocaleDateString("en-CA")
                            : "-"}
                        </TableCell>

                        {isHome ? (
                          <>
                            <TableCell className="font-semibold">{detail.shortname_our_team || "-"}</TableCell>
                            <TableCell className="font-semibold">{displayScore}</TableCell>
                            <TableCell>{detail.enemy_team_points ?? "-"}</TableCell>
                            <TableCell className="font-semibold">{detail.shortname_enemy_team || "-"}</TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell className="font-semibold">{detail.shortname_enemy_team || "-"}</TableCell>
                            <TableCell>{detail.enemy_team_points ?? "-"}</TableCell>
                            <TableCell className="font-semibold">{displayScore}</TableCell>
                            <TableCell className="font-semibold">{detail.shortname_our_team || "-"}</TableCell>
                          </>
                        )}
                        {
                          isHome ? (
                            <TableCell>{detail.our_team_result} - {detail.enemy_team_result}</TableCell>
                          ) : (
                            <TableCell>{detail.enemy_team_result} - {detail.our_team_result}</TableCell>
                          )
                        }
                        <TableCell>{isHome ? "Uyda" : "Mehmonda"}</TableCell>
                        <TableCell className={`font-semibold ${detail.our_team_point > 0 ? "text-green-600" : "text-red-600"}`}>
                          {detail.our_team_point > 0 ? "+" + detail.our_team_point : detail.our_team_point}
                        </TableCell>
                        <TableCell className="text-right">
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
                                  className="w-full flex gap-2 items-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setElement(details);
                                    handleOpen(detail, item.id.toString());
                                  }}
                                >
                                  <Edit className="mr-2 w-4 h-4 text-blue-600" />
                                  <span className={`min-w-[47px]`}>Tahrirlash</span>
                                </button>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <button
                                  className="w-full flex gap-2 items-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(detail?.id);
                                  }}
                                >
                                  <Trash2Icon className="mr-2 w-4 h-4 text-red-600" />
                                  <span className={`min-w-[47px]`}>O‘chirish</span>
                                </button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );

                    currentScore = nextScore;
                    return row;
                  });
                })()}
              </TableBody>

            </Table>
          ) : (
            <p className="text-gray-500">
              Hozircha reyting detallari yo‘q. Yangi qo‘shish uchun tugmani bosing.
            </p>
          )}
        </div>
      </TableCell>
      <ScoreOneDetailModal
        id={id ?? ""}
        shortname_our_team={item.club.short_name}
        handleOpen={handleOpen}
        isOpen={isOpen}
        element={element}
        score_details={scoreDetail ?? {} as IScoreOneDetailModal}
        score={item.score}
      />
      <ConfirmModal isOpen={isConfirmOpen} message={message} onConfirm={onConfirm} closeModal={closeModal} />
    </TableRow>
  );
};

export default ScoreDetailTable;