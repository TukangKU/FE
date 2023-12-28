/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobWorker } from "@/utils/apis/worker";
import { useToast } from "./ui/use-toast";
import { updateJob } from "@/utils/apis/worker/api";
import { UpdateJobSchema, updateJobSchema } from "@/utils/apis/worker/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToken } from "@/utils/contexts/token";
import { useNavigate, useParams } from "react-router-dom";
import Negotiation from "./negotiation";

interface Props {
  data: JobWorker;
}

const UpdateJob = (props: Props) => {
  const { data } = props;
  const { role } = useToken();
  const { toast } = useToast();
  const params = useParams();
  const navigate = useNavigate();

  const handleUpdateJob = async (data: UpdateJobSchema) => {
    try {
      const result = await updateJob(data, params.id as string);
      toast({
        description: result.message,
      });
      form.reset({}, { keepValues: true });
      navigate("/job/request");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const form = useForm<UpdateJobSchema>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      role: role,
      note_negosiasi: "",
      harga: 0,
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateJob)}
          className="mt-4 justify-between md:flex lg:flex"
        >
          <div className="flex gap-3 items-center mb-3">
            <Button
              {...form.register("status")}
              type="submit"
              name="rejected"
              onClick={() => {
                form.setValue("status", "rejected");
                form.setValue("harga", 0);
                form.setValue("note_negosiasi", "");
              }}
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 mr-2 animate-spin w-4" />
                  Loading
                </>
              ) : (
                "Tolak"
              )}
            </Button>
            <Button
              {...form.register("status")}
              type="submit"
              name="accepted"
              onClick={() => form.setValue("status", "accepted")}
              disabled={
                form.formState.isSubmitting || data.status === "pending"
              }
              aria-disabled={
                form.formState.isSubmitting || data.status === "pending"
              }
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="h-4 mr-2 animate-spin w-4" />
                  Loading
                </>
              ) : (
                "Terima"
              )}
            </Button>
          </div>
          <Negotiation
            id={data.job_id}
            note={data.note_negosiasi}
            worker={data.worker_name}
            client={data.client_name}
            price={data.harga}
            status={data.status}
          />
        </form>
      </Form>
    </div>
  );
};

export default UpdateJob;
