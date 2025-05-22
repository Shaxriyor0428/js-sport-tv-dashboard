import request from "@/services";
import { IGameCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const updateGame = async ({ id, data }: { id: string; data: FormData }): Promise<IGameCreateRequest> => {
    const res = await request.patch<IGameCreateRequest>(`/game/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const useupdateGame = () => {
    const queryClient = useQueryClient();
    return useMutation<IGameCreateRequest, AxiosError, { id: string; data: FormData }>({
        mutationFn: updateGame,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["game"] });
            toast.success("O'yin muvaffaqiyatli yangilandi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};