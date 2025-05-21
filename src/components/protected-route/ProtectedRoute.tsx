// components/protected-route/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import useStore from "@/context/store";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem("access_token");
  const { auth } = useStore();

  if (!token || !auth) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
