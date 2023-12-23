/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobWorker } from "@/utils/apis/worker";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import {
  getDetailJob,
  updateJob,
  updateNegotiation,
} from "@/utils/apis/worker/api";
import { JobWorkerID } from "@/utils/mockdata/data";
import {
  UpdateJobSchema,
  UpdateNegotiationSchema,
  updateJobSchema,
  updateNegotiationSchema,
} from "@/utils/apis/worker/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import CustomFormField from "./custom-formfield";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const UpdateJob = () => {
  const [job, setJob] = useState<JobWorker>();
  const [showNego, setShowNego] = useState(false);
  const { toast } = useToast();

  const handleCloseNego = () => {
    setShowNego(false);
    {
      formNegotiation.register("price");
      formNegotiation.register("note_negosiasi");
      formNegotiation.setValue("price", 0);
      formNegotiation.setValue("note_negosiasi", "");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getDetailJob();
      setJob(JobWorkerID);
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

  const handleUpdateNegotiation = async (data: UpdateNegotiationSchema) => {
    try {
      const result = await updateNegotiation(data);
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

  const formNegotiation = useForm<UpdateNegotiationSchema>({
    resolver: zodResolver(updateNegotiationSchema),
    defaultValues: {
      note_negosiasi: "",
      price: 0,
      status: "",
    },
    values: {
      note_negosiasi: job?.note_negosiasi,
      price: 0,
      status: "",
    },
  });

  const form = useForm<UpdateJobSchema>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      note_negosiasi: "",
      price: 0,
      status: "",
    },
    values: {
      note_negosiasi: job?.note_negosiasi,
      price: job?.harga,
      status: "",
    },
  });

  return (
    <div>
      {showNego ? (
        <Form {...formNegotiation}>
          <form
            onSubmit={formNegotiation.handleSubmit(handleUpdateNegotiation)}
          >
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={formNegotiation.control}
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
                control={formNegotiation.control}
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
            <div className="flex gap-3 items-center mt-4">
              <Button onClick={handleCloseNego}>Batal</Button>
              <Button
                {...formNegotiation.register("status")}
                type="submit"
                name="pending"
                onClick={() =>
                  formNegotiation.setValue("status", "negotiation")
                }
              >
                Tawar
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdateJob)}
            className="mt-4 items-center justify-between md:flex lg:flex"
          >
            <div className="flex gap-3 items-center">
              <Button
                {...form.register("status")}
                type="submit"
                name="rejected"
                onClick={() => form.setValue("status", "rejected")}
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
              {job?.harga! < 1 ? (
                <Button disabled>Terima</Button>
              ) : (
                <Button
                  {...form.register("status")}
                  type="submit"
                  name="accepted"
                  onClick={() => form.setValue("status", "accepted")}
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
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
              )}
            </div>
            <div>
              <Button
                type="button"
                onClick={() => setShowNego(true)}
                className="bg-tukangku mt-4 text-black md:mt-0 lg:mt-0 hover:bg-yellow-300"
              >
                Tawar harga
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default UpdateJob;
