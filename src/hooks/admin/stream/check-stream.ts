import { AxiosError } from "axios";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";

interface ICheckStramResponse {
    stream: string;
}

const checkStream = async () => {
    const res = await request.get<ICheckStramResponse>("/stream/check");
    return res.data;
};

export const useGetCheckStream = () => {
    return useQuery<ICheckStramResponse, AxiosError>({
        queryKey: ["stream"],
        queryFn: checkStream,
    });
};
