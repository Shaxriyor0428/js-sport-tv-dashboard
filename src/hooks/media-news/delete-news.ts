import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteNews = async (id: string): Promise<void> => {
    await request.delete(`/news/${id}`);
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteNews(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            toast.success("News deleted successfully!");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
