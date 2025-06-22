import { Copy, Check } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { encrypt } from "@/lib/crypto-js";
import { useGetFree } from "../hooks/free/free.get";
import { Button } from "../components/ui/button";
import ConfirmModal from "../components/modal/ConfirmModal";
import { useUpdateFree } from "../hooks/free/free.update";
import { usegetProfile } from "../hooks/admin/get-profile";
import { useConfirmModal } from "../components/modal/useConfirmMOdal";

const Dashboard = () => {
  const { data } = usegetProfile();
  const [isCopied, setIsCopied] = useState(false);
  const { data: freeData } = useGetFree();
  const { mutate: updateFree } = useUpdateFree();
  const { isOpen: isConfirmOpen, message, openModal, closeModal, onConfirm } = useConfirmModal();

  const handleUpdate = (id: string) => {
    openModal(
      `Ishonchingiz komilmi, rostdan ham ${
        freeData?.free ? "pullik tarifga o'tmoqchimisiz?" : "bepul tarifga o'tmoqchimisiz?"
      }`,
      () => {
        updateFree({ id, free: !freeData?.free });
      }
    );
  };

  const handleCopy = () => {
    if (data?.data?.id) {
      const { id } = data.data;
      const encryptedId = encrypt(id.toString());
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
    } else {
      toast.error("Ma'lumotlar mavjud emas", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const inviteUrl = data?.data?.id
    ? `${new URL("https://jsporttv.com").origin}?page=subscribe&r=${encrypt(
        data.data.id.toString()
      )}`
    : "";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Button Section */}
      <div className="mb-8 flex justify-center">
        <Button
          onClick={() => handleUpdate(freeData?.id as string)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 h-[44px] flex items-center gap-2"
        >
          <span>Bepul tomosha qilish</span>
          <span className="font-bold">
            {freeData?.free ? "Bepul" : "Pullik"}
          </span>
        </Button>
      </div>

      {/* Invite Link Section */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Taklif linki
          </h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inviteUrl}
              readOnly
              className="flex-1 p-3 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Taklif linki..."
            />
            <button
              onClick={handleCopy}
              className={`w-12 h-12 flex items-center justify-center rounded-lg text-white shadow-md transition-all duration-200 ${
                isCopied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              title={isCopied ? "Nusxalandi" : "Nusxalash"}
            >
              {isCopied ? <Check size={22} /> : <Copy size={22} />}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Linkni do‘stlaringiz bilan ulashing
          </p>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        message={message}
        onConfirm={onConfirm}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Dashboard;