import { AxiosError } from "axios";
import { IUserData } from "@/types";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";

interface IUserResponse {
    data: IUserData[];
    message: string;
    totalUSD: number;
    totalUZS: number;
}

interface Query {
    status?: string;
    paymentType?: string;
}

const getPayments = async (query?: Query): Promise<IUserResponse> => {
    const res = await request.get<IUserResponse>("/auth/users/all", {
        params: query,
    });
    return res.data;
};

export const useGetPayments = (query?: Query) => {
    return useQuery<IUserResponse, AxiosError>({
        queryKey: ["payments", query], 
        queryFn: () => getPayments(query),
    });
};
