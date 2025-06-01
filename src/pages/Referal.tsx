import { AxiosError } from "axios";
import { IUserData } from "@/types";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ListFilter, Share2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select";
import { formatedDate } from "../lib/data-options";
import emptyImage from "@/assets/images/users-empty.png";
import { useGetAdmins } from "@/hooks/admin/get-admin";

interface IUserResponse {
  data: IUserData[];
  totalCount: number;
}

interface IQuery {
  adminId?: string;
}

const getReferalUsers = async (query: IQuery): Promise<IUserResponse> => {
  const res = await request.get<IUserResponse>("/auth/referals", {
    params: query.adminId ? { adminId: query.adminId } : {},
  });
  return res.data;
};

export const useGetReferalUsers = (query: IQuery) => {
  return useQuery<IUserResponse, AxiosError>({
    queryKey: ["referals", query.adminId || "no-admin"],
    queryFn: () => getReferalUsers(query),
  });
};
        
interface FormData {
  adminId?: string;
}

const ReferalUsers = () => {
  const form = useForm<FormData>({
    defaultValues: {
      adminId: "",
    },
  });
  const formValues = useWatch({ control: form.control });

  const isAtLeastOneFieldFilled = Object.values(formValues).some((value) => {
    if (typeof value === "string") {
      return value.trim() !== "";
    }
    return false;
  });

  const onSubmit = async (data: FormData) => {
    console.log("Filter ma'lumotlari:", data);
  };

  const { data: usersData, isLoading, error } = useGetReferalUsers({
    adminId: formValues.adminId,
  });
  const admins = useGetAdmins().data?.data ?? [];

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-600">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mx-auto"></div>
        <p className="mt-2">Yuklanmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-10 text-center transform transition-all duration-300">
        <img src={emptyImage} alt="No users" className="w-32 h-32 mb-6 opacity-80" />
        <h2 className="text-lg font-semibold text-gray-700">Xato yuz berdi</h2>
        <p className="text-sm text-gray-500 mt-2">
          Ma'lumotlarni yuklashda xato yuz berdi. Iltimos, qaytadan urinib ko'ring.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Share2 className="w-6 h-6 text-blue-600" />
          Referral Foydalanuvchilar
        </h1>

        {/* Total Count va Filter qismi */}
        <div className="mb-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-wrap items-center gap-4 bg-white p-6 rounded-2xl shadow-md"
            >
              <div className="flex items-center gap-4 flex-wrap">
                <FormField
                  control={form.control}
                  name="adminId"
                  render={({ field }) => (
                    <FormItem className="w-[220px]">
                      <FormControl>
                        <Select
                          onValueChange={(value) => (value === "none" ? field.onChange("") : field.onChange(value))}
                          value={field.value || "none"}
                        >
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Adminni tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Barcha adminlar</SelectItem>
                            {admins.map((admin) => (
                              <SelectItem key={admin.id} value={admin.id as string}>
                                {admin.fullName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-2">
                  <span className="font-semibold">Jami foydalanuvchilar:</span>
                  <span className="text-lg font-bold">{usersData?.totalCount || 0}</span>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!isAtLeastOneFieldFilled}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ListFilter className="w-4 h-4 mr-2" />
                Filtrlash
              </Button>
            </form>
          </Form>
        </div>

        {!usersData?.data || usersData.data.length === 0 ? (
          <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-2xl shadow-md p-10 text-center transform transition-all duration-300">
            <img src={emptyImage} alt="No users" className="w-32 h-32 mb-6 opacity-80" />
            <h2 className="text-lg font-semibold text-gray-700">Foydalanuvchi topilmadi</h2>
            <p className="text-sm text-gray-500 mt-2">
              Hozircha {formValues.adminId ? "tanlangan admin orqali" : "hech qanday"} referral foydalanuvchi ro‘yxatdan o‘tmagan.
            </p>
          </div>
        ) : (
          <Table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
                <TableHead className="w-[28px] pl-6 text-gray-800 py-5">№</TableHead>
                <TableHead className="px-2 text-gray-800 py-5">Ism Familya</TableHead>
                <TableHead className="px-2 text-gray-800 py-5">Email</TableHead>
                <TableHead className="px-2 text-gray-800 py-5">Account raqami</TableHead>
                <TableHead className="px-2 text-gray-800 py-5">To'lov muddati</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.data.map((item, inx) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 border-b border-gray-200 transition-all duration-200"
                >
                  <TableCell className="pl-6">{inx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.accountNumber}</TableCell>
                  <TableCell>{formatedDate(new Date(item.paymentExpire))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ReferalUsers;