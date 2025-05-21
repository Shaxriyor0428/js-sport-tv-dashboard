import { AxiosError } from "axios";
import { IRatingData } from "@/types";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";   

interface IRatingResponse {
    data: IRatingData[];
}

const getRatings = async (): Promise<IRatingResponse> => {
    const res = await request.get<IRatingResponse>("/ratings");
    return res.data;
};

export const useGetRatings = () => {
    return useQuery<IRatingResponse, AxiosError>({
        queryKey: ["rating"],
        queryFn: getRatings,
    });
};
