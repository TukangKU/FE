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
import { updateJob } from "@/utils/apis/worker/api";
import { useToken } from "@/utils/contexts/token";

interface Props {
  data: JobWorker;
}

const StatusJob = (props: Props) => {
  const { data } = props;
  const { toast } = useToast();
  const { role } = useToken();

  const finishJob = useForm<UpdateJobSchema>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      note_negosiasi: "",
      price: 0,
      status: "",
    },
    values: {
      note_negosiasi: data?.note_negosiasi,
      price: data?.harga,
      status: "",
    },
  });

  const handleUpdateJob = async (data: UpdateJobSchema) => {
    try {
      const result = await updateJob(data);
      console.log(data);
      toast({
        description: result.message,
      });
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
            {data?.status === "accepted"
              ? "DITERIMA"
              : data?.status === "rejected"
              ? "DITOLAK"
              : "SELESAI"}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatusJob;
