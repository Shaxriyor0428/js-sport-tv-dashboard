import request from "@/services";
import { StaffCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const updateStaff = async ({ id, data }: { id: number; data: FormData }): Promise<StaffCreateRequest> => {
    const res = await request.patch<StaffCreateRequest>(`/staff/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const useUpdateStaff = () => {
    const queryClient = useQueryClient();
    return useMutation<StaffCreateRequest, AxiosError, { id: number; data: FormData }>({
        mutationFn: updateStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staff"] });
            toast.success("Staff muvaffaqiyatli yangilandi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};