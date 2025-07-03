import { AxiosError } from "axios";
import { IUserData } from "@/types";
import request from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import emptyImage from "@/assets/images/users-empty.png";

interface IUserResponse {
  data: IUserData[];
  totalCountUsers: number;
}

const getUsers = async (): Promise<IUserResponse> => {
  const res = await request.get<IUserResponse>("/auth/referals", {
    params: { all: true },
  });
  return res.data;  
};

export const useGetUsers = () => {
  return useQuery<IUserResponse, AxiosError>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};


const Users = () => {
  const { data: usersData, isLoading, error } = useGetUsers();

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
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-10 text-center">
        <img src={emptyImage} alt="No users" className="w-32 h-32 mb-6 opacity-80" />
        <h2 className="text-lg font-semibold text-gray-700">Xato yuz berdi</h2>
        <p className="text-sm text-gray-500 mt-2">
          Ma'lumotlarni yuklashda xato yuz berdi. Iltimos, qaytadan urinib ko'ring.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 gap-2">
        Foydalanuvchilar
      </h1>
      <div className="mb-6 flex justify-start">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="font-semibold">Jami ro'yxatdan o'tgan foydalanuvchilar:</span>
              <span className="text-lg font-bold">{usersData?.totalCountUsers || 0}</span>
            </div>
      </div>

      {!usersData?.data || usersData.data.length === 0 ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-10 text-center">
          <img src={emptyImage} alt="No users" className="w-32 h-32 mb-6 opacity-80" />
          <h2 className="text-lg font-semibold text-gray-700">Foydalanuvchi topilmadi</h2>
          <p className="text-sm text-gray-500 mt-2">
            Hozircha barcha foydalanuvchilar ro‘yxatdan o‘tmagan.
          </p>
        </div>
      ) : (
        <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
          <TableHeader>
            <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
              <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
              <TableHead className="px-2 text-black py-5">Ism Familya</TableHead>
              <TableHead className="px-2 text-black py-5">Email</TableHead>
              <TableHead className="px-2 text-black py-5">Telefon raqami</TableHead>
              <TableHead className="px-2 text-black py-5">Account raqami</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.data.map((item, inx) => (
              <TableRow
                key={item.id}
                className="bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE]"
              >
                <TableCell className="pl-6">{inx + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email ? item.email : '-'}</TableCell>
                <TableCell>{item.phone ? item.phone : '-'}</TableCell>
                <TableCell>{item.accountNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Users;