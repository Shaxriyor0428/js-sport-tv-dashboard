import request from "@/services";


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/types";

interface UpdateFreeInput {
    id: string;
    free: boolean;
}

const updateFre = async (data: { id: string, free: boolean}) => {
    const res = await request.patch("/free/update", { id: data.id, free: data.free }); 
    return res.data;
};

export const useUpdateFree = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<ErrorResponse>, UpdateFreeInput>({
        mutationFn: updateFre,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["free"] });
            toast.success("Free muvaffaqiyatli o'zgartirildi !");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
