import request from "@/services";
import { GalleryCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const updateGallery = async ({ id, data }: { id: string, data: FormData }): Promise<GalleryCreateRequest> => {
    const res = await request.patch<GalleryCreateRequest>(`/media/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};
    
export const useUpdateGallery = () => {
    const queryClient = useQueryClient();
    return useMutation<GalleryCreateRequest, AxiosError, { id: string, data: FormData }>({
        mutationFn: updateGallery,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["gallery"] });
            toast.success("Rasm muvaffaqiyatli yangilandi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
