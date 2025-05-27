import { AxiosError } from "axios";
import { IUserData } from "@/types";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";

interface IUserResponse {
    data: IUserData[];
}

const getUsersBelongsToAdmin = async (): Promise<IUserData[]> => {
    const res = await request.get<IUserResponse>("/auth/users");
    return res.data.data;
};

export const usegetUsersBelongsToAdmin = () => {
    return useQuery<IUserData[], AxiosError>({
        queryKey: ["admin"],
        queryFn: getUsersBelongsToAdmin,
    });
};
