import request from "@/services";
import { ErrorResponse, IFlagCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";



const createFlag = async (data: FormData): Promise<IFlagCreateRequest> => {
    const res = await request.post<IFlagCreateRequest>("/flag", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const usecreateFlag = () => {
    const queryClient = useQueryClient();
    return useMutation<IFlagCreateRequest, AxiosError, FormData>({
        mutationFn: createFlag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["club"] });
            toast.success("Club muvaffaqiyatli qo'shildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as ErrorResponse)?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
