import request from "@/services";
import { ClubCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const updateClub = async ({ id, data }: { id: number; data: FormData }): Promise<ClubCreateRequest> => {
    const res = await request.patch<ClubCreateRequest>(`/club/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const useUpdateClub = () => {
    const queryClient = useQueryClient();
    return useMutation<ClubCreateRequest, AxiosError, { id: number; data: FormData }>({
        mutationFn: updateClub,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["club"] });
            toast.success("Club muvaffaqiyatli yangilandi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};