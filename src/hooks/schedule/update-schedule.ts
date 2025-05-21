import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScheduleCreateRequest } from "@/types";
import request from "@/services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const updateSchedule = async (id: number, data: ScheduleCreateRequest) => {
    const response = await request.patch(`/schedule/${id}`, data);
    return response.data;
};

export const useUpdateSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ScheduleCreateRequest }) =>
            updateSchedule(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedule"] });
            toast.success("Turnir muvaffaqiyatli o'zgartirildi !");
        },
        onError: (error: AxiosError) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
            console.error("Error updating schedule:", error);
        },
    });
};
