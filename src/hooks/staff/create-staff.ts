import request from "@/services";
import { StaffCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

const createStaff = async (data: FormData): Promise<StaffCreateRequest> => {
    const res = await request.post<StaffCreateRequest>("/staff", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const useCreateStaff = () => {
    const queryClient = useQueryClient();
    return useMutation<StaffCreateRequest, AxiosError, FormData>({
        mutationFn: createStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staff"] });
            toast.success("Yangilik muvaffaqiyatli qo'shildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as ErrorResponse)?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
