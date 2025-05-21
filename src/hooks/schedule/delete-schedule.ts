import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteSchedule = async (id: string): Promise<void> => {
    await request.delete(`/schedule/${id}`);
};

export const useDeleteSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteSchedule(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedule"] });
            toast.success("Turnir muvaffaqiyatli o'chirildi!");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
