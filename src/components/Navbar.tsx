import store from "storejs";
import { useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/lib/routes";
import { useNavigate, Link } from "react-router-dom";
import { clearUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "./ui/button";
import { Icons } from "./utils/Icons";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const { credits = 0 } = user.user || {};

  const handleLogout = () => {
    store.clear();
    queryClient.clear();
    dispatch(clearUser());
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className='flex justify-between items-baseline border-b shadow-sm px-4 py-2'>
      <Link to={ROUTES.DASHBOARD} className='text-3xl'>
        Invoi
      </Link>

      {user.user && (
        <>
          <p className='text-lg'>Credits: {credits}</p>
          <Button variant='link' onClick={handleLogout}>
            <Icons.logout />
          </Button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
