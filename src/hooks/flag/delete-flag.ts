import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteFlag = async (id: string): Promise<void> => {
    await request.delete(`/flag/${id}`);
};

export const usedeleteFlag = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteFlag(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["flag"] });
            toast.success("Flag deleted successfully!");
        },
        onError: (error: AxiosError) => {   
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
