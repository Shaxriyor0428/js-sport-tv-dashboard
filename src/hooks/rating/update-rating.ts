import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RatingCreateRequest } from "@/types";
import request from "@/services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const updateRating = async (id: string, data: RatingCreateRequest) => {
    const response = await request.patch(`/ratings/${id}`, data);
    return response.data;
};

export const useUpdateRating = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: RatingCreateRequest }) =>
            updateRating(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rating"] });
            toast.success("Rating muvaffaqiyatli o'zgartirildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
            console.error("Error updating rating:", error);
        },
    });
};
