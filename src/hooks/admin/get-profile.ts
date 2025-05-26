import { AxiosError } from "axios";
import { IAdminData } from "@/types";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";
interface IAdminResponse {
    data: IAdminData;
    message: string
}

const getProfile = async (): Promise<IAdminResponse> => {
    const res = await request.get<IAdminResponse>("/auth/profile");
    return res.data;
};

export const usegetProfile = () => {
    return useQuery<IAdminResponse, AxiosError>({
        queryKey: [],
        queryFn: getProfile,
    });
};
