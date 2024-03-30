import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import PlaceOrderScreen from "./PlaceOrder";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/PlaceOrder");
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/Shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title={"Payment Method"}>
      <CheckoutWizard activeStep={2} />
      <form className=" mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["Paypal", "Stripe", "CashOnDelivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
            type="radio"
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-5 flex justify-between">
          <button
            onClick={() => router.push("/Shipping")}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
PaymentScreen.auth = true;
