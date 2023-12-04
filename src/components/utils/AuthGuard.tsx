import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/lib/routes";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { user } = useUser();

  return user ? <Navigate to={ROUTES.DASHBOARD} replace /> : children;
};

export default AuthGuard;
