import React, { useEffect, useState } from "react";
import Head from "@/components/head";
import { Button } from "@/components/ui/button";
import { PostPayment } from "@/utils/apis/client/api";

const Payment: React.FC = () => {
  const [orderId, setOrderId] = useState<number>(6);
  const [pricing, setPricing] = useState<number>(20);

  const [customerName, setCustomerName] = useState<string>("John Doe");
  const [workCategory, setWorkCategory] =
    useState<string>("Your Work Category");
  const [orderDuration, setOrderDuration] = useState<string>(
    "Your Order Duration"
  );
  const [workerName, setWorkerName] = useState<string>("Worker Name");
  const [address, setAddress] = useState<string>("Your Address");

  const handlePayment = async () => {
    try {
      const snapToken = await PostPayment(orderId, pricing);
      (window as any).snap.pay(snapToken);
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_REACT_APP_CLIENT_KEY || ""
    );
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Head>Payment</Head>

      <div className="flex justify-center items-center p-2">
        <div className="border border-gray-300 rounded-md p-4  w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          <h2 className="text-lg font-semibold mb-2 pb-2 border-b border-gray-300 text-center">
            Order Information
          </h2>
          <div className="grid grid-cols-2 justify-center items-center mb-2  rounded-md p-3 ">
            <p className="cols-span-1">ID Order:</p>
            <p className="cols-span-1">{orderId}</p>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2  rounded-md p-3 ">
            <p className="cols-span-1">Customer Name:</p>
            <p className="cols-span-1">{customerName}</p>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2  rounded-md p-3 ">
            <p className="cols-span-1">Work Category:</p>
            <p className="cols-span-1">{workCategory}</p>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
            <p className="cols-span-1">Order Duration:</p>
            <p className="cols-span-1">{orderDuration}</p>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2  rounded-md p-3 ">
            <p className="cols-span-1">Worker Name:</p>
            <p className="cols-span-1">{workerName}</p>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2  rounded-md p-3 ">
            <p className="cols-span-1">Pricing:</p>
            <p className="cols-span-1">{pricing}</p>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
            <p className="cols-span-1">Address:</p>
            <p className="cols-span-1">{address}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center my-2 p-2">
        <Button
          onClick={handlePayment}
          className="text-lg w-full md:w-2/4 xl:w-1/3"
        >
          Pay
        </Button>
      </div>
    </div>
  );
};

export default Payment;
