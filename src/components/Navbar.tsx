import { ROUTES } from "@/lib/routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import MyAccount from "./MyAccount";
import Pricing from "./Pricing";
import axios from "@/api/axios.ts";

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

const Navbar = () => {
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
    } = await axios.post(`${backendUrl}/api/checkout`, { amount });
    console.log("🐬 ~ checkoutHandler ~ order:", order);
    order.id;
    console.log("🐬 ~ checkoutHandler ~ order.id:", order.id);

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: "INR",
      name: "Invoi App",
      description: "Test Transaction",
      image: "public/favicon.ico",
      order_id: order.id,
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          orderAmount: order.amount,
        };
        console.log("🐬 ~ checkoutHandler ~ options.response:", response);

        const result = await axios.post(
          "http://localhost:3000/api/payment-verification",
          data
        );
        console.log("🐬 ~ checkoutHandler ~ result:", result);
        console.log("congratulation emoji");
      },
      prefill: {
        name: fullName,
        email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#0F172A",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    /*
    rzp1.on("payment.failed", function (response) {
      console.log("🐬 ~ response:", response);

      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    });
    */
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
