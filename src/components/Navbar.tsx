import { ROUTES } from "@/lib/routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import MyAccount from "./MyAccount";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const { credits = 0, avatar = "" } = user.user || {};

  const handlePayment = () => {
    navigate(ROUTES.CHECKOUT);
  };

  return (
    <nav className='border-b shadow-sm px-4 py-2'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Link to={ROUTES.DASHBOARD} className='text-3xl'>
          Invoi
        </Link>

        {user.user && (
          <div className='flex space-x-6'>
            <p className='flex flex-col'>
              <span className='text-xl font-medium -mb-0.5'>{credits}</span>
              <span className='text-xs leading-none'>Credits</span>
            </p>
            <Button onClick={handlePayment}>Upgrade to Pro</Button>
            <MyAccount avatar={avatar} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
