import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/lib/routes";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
  const { user } = useUser();
  const { pathname } = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to={ROUTES.LOGIN} replace state={{ path: pathname }} />
  );
};

export default RequireAuth;
