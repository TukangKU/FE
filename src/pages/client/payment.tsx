import React from "react";
import OrderInfo from "@/components/order-info";
import Head from "@/components/head";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const orderId = "12313123123";
  const customerName = "John Doe";
  const workCategory = "AC Repair";
  const orderDuration = "3 Hari";
  const workerName = "Arman123";
  const pricing = "180.000";
  const address = "Jln kenangan bersamamu";

  const handlePayment = () => {};
  return (
    <div>
      <Head>Payment</Head>

      <div className="flex justify-center items-center p-2">
        <OrderInfo
          orderId={orderId}
          customerName={customerName}
          workCategory={workCategory}
          orderDuration={orderDuration}
          workerName={workerName}
          pricing={pricing}
          address={address}
          // bottomContent={

          // }
        />
      </div>
      <div className="flex  justify-center items-center my-2 p-2">
        <Button onClick={handlePayment} className="text-lg w-full md:w-2/4 xl:w-1/3 ">
          Pay
        </Button>
      </div>
    </div>
  );
};

export default Payment;
