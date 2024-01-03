/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JobWorker,
  UpdateJobSchema,
  updateJobSchema,
} from "@/utils/apis/worker/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "./ui/use-toast";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { getDetailJob, updateJob } from "@/utils/apis/worker/api";
import { useToken } from "@/utils/contexts/token";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  data: string;
  payment: string;
}

const StatusJob = (props: Props) => {
  const { data, payment } = props;
  const { toast } = useToast();
  const { role } = useToken();
  const [job, setJob] = useState<JobWorker>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
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
      (role === "client" && data === "accepted") ||
      job?.status === "finished"
    ) {
      try {
        const result = await getDetailJob(params.id as string);
        navigate(`/client/payment/${result.job_id}`);
      } catch (error: any) {
        toast({
          title: "Oops! Something went wrong.",
          description: error.toString(),
          variant: "destructive",
        });
      }
    }
  };

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
                  disabled={finishJob.formState.isSubmitting}
                  aria-disabled={finishJob.formState.isSubmitting}
                >
                  SELESAIKAN PENGERJAAN
                </Button>
              </form>
            </Form>
          ) : (
            <div
              className={`${data === "pending" && "bg-tukangku"} ${
                data === "accepted" && "bg-green-600"
              } ${data === "rejected" && "bg-red-600"} ${
                data === "finished" && "bg-blue-600"
              } ${data === "negotiation_to_client" && "bg-slate-500"} ${
                data === "negotiation_to_worker" && "bg-slate-500"
              } py-2 rounded-lg`}
            >
              <p className="text-center lg:text-3xl md:text-2xl text-xl font-bold text-white">
                {data === "rejected"
                  ? "DITOLAK"
                  : data === "negotiation_to_client"
                  ? "NEGOSIASI"
                  : data === "accepted"
                  ? "DITERIMA"
                  : data === "pending"
                  ? "PENDING"
                  : data === "negotiation_to_worker"
                  ? "NEGOSIASI"
                  : "SELESAI"}
              </p>
            </div>
          )}
        </>
      ) : (
        <div
          className={` ${data === "pending" && "bg-tukangku"} ${
            data === "accepted" && "bg-green-600"
          } ${data === "rejected" && "bg-red-600"} ${
            data === "negotiation_to_client" && "bg-slate-500"
          } ${data === "negotiation_to_worker" && "bg-slate-500"}
            ${
              data === "finished" && payment === "Success" && "bg-blue-500"
            } py-2 rounded-lg`}
        >
          {role === "client" && (
            <>
              {payment !== "Success" && data === "finished" ? (
                <Button
                  onClick={handleAcceptJob}
                  className={`w-full lg:text-3xl md:text-2xl text-xl font-bold h-16 bg-green-600 hover:bg-green-500`}
                >
                  BAYAR
                </Button>
              ) : (
                <p className="text-center lg:text-3xl md:text-2xl text-xl font-bold text-white">
                  {data === "accepted"
                    ? "DITERIMA"
                    : data === "rejected"
                    ? "DITOLAK"
                    : data === "pending"
                    ? "PENDING"
                    : data === "finished"
                    ? "SELESAI"
                    : "NEGOSIASI"}
                </p>
              )}
            </>
          )}
        </div>
      )}
      <p className="italic text-muted-foreground mt-1 text-sm">
        {["pending", "negotiation_to_worker", "negotiation_to_client"].includes(
          data
        ) && (
          <>
            {role === "worker"
              ? "* Menunggu respone atau tawaran harga dari pelanggan."
              : " * Menunggu respone atau tawaran harga dari pekerja."}
          </>
        )}
        {data === "accepted" && (
          <>
            {role === "worker"
              ? "* Pekerjaan diterima, segera selesaikan pekerjaan."
              : "* Pekerjaan diterima, tunggu pekerja menyelesaikan pekerjaan."}
          </>
        )}
        {data === "finished" && payment !== "Success" && (
          <>
            {role === "worker"
              ? "* Pekerjaan telah diselesaikan, Silahkan tunggu pembayaran dari pelanggan"
              : "* Pekerjaan telah diselesaikan, silahkan lakukan pembayaran"}
          </>
        )}
        {data === "finished" &&
          payment === "Success" &&
          "* Terima kasih telah menggunakan layanan TUKANGKU"}
      </p>
    </div>
  );
};

export default StatusJob;
