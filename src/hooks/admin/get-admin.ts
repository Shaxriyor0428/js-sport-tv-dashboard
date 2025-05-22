import { AxiosError } from "axios";
import { AdminCreateRequest } from "@/types";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";

interface IAdminResponse {
    data: AdminCreateRequest[];
}

const getAdmins = async (): Promise<IAdminResponse> => {
    const res = await request.get<IAdminResponse>("/auth/all");
    return res.data;
};

export const useGetAdmins = () => {
    return useQuery<IAdminResponse, AxiosError>({
        queryKey: ["admin"],
        queryFn: getAdmins,
    });
};
