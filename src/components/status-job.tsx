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

const StatusJob = () => {
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
      status: "finished",
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

  return (
    <div>
      {role === "worker" ? (
        <>
          {job?.status === "accepted" ? (
            <Form {...finishJob}>
              <form onSubmit={finishJob.handleSubmit(handleUpdateJob)}>
                <Button
                  type="submit"
                  {...finishJob.register("status")}
                  onClick={() => finishJob.setValue("status", "finished")}
                  className="w-full lg:text-4xl md:text-3xl text-2xl font-bold h-16"
                >
                  SELESAIKAN PENGERJAAN
                </Button>
              </form>
            </Form>
          ) : (
            <div className="bg-tukangku py-2 rounded-lg">
              <p className="text-center lg:text-4xl md:text-3xl text-2xl font-bold">
                {job?.status === "rejected"
                  ? "DITOLAK"
                  : job?.status === "negotiation"
                  ? "NEGOSIASI"
                  : job?.status === "accepted"
                  ? "DITERIMA"
                  : job?.status === "pending"
                  ? "PENDING"
                  : "SELESAI"}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="bg-tukangku py-2 rounded-lg">
          <p className="text-center lg:text-4xl md:text-3xl text-2xl font-bold">
            {job?.status === "rejected"
              ? "DITOLAK"
              : job?.status === "negotiation"
              ? "NEGOSIASI"
              : job?.status === "accepted"
              ? "DITERIMA"
              : job?.status === "pending"
              ? "PENDING"
              : "SELESAI"}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatusJob;
