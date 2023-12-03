import { useGetUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/utils/Icons";
import { ROUTES } from "@/lib/routes";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import store from "storejs";

const Login = () => {
  const { search } = useLocation();

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get("token");
  const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;

  if (token) {
    store.set("token", token);
  }

  const { data: user } = useGetUser();

  const googleAuth = () => {
    window.open(googleAuthUrl, "_self");
  };

  useEffect(() => {
    if (user?.email) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [navigate, user]);

  return (
    <div>
      <Button variant='outline' onClick={googleAuth}>
        <Icons.google width={"20px"} height={"20px"} />
        <p className={"pl-2"}>Sign in with google </p>
      </Button>
    </div>
  );
};

export default Login;
