import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import { Region } from "@/types";

interface RegionResponse {
  data: Region[];
}

export const useGetAllRegions = () => {
  return useQuery<RegionResponse>({
    queryKey: ["regions"],
    queryFn: async () => {
      const { data } = await request.get<RegionResponse>("/regions");
      return data;
    },
  });
};
