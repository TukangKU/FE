/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobWorker } from "@/utils/apis/worker";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { getDetailJob, updateJob } from "@/utils/apis/worker/api";
import { UpdateJobSchema, updateJobSchema } from "@/utils/apis/worker/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import CustomFormField from "./custom-formfield";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToken } from "@/utils/contexts/token";
import { useParams } from "react-router-dom";

const UpdateJob = () => {
  const { role } = useToken();
  const [showNego, setShowNego] = useState(false);
  const [job, setJob] = useState<JobWorker>();
  const { toast } = useToast();
  const params = useParams();

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

  const handleUpdateJob = async (data: UpdateJobSchema) => {
    try {
      const result = await updateJob(data, params.id as string);
      toast({
        description: result.message,
      });
      form.reset({}, { keepValues: true });
      setShowNego(false);
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
      note_negosiasi: job?.note_negosiasi,
      price: job?.harga,
    },
  });

  const showForm = useMemo(() => {
    if (role === "client") {
      if (job?.status !== "pending") return false;

      return true;
    }

    return true;
  }, [role, job?.status]);

  return (
    <div>
      {showForm && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateJob)}
            className="mt-4 items-center justify-between md:flex lg:flex"
          >
            {showNego ? (
              <div>
                <div className="flex flex-col gap-3">
                  <CustomFormField
                    control={form.control}
                    name="price"
                    label="Tawar harga"
                  >
                    {(field) => (
                      <Input
                        {...field}
                        className="border border-slate-300 md:w-[30rem] lg:w-[35rem]"
                        placeholder="Masukan tawaran harga"
                        type="number"
                      />
                    )}
                  </CustomFormField>
                  <CustomFormField
                    control={form.control}
                    name="note_negosiasi"
                    label="Negosiasi"
                  >
                    {(field) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Masukan note negosiasi"
                      />
                    )}
                  </CustomFormField>
                </div>
                <div className="flex mt-4 gap-3 items-center">
                  <Button onClick={() => setShowNego(false)}>Batal</Button>
                  <Button
                    {...form.register("status")}
                    type="submit"
                    name="pending"
                    onClick={() => form.setValue("status", "negotiation")}
                  >
                    Tawar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <Button
                  {...form.register("status")}
                  type="submit"
                  name="rejected"
                  onClick={() => {
                    form.setValue("status", "rejected");
                    form.setValue("price", 0);
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
                    form.formState.isSubmitting || job?.status === "pending"
                  }
                  aria-disabled={
                    form.formState.isSubmitting || job?.status === "pending"
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
                {(role === "worker" || job?.status === "negotiation") && (
                  <Button
                    type="button"
                    onClick={() => setShowNego(true)}
                    className="bg-tukangku mt-4 text-black md:mt-0 lg:mt-0 hover:bg-yellow-300"
                  >
                    Tawar harga
                  </Button>
                )}
              </div>
            )}
          </form>
        </Form>
      )}
    </div>
  );
};

export default UpdateJob;
