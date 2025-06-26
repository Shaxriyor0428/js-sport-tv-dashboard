import { Loader2 } from "lucide-react";

const Spinner = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-8">
            <Loader2
                className="w-10 h-10 text-blue-600 animate-spin"
            />
            <span className="text-lg font-medium text-gray-700 animate-pulse">
                Yuklanmoqda...
            </span>
        </div>
    );
};

export default Spinner;