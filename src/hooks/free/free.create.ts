import request from "@/services";
import { ErrorResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createFree = async (free: boolean) => {
    const res = await request.post("/free/create", { free }); 
    return res.data;
};

export const useCreateFlag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFree,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["free"] });
            toast.success("Free muvaffaqiyatli qo'shildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as ErrorResponse)?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
