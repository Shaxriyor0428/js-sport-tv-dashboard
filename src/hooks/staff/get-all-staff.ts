import request from "@/services";
import { StaffCreateRequest } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface StaffResponse {
    data: StaffCreateRequest[];
}

export interface StaffQueryParams {
    name: "Rahbariyat" | "Sportchilar" | "Murabbiylar" | "Jamoa" ;
}

const getAllStaff = async (params: StaffQueryParams): Promise<StaffResponse> => {
    const res = await request.get<StaffResponse>("/staff", { params });
    return res.data;
};

export const useGetAllStaff = (params: StaffQueryParams) => {
    return useQuery<StaffResponse, Error, StaffResponse>({
        queryKey: ["staff", params],
        queryFn: () => getAllStaff(params),
    });
};
