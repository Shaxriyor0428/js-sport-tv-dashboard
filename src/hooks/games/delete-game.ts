import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteGame = async (id: string): Promise<void> => {
    await request.delete(`/game/${id}`);
};

export const usedeleteGame = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteGame(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["game"] });
            toast.success("O'yin muvaffaqiyatli o'chirildi!");
        },
        onError: (error: AxiosError) => {   
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
