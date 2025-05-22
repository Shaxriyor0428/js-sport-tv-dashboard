import request from "@/services";
import { ErrorResponse, IGameCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createGame = async (data: FormData): Promise<IGameCreateRequest> => {
    const res = await request.post<IGameCreateRequest>("/game/create", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const usecreateGame = () => {
    const queryClient = useQueryClient();
    return useMutation<IGameCreateRequest, AxiosError, FormData>({
        mutationFn: createGame,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["game"] });
            toast.success("Game muvaffaqiyatli qo'shildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as ErrorResponse)?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
