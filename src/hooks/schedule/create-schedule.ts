import request from "@/services";
import { ScheduleCreateRequest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const createSchedule = async (data: ScheduleCreateRequest): Promise<ScheduleCreateRequest> => {
    const res = await request.post<ScheduleCreateRequest>("/schedule", data);
    return res.data;
};

export const useCreateSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation<ScheduleCreateRequest, AxiosError, ScheduleCreateRequest>({
        mutationFn: createSchedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedule"] });
            toast.success("Jadval muvaffaqiyatli qo'shildi !");
        },
        onError: (error) => {
            const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
            toast.error(`Error: ${errorMessage}`);
        },
    });
};
