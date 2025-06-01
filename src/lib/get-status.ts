const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return { className: "bg-yellow-100 text-yellow-800", label: "Kutilmoqda" };
      case "succeeded":
        return { className: "bg-green-100 text-green-800", label: "Muvaffaqiyatli" };
      case "failed":
        return { className: "bg-red-100 text-red-800", label: "Muvaffaqiyatsiz" };
      case "cancelled":
        return { className: "bg-gray-100 text-gray-800", label: "Bekor qilingan" };
      default:
        return { className: "bg-gray-100 text-gray-800", label: status };
    }
  };

export default getStatusStyles