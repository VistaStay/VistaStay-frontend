import { useEffect } from "react";
import { useCreateCheckoutSessionMutation } from "../lib/api";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CheckoutForm = ({ bookingId }) => {
  console.log(bookingId);
  const { getToken } = useAuth();

  const fetchClientSecret = useCallback(async () => {
    const token = await getToken();
    // Create a Checkout Session
    const res = await fetch(
      `${BACKEND_URL}/api/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId }),
      }
    );
    const data = await res.json();
    return data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;