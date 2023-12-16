import { ROUTES } from "@/lib/routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import MyAccount from "./MyAccount";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const { credits = 0, avatar = "" } = user.user || {};

  return (
    <nav className='flex justify-between items-center border-b shadow-sm px-4 py-2'>
      <Link to={ROUTES.DASHBOARD} className='text-3xl'>
        Invoi
      </Link>

      {user.user && (
        <>
          <p className='text-lg mt-2'>Credits: {credits}</p>
          <MyAccount avatar={avatar} />
        </>
      )}
    </nav>
  );
};

export default Navbar;
