import { Copy, Check } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { encrypt } from "@/lib/crypto-js";
import { usegetProfile } from "../hooks/admin/get-profile";

const Dashboard = () => {
  const { data } = usegetProfile();
  const [isCopied, setIsCopied] = useState(false);

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
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
     
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
    </div>
  );
};

export default Dashboard;