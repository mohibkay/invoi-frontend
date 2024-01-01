import { ROUTES } from "@/lib/routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import MyAccount from "./MyAccount";
import Pricing from "./Pricing";
import useRazorpay from "react-razorpay";
import axios from "@/api/axios.ts";

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
const currentHost = window.location.host;

const Navbar = () => {
  const [Razorpay] = useRazorpay();
  const user = useAppSelector((state) => state.user);
  const {
    credits = 0,
    avatar = "",
    firstName = "",
    lastName = "",
    email = "",
  } = user.user || {};
  const fullName = `${firstName} ${lastName}`;
  const showPricing = credits <= 5;

  const checkoutHandler = async (name: string, amount: number) => {
    const {
      data: { order },
    } = await axios.post(`${backendUrl}/payment/checkout`, { name, amount });
    console.log("🐬 ~ checkoutHandler ~ payment:", order);

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: "INR",
      name: "Invoi App",
      description: "Test Transaction",
      image: "public/favicon.ico",
      order_id: order.order_id,
      // callback_url: "http://localhost:3000/payment/verify",
      handler: function (response: any) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
      },

      // handler: function (response: any) {
      //   console.log("🐬 ~ response:", response);
      //   const body = {
      //     ...response,
      //   };

      // const validateRes = await axios.post(
      //   `${backendUrl}/payment/verify`,
      //   body,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log("🐬 ~ validateRes:", validateRes);
      // },
      prefill: {
        name: fullName,
        email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#0F172A",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      console.log("🐬 ~ response:", response);

      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
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
              <span className='text-xs leading-none'>
                {credits === 1 ? "Credit" : "Credits"}
              </span>
            </p>
            {showPricing && <Pricing checkoutHandler={checkoutHandler} />}
            <MyAccount avatar={avatar} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
