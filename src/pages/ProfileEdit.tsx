import { useRef } from "react";
import profile from "../assets/images/profile.png";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  firstname?: string;
  lastname?: string;
  middlename?: string;
  phone?: string;
  email?: string;
  accommodation_type: string;
  name: string;
  prepayment: string;
  address: string;
  phone1: string;
  email1: string;
  inn: string;
  kpp: string;
  bank: string;
  bik: string;
  account: string;
  nommer: string;
  supervisor: string;
  accountant: string
}

const ProfileEdit = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<FormData>();
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log("Tanlangan fayl:", event.target.files[0].name);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-white col-span-1 p-6 pb-12 rounded-[20px]">
          <div className="flex w-[99px] h-[99px] mx-auto rounded-full justify-center items-center mb-6">
            <img
              className="w-full h-full object-cover"
              src={profile}
              alt="Profile Image"
            />
          </div>
          <div className="flex flex-col items-center mb-9">
            <button
              onClick={handleButtonClick}
              className="px-10 bg-[#1D6CFA] rounded-xl text-white h-[40px] flex justify-center items-center"
            >
              Редактировать фото
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <h3 className="mb-4 font-semibold text-xl">
            Персональная информация
          </h3>
          <div className="grid grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative w-full flex flex-col">
                      <Label
                        htmlFor="firstname"
                        className="text-textColor font-medium text-sm pb-1"
                      >
                        Ваше имя*
                      </Label>
                      <Input
                        className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                        type="text"
                        id="firstname"
                        placeholder="Введите"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative w-full flex flex-col">
                      <Label
                        htmlFor="lastname"
                        className="text-textColor font-medium text-sm pb-1"
                      >
                        Фамилия
                      </Label>
                      <Input
                        className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                        type="text"
                        id="lastname"
                        placeholder="Введите"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middlename"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative w-full flex flex-col">
                      <Label
                        htmlFor="middlename"
                        className="text-textColor font-medium text-sm pb-1"
                      >
                        Отчество
                      </Label>
                      <Input
                        className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                        type="text"
                        id="middlename"
                        placeholder="Введите"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative w-full flex flex-col">
                      <Label
                        htmlFor="phone"
                        className="text-textColor font-medium text-sm pb-1"
                      >
                        Ваш телефон*
                      </Label>
                      <Input
                        className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                        type="text"
                        id="phone"
                        placeholder="Введите"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative w-full flex flex-col">
                      <Label
                        htmlFor="email"
                        className="text-textColor font-medium text-sm pb-1"
                      >
                        E-mail
                      </Label>
                      <Input
                        className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                        type="text"
                        id="email"
                        placeholder="Введите"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <button
              className="justify-self-start bg-[#F8F9FC] px-5 rounded-[10px] h-[40px] flex justify-center items-center font-semibold text-sm text-textColor"
              type="submit"
            >
              Редактировать пароль
            </button>
          </div>
        </div>
        <div className="bg-white col-span-2 p-6 pb-12 rounded-[20px] grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[19px]">Отель</h2>
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="accommodation_type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="accommodation_type"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Тип объекта размещения
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="accommodation_type"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="name"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Наименование
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="name"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prepayment"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="prepayment"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Предоплата
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="prepayment"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="address"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Адрес
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="address"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="phone1"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Телефон
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="phone1"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email1"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="email1"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            E-mail
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="email"
                            id="email1"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

              </div>
            </div>
            <div>
              <h2 className="text-[19px]">Реквизиты объекта размещения</h2>
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="inn"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="inn"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            ИНН
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="inn"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kpp"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="kpp"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            КПП
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="kpp"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-[19px]">Платежные реквизиты</h2>
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="bank"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Банк
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="bank"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bik"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="bik"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            БИК
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="bik"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="account"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Корреспондентский счет
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="account"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nommer"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="nommer"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Номер счета
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="nommer"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

              </div>
            </div>
            <div>
              <h2 className="text-[19px]">Ответственные лица</h2>
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="supervisor"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="supervisor"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Руководитель
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="supervisor"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountant"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <div className="relative w-full flex flex-col">
                          <Label
                            htmlFor="accountant"
                            className="text-textColor font-medium text-sm pb-1"
                          >
                            Бухгалтер
                          </Label>
                          <Input
                            className="border-[#E9ECEE] bg-white px-[12px] py-[8px]"
                            type="text"
                            id="accountant"
                            placeholder="Введите"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEdit;
