import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteClub = async (id: string): Promise<void> => {
    await request.delete(`/club/${id}`);
};

export const useDeleteClub = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteClub(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["club"] });
            toast.success("Club deleted successfully!");
        },
        onError: (error: AxiosError) => {   
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
