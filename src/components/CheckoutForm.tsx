import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setMessage(submitError.message);
      return;
    }

    setIsProcessing(true);
    console.log("clientSecret", clientSecret);

    const { error: error1 } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: "Jenny Rosen",
            address: {
              line1: "510 Townsend St",
              postal_code: "402301",
              city: "mahad",
              state: "maharashtra",
              country: "IN",
            },
          },
        },
        return_url: "http://localhost:5173/",
      },
    });

    if (error1.type === "card_error" || error1.type === "validation_error") {
      setMessage(error1.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsProcessing(false);
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <PaymentElement id='payment-element' />
      <button disabled={isProcessing || !stripe || !elements} id='submit'>
        <span id='button-text'>
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
}
