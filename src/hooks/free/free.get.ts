import request from "@/services";
import { useQuery } from "@tanstack/react-query";

interface FreeData {
    id: string;
    free: boolean;
    createdAt: string;
    updatedAt: string;
}

const getFree = async (): Promise<FreeData> => {
    const res = await request.get("/free");
    return res.data.data;
};

export const useGetFree = () => {
    return useQuery<FreeData>({
        queryKey: ["free"],
        queryFn: getFree,
    });
};
