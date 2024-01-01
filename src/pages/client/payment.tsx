/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Head from "@/components/head";
import { Button } from "@/components/ui/button";
import { PostPayment } from "@/utils/apis/client/api";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Payment = () => {
  const [paymentDone, setPaymentDone] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const jobData = location.state?.jobData;

  const form = useForm({
    defaultValues: {
      job_id: jobData?.job_id || "",
      job_price: jobData?.harga || "",
    },
  });
  useEffect(() => {
    const storedPaymentInfo = localStorage.getItem(
      `paymentInfo_${jobData?.job_id}`
    );
    if (storedPaymentInfo) {
      setPaymentDone(true);
    }
  }, [jobData]);

  const handlePayment = async () => {
    try {
      if (paymentDone) {
        toast({
          title: "Pembayaran Sudah Dilakukan",
          description: "Anda sudah melakukan pembayaran sebelumnya.",
          variant: "destructive",
        });
        return;
      }
      const formData = form.getValues();
      const snapToken = await PostPayment(formData.job_id, formData.job_price);
      (window as any).snap.pay(snapToken);
      localStorage.setItem(
        `paymentInfo_${formData.job_id}`,
        JSON.stringify({ token: snapToken })
      );
      setPaymentDone(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan dalam proses pembayaran.",
        variant: "destructive",
      });
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
    <div className="bg-backgroundColor">
      <Head>Payment</Head>
      <div className="flex justify-center items-center p-2">
        <div className="border border-gray-300 rounded-md p-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          <h2 className="text-lg font-semibold mb-2 pb-2 border-b border-gray-300 text-center">
            Order Information
          </h2>
          <Form {...form}>
            <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
              <span className="cols-span-1">ID Order</span>
              <p className="cols-span-1">{jobData?.job_id}</p>
            </div>
            <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
              <p className="cols-span-1">Customer Name</p>
              <p className="cols-span-1">{jobData?.client_name}</p>
            </div>
            <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
              <p className="cols-span-1">Kategori Pekerjaan</p>
              <p className="cols-span-1">{jobData?.category}</p>
            </div>
            <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
              <p className="cols-span-1">Durasi Pengerjaan</p>
              <p className="cols-span-1">{jobData?.start_date}</p>
            </div>
            <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
              <p className="cols-span-1">Nama Pekerja</p>
              <p className="cols-span-1">{jobData?.worker_name}</p>
            </div>
            <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
              <p className="cols-span-1">Harga</p>
              <p className="cols-span-1">Rp {jobData?.harga}</p>
            </div>
            <div className="flex justify-center items-center my-2 p-2">
              <Button
                onClick={handlePayment}
                className="text-lg w-full md:w-2/4 xl:w-1/3">
                Pay
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
