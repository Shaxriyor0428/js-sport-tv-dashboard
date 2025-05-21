import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const Notfound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="flex flex-col items-center gap-4 bg-white shadow-md rounded-xl px-10 py-12">
        <Lock className="w-12 h-12 text-red-600" />
        <h1 className="text-3xl font-bold text-gray-800">403 - Ruxsat yo‘q</h1>
        <p className="text-gray-600 text-center max-w-md">
          Ushbu sahifaga kirishga sizda ruxsat yo‘q. Avval tizimga kiring yoki admin bilan bog‘laning.
        </p>
       <Button
          onClick={() => (window.location.href = "https://vollebol.uz/ru/login")}
          className="mt-4 bg-[#393F5F] text-white hover:opacity-90"
        >
          Tizimga kirish
        </Button>
      </div>
    </div>
  );
};

export default Notfound;
