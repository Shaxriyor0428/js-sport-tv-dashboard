import request from "@/services";
import { IGalleryData, Params } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface GetAllGalleryResponse {
    data: IGalleryData[];
}

const getAllGallery = async (params: Params): Promise<GetAllGalleryResponse> => {
    const res = await request.get<GetAllGalleryResponse>("/media", { params });
    return res.data;
};

export const useGetAllGallery = (params?: Params) => {
    const query = useQuery<GetAllGalleryResponse, AxiosError>({
        queryKey: ["gallery"],
        queryFn: () => getAllGallery(params || {}),
    });
    
    useEffect(() => {
        if (query.error) {
            const errorMessage = (query.error.response?.data as { message?: string })?.message || query.error.message;
            toast.error(`Error: ${errorMessage}`);
        }
    }, [query.error]);
    
    return query;
};

