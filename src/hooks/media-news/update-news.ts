import request from "@/services";
import { NewsData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const updateNews = async ({ id, data }: { id: number; data: FormData }): Promise<NewsData> => {
    const res = await request.patch<NewsData>(`/news/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const useUpdateNews = () => {
    const queryClient = useQueryClient();
    return useMutation<NewsData, AxiosError, { id: number; data: FormData }>({
        mutationFn: updateNews,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            toast.success("Yangilik muvaffaqiyatli yangilandi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};