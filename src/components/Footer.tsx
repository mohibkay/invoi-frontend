import { ROUTES } from "@/lib/routes";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='border w-full shadow-sm px-4 py-2'>
      <ul className='flex space-x-4 justify-center'>
        <li>
          <Link to={ROUTES.SUPPORT}>Support</Link>
        </li>
        <li>
          <Link to={ROUTES.TERMS}>Terms of Service</Link>
        </li>
        <li>
          <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>
        </li>
        <li>
          <Link to={ROUTES.CANCELLATION}>Cancellation & Refund Policy</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
