import request from "@/services";
import { AdminCreateRequest, IAdminData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createAdmin = async (data: IAdminData): Promise<AdminCreateRequest> => {
    const res = await request.post<AdminCreateRequest>("/auth/create", data);
    return res.data;
};

export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation<AdminCreateRequest, AxiosError, IAdminData>({
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
