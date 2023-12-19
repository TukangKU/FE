import React from "react";

interface OrderInfoProps {
  orderId: string;
  customerName: string;
  workCategory: string;
  orderDuration: string;
  workerName: string;
  pricing: string;
  address: string;
 
}

const OrderInfo = ({
  orderId,
  customerName,
  workCategory,
  orderDuration,
  workerName,
  pricing,
  address,
 
}: OrderInfoProps) => {
  return (
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
  );
};

export default OrderInfo;
