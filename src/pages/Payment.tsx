import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";

function Payment() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(
    () => Promise.resolve(null)
  );
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/config`)
      .then(async (response) => {
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      });
  }, []);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/create-payment-intent`,
        {}
      )
      .then(async (response) => {
        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
      });
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
