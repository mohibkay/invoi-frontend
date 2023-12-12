import { ROUTES } from "@/lib/routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "./ui/button";
import { Icons } from "./utils/Icons";
import useLogout from "@/hooks/useLogout";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const handleLogout = useLogout();
  const { credits = 0 } = user.user || {};

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
