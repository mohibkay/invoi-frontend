import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./App.css";
import CheckoutForm from "@/components/CheckoutForm";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OO0msSAFOELC9LZ8zuptMQkSdMUKhiA285LvaRUlV64NvOXyCnReGhXnkw9I8mYbQeXhgw8MppqmcPR6KlDXMVO00XV0yDQr4"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/create-payment-intent`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Assuming your response structure is like { clientSecret: "someSecret" }
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='App'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
