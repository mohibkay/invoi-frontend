import { ROUTES } from "@/lib/routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import MyAccount from "./MyAccount";
import Pricing from "./Pricing";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const { credits = 0, avatar = "" } = user.user || {};
  const showPricing = credits <= 5;

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
              <span className='text-xs leading-none'>
                {credits === 1 ? "Credit" : "Credits"}
              </span>
            </p>
            {showPricing && <Pricing />}
            <MyAccount avatar={avatar} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
