import request from "@/services";
import { NewsData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createNews = async (data: FormData): Promise<NewsData> => {
    const res = await request.post<NewsData>("/news", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

export const useCreateNews = () => {
    const queryClient = useQueryClient();
    return useMutation<NewsData, AxiosError, FormData>({
        mutationFn: createNews,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
            toast.success("Yangilik muvaffaqiyatli qo'shildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
