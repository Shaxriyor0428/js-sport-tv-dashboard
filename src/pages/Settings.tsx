import React from "react";
import profile from "../assets/images/profile.png";
import EditIcon from "@/assets/icons/EditIcon";
const Settings: React.FC = () => {
  return (
    <div>
      <h2>Настройки профиля</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white col-span-1 p-6 rounded-[20px]">
          <div className="flex rounded-full justify-center items-center mb-4">
            <img src={profile} alt="Profile Image" />
          </div>
          <h4 className="text-center text-lg font-medium mb-4">Менеджер</h4>
          <h3 className="mb-4 font-semibold text-xl">
            Персональная информация
          </h3>
          <div>
            <div className="flex justify-between items-center text-base font-medium border-b border-[#E9ECEE] py-3.5">
              <p>ФИО:</p>
              <p>Akmalov Komil Alisherovich</p>
            </div>
            <div className="flex justify-between items-center text-base font-medium border-b border-[#E9ECEE] py-3.5">
              <p>Номер телефона:</p>
              <p>+998(99) 999 99 99</p>
            </div>
            <div className="flex justify-between items-center text-base font-medium py-3.5">
              <p>Email:</p>
              <p>akmalov@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="bg-white col-span-2 p-6 rounded-[20px] grid grid-cols-2 gap-2 relative">
          <button className="absolute right-4 top-4 w-[45px] h-[45px] bg-[#F8F9FC] rounded-[8px] flex justify-center items-center">
            <EditIcon />
          </button>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-xl mb-4">Отель</h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Тип объекта размещения:</h4>
                  <p className="font-normal">Отель 4 звезды</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Наименование:</h4>
                  <p className="font-normal">Гранд Отель</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Предоплата:</h4>
                  <p className="font-normal">Гранд Отель</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Адрес:</h4>
                  <p className="font-normal">Москва, ул. Тверская, 12</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Телефон:</h4>
                  <p className="font-normal">+7 (495) 987-65-43</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">E-mail:</h4>
                  <p className="font-normal">info@grandhotel.ru</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4">
                Реквизиты объекта размещения
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">ИНН:</h4>
                  <p className="font-normal">1234567890</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">КПП:</h4>
                  <p className="font-normal">0987654321</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-semibold text-xl mb-4">
                Платежные реквизиты
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Банк:</h4>
                  <p className="font-normal">Сбербанк</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">БИК:</h4>
                  <p className="font-normal">044525225</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Корреспондентский счет:</h4>
                  <p className="font-normal">30101810400000000225</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Номер счета:</h4>
                  <p className="font-normal">40702810900000012345</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4">
                Ответственные лица:
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Руководитель:</h4>
                  <p className="font-normal">Иван Петров</p>
                </div>
                <div className="flex gap-2.5 items-center text-sm">
                  <h4 className="font-semibold">Бухгалтер:</h4>
                  <p className="font-normal">Мария Сидорова</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
