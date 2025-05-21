import request from "@/services";
import { RatingCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createRating = async (data: RatingCreateRequest): Promise<RatingCreateRequest> => {
    const res = await request.post<RatingCreateRequest>("/ratings", data);
    return res.data;
};

export const useCreateRating = () => {
    const queryClient = useQueryClient();
    return useMutation<RatingCreateRequest, AxiosError, RatingCreateRequest>({
        mutationFn: createRating,   
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rating"] });
            toast.success("Rating muvaffaqiyatli qo'shildi !");
        },
        onError: (error) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
