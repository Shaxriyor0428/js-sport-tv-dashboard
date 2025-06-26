import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import request from "@/services";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/types";

export const useStopStream = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<ErrorResponse>, void>({
        mutationFn: async () => {
            const res = await request.delete("/stream/close");
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stream"] });
            toast.success("🛑 Stream muvaffaqiyatli to‘xtatildi");
        },
        onError: (error) => {
            const msg = error.response?.data?.message || error.message;
            toast.error(`❌ Streamni to‘xtatishda xatolik: ${msg}`);
        },
    });
};
