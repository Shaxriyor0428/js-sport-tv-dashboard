import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteGallery = async (id: string): Promise<void> => {
    await request.delete(`/media/${id}`);
};

export const useDeleteGallery = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteGallery(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
            toast.success("Gallery deleted successfully!");
        },  
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
