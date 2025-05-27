import { usegetProfile } from "@/hooks/admin/get-profile";
import { Copy, Check } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { encrypt } from "@/lib/crypto-js";

const Dashboard = () => {
  const { data } = usegetProfile();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (data?.message && data?.data?.id) {
      const { id } = data.data;
  
      const encryptedId = encrypt(id.toString());
  
      // const newUrl = new URL("http://localhost:3000");
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
  

  // const inviteUrl = data?.data?.id ? `${new URL("http://localhost:3000").origin}?page=subscribe&r=${encrypt(data.data.id.toString())}` : "";
  const inviteUrl = data?.data?.id ? `${new URL("https://jsporttv.com").origin}?page=subscribe&r=${encrypt(data.data.id.toString())}` : "";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-xl shadow-md p-6 bg-white">
        <h1 className="text-lg font-medium text-gray-800 mb-4 text-center">
          Taklif linki
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inviteUrl}
            readOnly
            className="flex-1 p-3 bg-gray-100 border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none"
            placeholder="Taklif linki..."
          />
          <button
            onClick={handleCopy}
            className={`w-11 h-11 flex items-center justify-center rounded-md text-white ${
              isCopied ? "bg-green-500" : "bg-blue-600"
            }`}
            title={isCopied ? "Nusxalandi" : "Nusxalash"}
          >
            {isCopied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Linkni do‘stlaringiz bilan ulashing
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
