/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Head from "@/components/head";
import { Button } from "@/components/ui/button";
import { PostPayment } from "@/utils/apis/client/api";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { getDetailJob } from "@/utils/apis/worker/api";
import Footer from "@/components/footer";
import { PostJob } from "@/utils/apis/client/types";

const Payment = () => {
  const { toast } = useToast();
  const params = useParams();
  const [jobData, setJobData] = useState<PostJob>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getDetailJob(params.id as string);
      setJobData(result);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const form = useForm({
    defaultValues: {
      job_id: jobData?.job_id,
      job_price: jobData?.harga,
    },
  });

  useEffect(() => {
    form.setValue("job_id", jobData?.job_id);
    form.setValue("job_price", jobData?.harga);
  }, [jobData, form]);

  const calculateDuration = (): number => {
    if (jobData && jobData.start_date && jobData.end_date) {
      const startDate: Date = new Date(jobData.start_date);
      const endDate: Date = new Date(jobData.end_date);
      const startUTC = Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const endUTC = Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      );
      const timeDifference: number = endUTC - startUTC;
      if (timeDifference === 0) {
        return 1;
      }
      const daysDifference: number = timeDifference / (1000 * 3600 * 24);
      return daysDifference + 1;
    }
    return 1;
  };

  const handlePayment = async () => {
    try {
      const formData = form.getValues();
      const job_id = formData.job_id ?? 0; 
      const job_price = formData.job_price ?? 0; 
      const respons = await PostPayment(job_id, job_price);
      window.location.replace(respons.data.url);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan dalam proses pembayaran.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-backgroundColor">
      <Head>Payment</Head>
      <div className="flex justify-center items-center p-2 my-10">
        {loading ? (
          <div className="h-screen custom-loader mx-auto mt-20"></div>
        ) : (
          <div className="bg-white border border-gray-300 rounded-md p-4 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
            <h2 className="text-lg font-semibold mb-2 pb-2 border-b border-gray-300 text-center">
              Order Information
            </h2>
            <Form {...form}>
              {jobData && (
                <>
                  <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
                    <span className="cols-span-1">ID Order</span>
                    <p className="cols-span-1">{jobData.job_id}</p>
                  </div>
                  <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
                    <p className="cols-span-1">Customer Name</p>
                    <p className="cols-span-1">{jobData.client_name}</p>
                  </div>
                  <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
                    <p className="cols-span-1">Kategori Pekerjaan</p>
                    <p className="cols-span-1">{jobData.category}</p>
                  </div>
                  <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
                    <p className="cols-span-1">Durasi Pengerjaan</p>
                    {jobData.start_date && jobData.end_date && (
                      <p className="cols-span-1">{calculateDuration()} hari</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
                    <p className="cols-span-1">Nama Pekerja</p>
                    <p className="cols-span-1">{jobData.worker_name}</p>
                  </div>
                  <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-3 ">
                    <p className="cols-span-1">Harga</p>
                    <p className="cols-span-1">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(jobData.harga)}
                    </p>
                  </div>
                  <div className="flex justify-center items-center my-2 p-2">
                    <Button
                      onClick={handlePayment}
                      className="text-lg w-full md:w-2/4 xl:w-1/3"
                    >
                      Bayar
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
