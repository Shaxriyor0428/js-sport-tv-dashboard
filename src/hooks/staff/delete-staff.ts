import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const deleteStaff = async (id: string): Promise<void> => {
    await request.delete(`/staff/${id}`);
};

export const useDeleteStaff = () => {
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError, { id: string }>({
        mutationFn: ({ id }) => deleteStaff(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staff"] });
            toast.success("Staff deleted successfully!");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
