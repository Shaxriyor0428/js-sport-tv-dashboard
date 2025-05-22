import request from "@/services";
import { IGameData, IGameResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getGames = async (): Promise<IGameData[]> => {
  const res = await request.get<IGameResponse>("/game/all");
  return res.data.data;
};

export const usegetGames = () => {
  return useQuery<IGameData[], Error>({
    queryKey: ["game"],
    queryFn: getGames,
  });
};
