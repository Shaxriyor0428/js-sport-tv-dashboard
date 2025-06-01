import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatedDate } from "../lib/data-options";
import emptyImage from "@/assets/images/users-empty.png";
import { useGetPayments } from "../hooks/admin/get-all-payments";
import getStatusStyles from "@/lib/get-status";

interface FormData {
  status?: string;
  paymentType?: string;
}

const Payment = () => {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const form = useForm<FormData>({
    defaultValues: {
      status: "",
      paymentType: "",
    },
  });
  const formValues = useWatch({ control: form.control });

  const onSubmit = async (data: FormData) => {
    console.log("Filter ma'lumotlari:", data);
  };

  const { data: userData, isLoading, error } = useGetPayments({
    status: formValues.status,
    paymentType: formValues.paymentType,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between transform transition-all duration-300 hover:scale-[1.02]">
            <div>
              <p className="text-sm text-gray-500">Jami USD</p>
              <p className="text-2xl font-semibold text-blue-600">
                {userData.totalUSD?.toLocaleString("en-US") || "0 USD"}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center justify-between transform transition-all duration-300 hover:scale-[1.02]">
            <div>
              <p className="text-sm text-gray-500">Jami UZS</p>
              <p className="text-2xl font-semibold text-green-600">
                {userData.totalUZS?.toLocaleString("uz-UZ") || "0 UZS"}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
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
                      <Select
                        onValueChange={(value) => (value === "none" ? field.onChange("") : field.onChange(value))}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Statusni tanlang" />
                        </SelectTrigger>
                        <SelectContent className="z-[103]">
                          <SelectItem value="none">Default holati</SelectItem>
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
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem className="w-[220px]">
                  <FormControl>
                  <Select
                        onValueChange={(value) => (value === "none" ? field.onChange("") : field.onChange(value))}
                        defaultValue={field.value}
                      >
                      <SelectTrigger>
                        <SelectValue placeholder="To'lov turini tanlang" />
                      </SelectTrigger>
                      <SelectContent className="z-[103]">
                        <SelectItem value="none">Default holati</SelectItem> 
                        <SelectItem value="oneSubs">Bir martalik</SelectItem> 
                        <SelectItem value="month">Oylik</SelectItem>
                        <SelectItem value="year">Yillik</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}  
            />
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
                                <TableHead className="px-2 text-gray-800 py-3">O'tgan summa</TableHead>
                                <TableHead className="px-2 text-gray-800 py-3">To'lov vaqti</TableHead>
                                <TableHead className="px-2 text-gray-800 py-3">Obuna holati</TableHead>
                                <TableHead className="px-2 text-gray-800 py-3">Holati</TableHead>
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
                                  <TableCell>{payment.cardType ? payment.cardType : "-"}</TableCell>
                                  <TableCell>{payment.transferSum ? payment.transferSum : "-"}</TableCell>
                                  <TableCell>{formatedDate(new Date(payment.paidAt))}</TableCell>
                                  <TableCell>{payment.paymentType === "oneSubs" ? "Bir martalik" : payment.paymentType === "month" ? "Oylik" : payment.paymentType === "year" ? "Yillik" : "Boshqasi"}</TableCell>
                                   <TableCell>
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(payment.status).className}`}
                                    >
                                      {getStatusStyles(payment.status).label}
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