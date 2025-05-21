import request from "@/services";
import { INewsData, NewsResponse, Params } from "@/types";
import { useQuery } from "@tanstack/react-query";


const getAllNews = async (params: Params): Promise<INewsData[]> => {
    const res = await request.get<NewsResponse>("/news", { params });
    return res.data.data;
};

export const useGetAllNews = (params?: Params) => {
    return useQuery<INewsData[], Error>({
        queryKey: ["news"],
        queryFn: () => getAllNews(params || {}),
    });
};
