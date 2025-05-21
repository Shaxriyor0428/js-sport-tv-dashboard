import request from "@/services";
import { AdminCreateRequest } from "@/types";
import { AdminProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createAdmin = async (data: AdminProps): Promise<AdminCreateRequest> => {
    const res = await request.post<AdminCreateRequest>("/admin/add", data);
    return res.data;
};

export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation<AdminCreateRequest, AxiosError, AdminProps>({
        mutationFn: createAdmin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin"] });
            toast.success("Admin muvaffaqiyatli qo'shildi !");
        },
        onError: (error) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
