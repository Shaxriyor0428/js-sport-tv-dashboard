import request from "@/services";
import { ClubResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";


const getAllClub = async (): Promise<ClubResponse> => {
    const res = await request.get<ClubResponse>("/club");
    return res.data;
};

export const useGetAllClub = () => {
    return useQuery<ClubResponse, Error, ClubResponse, ["club"]>({
        queryKey: ["club"],
        queryFn: () => getAllClub(),
    });
};
