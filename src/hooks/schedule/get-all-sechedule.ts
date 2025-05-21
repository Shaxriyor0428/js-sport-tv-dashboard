import { useQuery } from "@tanstack/react-query";
import { ScheduleCreateRequest, Params } from "@/types";
import request from "@/services";


interface GetAllScheduleResponse {
  data: ScheduleCreateRequest[];
}

export const useGetAllSchedule = (params?: Params) => {
  return useQuery<GetAllScheduleResponse>({
    queryKey: ["schedule"],
    queryFn: async () => {
      const { data } = await request.get("/schedule", { params });
      return data;
    },
  });
};
