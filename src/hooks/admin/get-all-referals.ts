import { AxiosError } from "axios";
import { IUserData } from "@/types";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";

interface IUserResponse {
    data: IUserData[];
    totalCount: number;
}

interface IQuery {
    adminId?: string;
    all?:boolean;
}

const getReferalUsers = async (query: IQuery): Promise<IUserResponse> => {
    const res = await request.get<IUserResponse>("/auth/referals", {
        params: query
    });
    return res.data;
};  

export const useGetReferalUsers = (query: IQuery) => {
    return useQuery<IUserResponse, AxiosError>({
        queryKey: ["referals", query],
        queryFn: () => getReferalUsers(query),
    });
};
