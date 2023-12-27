/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JobWorker,
  TransactionInfo,
  UpdateJobSchema,
  updateJobSchema,
} from "@/utils/apis/worker/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import {
  getDetailJob,
  getTransaction,
  updateJob,
} from "@/utils/apis/worker/api";
import { useToken } from "@/utils/contexts/token";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StatusJob = () => {
  const { toast } = useToast();
  const { role } = useToken();
  const [job, setJob] = useState<JobWorker>();
  const params = useParams();
  const navigate = useNavigate();
  const [statusPayment, setStatusPayment] = useState<TransactionInfo>();

  useEffect(() => {
    fetchData();
    getStatusPayment();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getDetailJob(params.id as string);
      setJob(result);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const getStatusPayment = async () => {
    try {
      const result = await getTransaction(params.id as string);
      setStatusPayment(result);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const finishJob = useForm<UpdateJobSchema>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      role: role,
      note_negosiasi: job?.note_negosiasi,
      harga: job?.harga,
    },
  });

  const handleUpdateJob = async (data: UpdateJobSchema) => {
    try {
      const result = await updateJob(data, params.id as string);
      toast({
        description: result.message,
      });
      navigate("/job/request");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const handleAcceptJob = async () => {
    if (
      (role === "client" && job?.status === "accepted") ||
      job?.status === "finished"
    ) {
      try {
        const result = await getDetailJob(params.id as string);
        navigate("/client/payment", { state: { jobData: result } });
      } catch (error: any) {
        toast({
          title: "Oops! Something went wrong.",
          description: error.toString(),
          variant: "destructive",
        });
      }
    }
  };

  console.log(statusPayment?.status);

  return (
    <div className="cursor-default">
      {role === "worker" ? (
        <>
          {job?.status === "accepted" ? (
            <Form {...finishJob}>
              <form onSubmit={finishJob.handleSubmit(handleUpdateJob)}>
                <Button
                  type="submit"
                  {...finishJob.register("status")}
                  onClick={() => finishJob.setValue("status", "finished")}
                  className="w-full lg:text-3xl md:text-2xl text-xl font-bold h-16 bg-blue-500 hover:bg-blue-600"
                >
                  SELESAIKAN PENGERJAAN
                </Button>
              </form>
            </Form>
          ) : (
            <div
              className={`${job?.status === "pending" && "bg-tukangku"} ${
                job?.status === "accepted" && "bg-green-600"
              } ${job?.status === "rejected" && "bg-red-600"} ${
                job?.status === "finished" && "bg-blue-600"
              } ${job?.status === "negotiation_to_client" && "bg-slate-500"} ${
                job?.status === "negotiation_to_worker" && "bg-slate-500"
              } py-2 rounded-lg`}
            >
              <p className="text-center lg:text-3xl md:text-2xl text-xl font-bold text-white">
                {job?.status === "rejected"
                  ? "DITOLAK"
                  : job?.status === "negotiation_to_client"
                  ? "NEGOSIASI"
                  : job?.status === "accepted"
                  ? "DITERIMA"
                  : job?.status === "pending"
                  ? "PENDING"
                  : job?.status === "negotiation_to_worker"
                  ? "NEGOSIASI"
                  : "SELESAI"}
              </p>
            </div>
          )}
        </>
      ) : (
        <div
          className={` ${job?.status === "pending" && "bg-tukangku"} ${
            job?.status === "accepted" && "bg-green-600"
          } ${job?.status === "rejected" && "bg-red-600"} ${
            job?.status === "negotiation_to_client" && "bg-slate-500"
          } ${job?.status === "negotiation_to_worker" && "bg-slate-500"}
           ${
             job?.status === "finished" || statusPayment?.status === "success"
           } py-2 rounded-lg`}
        >
          {role === "client" && (
            <>
              {statusPayment?.status === "pending" &&
              job?.status === "finished" ? (
                <Button
                  onClick={handleAcceptJob}
                  className="w-full lg:text-3xl md:text-2xl text-xl font-bold h-16 bg-green-600 hover:bg-green-500"
                >
                  BAYAR
                </Button>
              ) : (
                <p className="text-center lg:text-3xl md:text-2xl text-xl font-bold text-white">
                  {statusPayment?.status === "success"
                    ? "SELESAI"
                    : job?.status === "accepted"
                    ? "DITERIMA"
                    : job?.status === "rejected"
                    ? "DITOLAK"
                    : job?.status === "pending"
                    ? "PENDING"
                    : "SELESAI"}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusJob;
