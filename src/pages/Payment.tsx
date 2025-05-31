import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ListFilter, ChevronDown, ChevronUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatedDate } from "../lib/data-options";
import emptyImage from "@/assets/images/users-empty.png";
import { useGetPayments } from "../hooks/admin/get-all-payments";

interface FormData {
  status?: string;
}

const Payment = () => {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const form = useForm<FormData>({
    defaultValues: {
      status: "pending",
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

  const { data: userData, isLoading, error } = useGetPayments({
    status: formValues.status,
  });

  const toggleUserPayments = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  if (isLoading) {
    return <div className="text-center py-10">Yuklanmoqda...</div>;
  }

  if (error || !userData?.data) {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-10 text-center">
        <img src={emptyImage} alt="No Payment" className="w-32 h-32 mb-6 opacity-80" />
        <h2 className="text-lg font-semibold text-gray-700">Ma'lumot topilmadi</h2>
        <p className="text-sm text-gray-500 mt-2">Hozircha to'lov ma'lumotlari mavjud emas.</p>
      </div>
    );
  }

  const filteredUsers = userData.data;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">To'lovlar</h1>
      <div className="mb-6 flex justify-start">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap items-center gap-4"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-[220px]">
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Statusni tanlang" />
                      </SelectTrigger>
                      <SelectContent className="z-[103]">
                        <SelectItem value="pending">Kutilmoqda</SelectItem>
                        <SelectItem value="succeeded">Muvaffaqiyatli</SelectItem>
                        <SelectItem value="failed">Muvaffaqiyatsiz</SelectItem>
                        <SelectItem value="cancelled">Bekor qilingan</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!isAtLeastOneFieldFilled}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ListFilter className="mr-2 h-4 w-4" />
              Filtrlash
            </Button>
          </form>
        </Form>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-10 text-center">
        <img src={emptyImage} alt="No Payment" className="w-32 h-32 mb-6 opacity-80" />
        <h2 className="text-lg font-semibold text-gray-700">Ma'lumot topilmadi</h2>
        <p className="text-sm text-gray-500 mt-2">Hozircha to'lov ma'lumotlari mavjud emas.</p>
      </div>
      ) : (
        <Table className="w-full border-collapse rounded-[15px] overflow-hidden shadow-sm">
          <TableHeader>
            <TableRow className="bg-white border-b border-[#E4E6EE] hover:bg-white">
              <TableHead className="w-[28px] pl-6 text-black py-5">№</TableHead>
              <TableHead className="px-2 text-black py-5">Ism Familya</TableHead>
              <TableHead className="px-2 text-black py-5">Email</TableHead>
              <TableHead className="px-2 text-black py-5">Account number</TableHead>
              <TableHead className="w-[50px] px-2 text-black py-5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, inx) => (
              <>
                <TableRow
                  key={user.id}
                  className="bg-white hover:bg-[#F5F6FA] border-b border-[#E4E6EE] cursor-pointer"
                  onClick={() => toggleUserPayments(user.id)}
                >
                  <TableCell className="pl-6">{inx + 1}</TableCell>
                  <TableCell className="px-2">{user.name}</TableCell>
                  <TableCell className="px-2">{user.email}</TableCell>
                  <TableCell className="px-2">{user.accountNumber}</TableCell>
                  <TableCell className="px-2 text-right">
                    {expandedUserId === user.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                  </TableCell>
                </TableRow>
                {expandedUserId === user.id && (
                  <TableRow className="bg-gray-50">
                    <TableCell colSpan={5} className="p-0">
                      <div className="p-4">
                        {user.payments.length === 0 ? (
                          <p className="text-gray-500 text-sm">To'lovlar mavjud emas</p>
                        ) : (
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow className="bg-gray-200">
                                <TableHead className="px-2 text-gray-800 py-3">To'lov miqdori</TableHead>
                                <TableHead className="px-2 text-gray-800 py-3">Valyuta</TableHead>
                                <TableHead className="px-2 text-gray-800 py-3">Karta turi</TableHead>
                                <TableHead className="px-2 text-gray-800 py-3">To'lov vaqti</TableHead>
                                <TableHead className="px-2 text-gray-800 py-3">Holat</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {user.payments.map((payment, paymentInx) => (
                                <TableRow
                                  key={`${user.id}-${paymentInx}`}
                                  className="border-b border-gray-200"
                                >
                                  <TableCell>{payment.amount.toLocaleString()}</TableCell>
                                  <TableCell>{payment.currency}</TableCell>
                                  <TableCell>{payment.cardType}</TableCell>
                                  <TableCell>{formatedDate(new Date(payment.paidAt))}</TableCell>
                                  <TableCell>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        payment.paymentStatus
                                          ? "bg-green-100 text-green-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {payment.status === "succeeded" ? "Muvaffaqiyatli" : "Muvaffaqiyatsiz"}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Payment;