import React, { useEffect } from "react";
import { useContext } from "react";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { useForm } from "react-hook-form";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      paload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push("/Payment");
  };
  return (
    <Layout title={"Shipping Address"}>
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            className="w-full"
            autoFocus
            {...register("fullName", {
              required: "Please full name...",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            className="w-full"
            {...register("address", {
              required: "Please enter address...",
              minLength: {
                value: 4,
                message: "Address should be more than 3 characters",
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            className="w-full"
            {...register("city", {
              required: "Please your city...",
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            className="w-full"
            {...register("postalCode", {
              required: "Please enter postal code...",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            className="w-full"
            {...register("country", {
              required: "Enter your country...",
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
ShippingScreen.auth = true;
