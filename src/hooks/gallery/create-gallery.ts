import request from "@/services";
import { GalleryCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createGallery = async (data: FormData): Promise<GalleryCreateRequest> => {
    const res = await request.post<GalleryCreateRequest>("/media", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};  

export const useCreateGallery = () => {
    const queryClient = useQueryClient();
    return useMutation<GalleryCreateRequest, AxiosError, FormData>({
        mutationFn: createGallery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
            toast.success("Rasm muvaffaqiyatli qo'shildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
