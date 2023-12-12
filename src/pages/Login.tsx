import { baseURL } from "@/api/routes";
import { useGetUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/utils/Icons";
import { ROUTES } from "@/lib/routes";
import { setUser } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import store from "storejs";

const Login = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get("token");
  const googleAuthUrl = baseURL + import.meta.env.VITE_GOOGLE_AUTH_URL;

  if (token) {
    store.set("token", token);
  }

  const { data: user, error } = useGetUser();
  console.log("🐬 ~ Login ~ error:", error);
  console.log("🐬 ~ Login ~ user:", user);

  const googleAuth = () => {
    window.open(googleAuthUrl, "_self");
  };

  useEffect(() => {
    if (user?.email) {
      dispatch(setUser(user));
      navigate(ROUTES.DASHBOARD);
    }
  }, [dispatch, navigate, user]);

  return (
    <div className='flex-1 grid place-content-center'>
      <Button
        variant='outline'
        className='hover:bg-primary/10'
        onClick={googleAuth}
      >
        <Icons.google width={"20px"} height={"20px"} />
        <p className={"pl-2"}>Sign in with google </p>
      </Button>
    </div>
  );
};

export default Login;
