import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminProps } from "@/types";
import request from "@/services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const updateAdmin = async (id: number, data: AdminProps) => {
  const response = await request.patch(`/admin/${id}`, data);
  return response.data;
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AdminProps }) =>
      updateAdmin(id, data),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Admin muvaffaqiyatli o'zgartirildi !");
      localStorage.setItem("access_token", res?.token);
    },
    onError: (error: AxiosError) => {
        const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
        toast.error(`Error: ${errorMessage}`);
        
      console.error("Error updating admin:", error) ;
    },
  });
};
