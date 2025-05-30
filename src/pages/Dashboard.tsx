  import { useState, useEffect } from "react";
  import { Copy, Check } from "lucide-react";
  import { toast } from "react-toastify";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useGetAdmins } from "@/hooks/admin/get-admin";
  import { encrypt } from "@/lib/crypto-js";
  import useStore from "@/context/store"; // Role ni olish uchun
  import emptyImage from "@/assets/images/users-empty.png";
  import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
  import { Button } from "@/components/ui/button";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { usegetProfile } from "../hooks/admin/get-profile";

  interface FormData {
    adminId: string;
  }

  const formSchema = z.object({
    adminId: z.string().min(1, "Admin tanlash majburiy"),
  });

  const Dashboard = () => {
    const { data: profileData } = usegetProfile();
    const { data: adminData } = useGetAdmins();
    const { role } = useStore(); // Role ni olish
    const [isCopied, setIsCopied] = useState(false);

    const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        adminId: "",
      },
      mode: "onChange",
    });

    // Default holatda joriy profileni ID sini o'rnatish
    useEffect(() => {
      if (profileData?.data?.id) {
        form.setValue("adminId", profileData.data.id, { shouldValidate: true });
      }
    }, [profileData, form]);

    const handleCopy = (adminId: string) => {
      if (!adminId) {
        toast.error("Admin tanlanmagan", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const encryptedId = encrypt(adminId);
      const newUrl = new URL("https://jsporttv.com");
      newUrl.searchParams.append("page", "subscribe");
      newUrl.searchParams.append("r", encryptedId);

      navigator.clipboard
        .writeText(newUrl.toString())
        .then(() => {
          setIsCopied(true);
          toast.success(`URL nusxalandi: ${newUrl.toString().toLowerCase()}`, {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          toast.error("Nusxalashda xatolik yuz berdi: " + err.message, {
            position: "top-right",
            autoClose: 3000,
          });
        });
    };

    // Adminlar ro'yxatini role ga qarab filtrlaymiz
    const filteredAdmins =
      role === "admin"
        ? adminData?.data.filter((admin) => admin.id === profileData?.data?.id) || []
        : adminData?.data || [];

    // Foydalanuvchi mavjud bo'lmasa
    if (adminData?.data?.length === 0) {
      return (
        <div className="min-h-[300px] flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-10 text-center">
          <img src={emptyImage} alt="No users" className="w-32 h-32 mb-6 opacity-80" />
          <h2 className="text-xl font-semibold text-gray-800">Foydalanuvchi topilmadi</h2>
          <p className="text-sm text-gray-500 mt-2">
            Hozircha hech qanday foydalanuvchi ro‘yxatdan o‘tmagan.
          </p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Taklif linkini yaratish
            </h1>
            <Form {...form}>
              <form>
                {role !== "admin" ? (
                  <FormField
                    control={form.control}
                    name="adminId"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-sm font-medium text-gray-700">Admin tanlash</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCopy(value); // Tanlangan admin uchun linkni avtomatik nusxalash
                            }}
                          >
                            <SelectTrigger className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg">
                              <SelectValue placeholder="Admin tanlang" />
                            </SelectTrigger>
                            <SelectContent className="z-[103]">
                              {filteredAdmins.map((admin) => (
                                <SelectItem key={admin.id as string} value={admin.id as string}>
                                  {admin.username}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="adminId"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="text-sm font-medium text-gray-700">Sizning taklif linkingiz</FormLabel>
                        <FormControl>
                          <input
                            type="text"
                            value={profileData?.data?.username || ""}
                            readOnly
                            className="w-full p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
                            placeholder="Sizning ismingiz"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </form>
            </Form>
            <div className="flex items-center gap-3 mt-4">
              <input
                type="text"
                value={
                  form.getValues("adminId")
                    ? `${new URL("https://jsporttv.com").origin}?page=subscribe&r=${encrypt(form.getValues("adminId"))}`
                    : ""
                }
                readOnly
                className="flex-1 p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
                placeholder="Taklif linki..."
              />
              <Button
                onClick={() => handleCopy(form.getValues("adminId") || "")}
                className={`w-12 h-12 flex items-center justify-center rounded-lg text-white ${
                  isCopied ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
                title={isCopied ? "Nusxalandi" : "Nusxalash"}
              >
                {isCopied ? <Check size={20} /> : <Copy size={20} />}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Taklif linkini do‘stlaringiz bilan ulashing
            </p>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;