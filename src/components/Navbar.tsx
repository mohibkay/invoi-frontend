import { ROUTES } from "@/lib/routes";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import MyAccount from "./MyAccount";
import Pricing from "./Pricing";
import axios from "@/api/axios.ts";
import { useGetUser } from "@/api/user";
import useRazorpay from "react-razorpay";
import { useState } from "react";
import PricingSuccess from "./PaymentSuccess";
import { CreditEnum } from "@/lib/constants";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import InvoiIcon from "../assets/invoi.ico";

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL;
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

type NavbarProps = {
  isFetching: boolean;
};

const Navbar = ({ isFetching }: NavbarProps) => {
  const { refetch } = useGetUser();
  const [Razorpay] = useRazorpay();
  const { width, height } = useWindowSize();

  const [creditsAwarded, setCreditsAwarded] = useState(0);
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [showPricingSuccess, setShowPricingSuccess] = useState(false);
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

  const checkoutHandler = async (amount: number) => {
    const {
      data: { order },
    } = await axios.post(`${backendUrl}/api/checkout`, { amount });

    const options = {
      key: razorpayKey,
      amount: order.amount,
      currency: "INR",
      name: "Invoi",
      description: "App Payment",
      image: InvoiIcon,
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

        try {
          const result = await axios.post(
            `${backendUrl}/api/payment-verification`,
            data
          );

          const amount = order.amount / 100;
          if (result.data.success) {
            refetch();
            setCreditsAwarded(CreditEnum[amount as keyof typeof CreditEnum]);
            setShowPricingSuccess(true);
          }
        } catch (error) {
          console.error("Error during payment verification:", error);
        }
      },
      prefill: {
        name: fullName,
        email,
      },
      notes: {
        address: "Invoi App Office",
      },
      theme: {
        color: "#0F172A",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on(
      "payment.failed",
      function (response: {
        error: {
          code: string;
          description: string;
          source: string;
          step: string;
          reason: string;
          metadata: {
            order_id: string;
            payment_id: string;
          };
        };
      }) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      }
    );
  };

  return (
    <>
      <nav className='border-b shadow-sm px-4 py-2'>
        <div className='flex justify-between items-center max-w-7xl mx-auto'>
          <Link to={ROUTES.DASHBOARD} className='text-3xl'>
            Invoi
          </Link>

          {isFetching && <Skeleton width={229.94} height={36} />}
          {user.user && !isFetching && (
            <div className='flex space-x-6'>
              <p className='flex flex-col'>
                <span className='text-xl font-medium -mb-0.5'>{credits}</span>
                <span className='text-xs leading-none'>
                  {credits === 1 ? "Credit" : "Credits"}
                </span>
              </p>
              {showPricing && (
                <Pricing
                  showPricingDialog={showPricingDialog}
                  setShowPricingDialog={setShowPricingDialog}
                  checkoutHandler={checkoutHandler}
                />
              )}
              <MyAccount avatar={avatar} />
            </div>
          )}
        </div>
      </nav>
      {showPricingSuccess && (
        <PricingSuccess
          creditsAwarded={creditsAwarded}
          showPricingSuccess={showPricingSuccess}
          setShowPricingSuccess={setShowPricingSuccess}
        />
      )}
      {!!creditsAwarded && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          style={{ zIndex: 99 }}
        />
      )}
    </>
  );
};

export default Navbar;
