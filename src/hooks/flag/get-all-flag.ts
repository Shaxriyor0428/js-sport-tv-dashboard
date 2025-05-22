import request from "@/services";
import { IFlagData, IFlagResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getFlags = async (): Promise<IFlagData[]> => {
  const res = await request.get<IFlagResponse>("/flag/all");
  return res.data.data;
};

export const useGetFlags = () => {
  return useQuery<IFlagData[], Error>({
    queryKey: ["flag"],
    queryFn: getFlags,
  });
};
