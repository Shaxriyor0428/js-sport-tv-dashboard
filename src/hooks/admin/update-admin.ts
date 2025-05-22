import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "@/services";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AdminCreateRequest } from "@/types";

const updateAdmin = async (id: string, data: AdminCreateRequest) => {
  const response = await request.patch(`/auth/update/${id}`, data);
  return response.data;
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminCreateRequest }) =>
      updateAdmin(id, data),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success("Admin muvaffaqiyatli o'zgartirildi !");

      if(res?.data?.token ){
        localStorage.setItem("access_token", res?.data?.token);
      }
      
    },
    onError: (error: AxiosError) => {
        const errorMessage = (error.response?.data as { message?: string })?.message || error.message;
        toast.error(`Error: ${errorMessage}`);
        
      console.error("Error updating admin:", error) ;
    },
  });
};
