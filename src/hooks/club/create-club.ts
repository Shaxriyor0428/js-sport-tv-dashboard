import request from "@/services";
import { ClubCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
    message: string;
}

const createClub = async (data: FormData): Promise<ClubCreateRequest> => {
    const res = await request.post<ClubCreateRequest>("/club", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const useCreateClub = () => {
    const queryClient = useQueryClient();
    return useMutation<ClubCreateRequest, AxiosError, FormData>({
        mutationFn: createClub,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["club"] });
            toast.success("Club muvaffaqiyatli qo'shildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as ErrorResponse)?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
