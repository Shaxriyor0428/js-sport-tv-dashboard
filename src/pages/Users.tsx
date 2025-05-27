import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilter  } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usegetUsersBelongsToAdmin } from "@/hooks/admin/get-users-belongsto-admin";
import { formatedDate } from "../lib/data-options"
import emptyImage from "@/assets/images/users-empty.png"

interface FormData {                
  name?: string;
  date?: string;
}

const Users = () => {
  const form = useForm<FormData>();
  const formValues = useWatch({ control: form.control });
  
  const isAtLeastOneFieldFilled = Object.values(formValues).some((value) => {
    if (typeof value === "string") {
      return value.trim() !== "";
    }
    return false;
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form ma'lumotlari:", data);
  };
  const { data: usersData } = usegetUsersBelongsToAdmin() || [];

  if (usersData?.length === 0) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-10 text-center">
        <img
          src={emptyImage}
          alt="No users"
          className="w-32 h-32 mb-6 opacity-80"
        />
        <h2 className="text-lg font-semibold text-gray-700">Foydalanuvchi topilmadi</h2>
        <p className="text-sm text-gray-500 mt-2">
          Hozircha sizning referalingiz orqali hech qanday foydalanuvchi ro‘yxatdan o‘tmagan.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Foydalanuvchilar</h1>
      <div className="mb-6 flex justify-end">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap items-center gap-4"
        >

          {/* Fullname */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[220px]">
                <FormControl>
                  <Input placeholder="Search for name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-[220px]">
                <FormControl>       
                  <Input placeholder="12.03.2025" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          

          {/* Yuborish tugmasi */}
          <Button type="submit" disabled={!isAtLeastOneFieldFilled}>
            <ListFilter className="mr-2" />
            Filter
          </Button>
        </form>
      </Form>
       
      </div>

    <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
    <TableHeader>
    <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
        <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
        <TableHead className="px-2 text-black py-5">Ism Familya</TableHead>
        <TableHead className="px-2 text-black py-5">Email</TableHead>
        <TableHead className="px-2 text-black py-5">Account raqami</TableHead>
        <TableHead className="px-2 text-black py-5">Payment vaqti</TableHead>
    </TableRow>
    </TableHeader>

    <TableBody>
        {usersData?.map((item, inx) => (
        <TableRow
            key={item.id}
            className="bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE]"
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
    </div>
  );
};

export default Users;
