import { Loader, Clock, Construction } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <div className="animate-bounce mb-4">
        <Construction size={64} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Dashboard hali ishga tushmagan</h1>
      <p className="text-lg text-gray-600 max-w-md">
        Ushbu sahifa hozircha tayyor emas. Tez orada bu yerda statistika, foydalanuvchi tahlillari, boshqaruv paneli va boshqa muhim ma'lumotlar joylashadi.
      </p>
      <div className="flex items-center gap-2 mt-6 text-blue-500">
        <Clock size={20} />
        <span className="text-base">Iltimos, biroz kuting...</span>
        <Loader size={20} className="animate-spin" />
      </div>
    </div>
  );
};

export default Dashboard;
