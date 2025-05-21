import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteRating = async (id: string): Promise<void> => {
    await request.delete(`/ratings/${id}`);
};

export const useDeleteRating = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteRating(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rating"] });
            toast.success("Rating muvaffaqiyatli o'chirildi!");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
