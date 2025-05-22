import request from "@/services";
import { IFlagCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const updateFlag = async ({ id, data }: { id: number; data: FormData }): Promise<IFlagCreateRequest> => {
    const res = await request.patch<IFlagCreateRequest>(`/flag/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const useupdateFlag = () => {
    const queryClient = useQueryClient();
    return useMutation<IFlagCreateRequest, AxiosError, { id: number; data: FormData }>({
        mutationFn: updateFlag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["flag"] });
            toast.success("Flag muvaffaqiyatli yangilandi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};