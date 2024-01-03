/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToken } from "@/utils/contexts/token";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import CustomFormField from "./custom-formfield";
import { Input } from "./ui/input";
import {
  JobWorker,
  UpdateJobSchema,
  updateJobSchema,
} from "@/utils/apis/worker/types";
import { toast } from "./ui/use-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDetailJob, updateJob } from "@/utils/apis/worker/api";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Layout from "./layout";
import SkeletonNegotiationJob from "./skeleton-negotiation-job";

const Negotiation = () => {
  const { role, worker, client } = useToken();
  const [job, setJob] = useState<JobWorker>();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getDetailJob(params.id as string);
      setJob(result);
      setLoading(false);
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
    <Layout>
      {loading ? (
        <SkeletonNegotiationJob status={job?.status!} />
      ) : (
        <div className="bg-backgroundColor p-4">
          <div className="cursor-default lg:w-[40rem] md:w-[40rem] mx-auto p-4 bg-white shadow-md rounded-md flex flex-col gap-4">
            <div className="bg-tukangku p-2 rounded-md ">
              <p className="text-center lg:text-lg md:text-lg text-base font-bold">
                NEGOSIASI
              </p>
            </div>
            {job?.status !== "pending" && (
              <div className="shadow-md bg-backgroundColor p-3 cursor-default">
                <div className="lg:flex md:flex gap-4">
                  <div>
                    <img
                      src={job?.foto}
                      alt=""
                      className="lg:w-20 md:w-16 w-20 lg:mx-0 md:mx-0 mx-auto aspect-square object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold lg:text-base md:text-base text-sm lg:text-start md:text-start text-center mt-3">
                      {role === "worker"
                        ? `${job?.client_name}`
                        : `${job?.worker_name}`}
                    </p>
                    <Textarea
                      value={job?.note_negosiasi}
                      readOnly
                      className="lg:w-[30rem] md:w-[30rem] w-full cursor-default lg:text-base md:text-base text-sm "
                    />
                    <div className="bg-tukangku p-3 shadow-md rounded-md flex justify-between">
                      <p className="lg:text-base md:text-base text-sm">
                        Tawaran Harga :
                      </p>
                      <p className="font-semibold lg:text-base md:text-base text-sm">
                        {job?.harga.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateJob)}>
                <div className="gap-3 shadow-md p-3 rounded-md bg-backgroundColor">
                  <div className="lg:flex md:flex gap-4">
                    <div>
                      <img
                        src={worker.foto || client.foto}
                        alt=""
                        className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto aspect-square object-cover rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold lg:text-base md:text-base text-sm mt-3 lg:text-start md:text-start text-center">
                        {worker.nama || client.nama}
                      </p>
                      <CustomFormField
                        control={form.control}
                        name="note_negosiasi"
                      >
                        {(field) => (
                          <Textarea
                            {...field}
                            placeholder="Masukan pesan negosiasi"
                            className="lg:w-[30rem] md:w-[30rem] w-full lg:text-base md:text-base text-sm"
                          />
                        )}
                      </CustomFormField>
                      <div className="bg-tukangku p-2 shadow-md rounded-md lg:flex md:flex justify-between items-center">
                        <p className="lg:text-base md:text-base text-sm mb-2 relative top-1">
                          Tawaran Harga :
                        </p>
                        <CustomFormField control={form.control} name="harga">
                          {(field) => (
                            <Input
                              {...field}
                              className="border border-slate-300 lg:w-[15rem] md:w-[15rem] w-fit"
                              placeholder="Masukan tawaran harga"
                              type="number"
                            />
                          )}
                        </CustomFormField>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex mt-4 gap-3 items-center">
                  <Link to={`/job/detail/${job?.job_id}`}>
                    <Button className="bg-red-600 hover:bg-red-500 lg:text-base md:text-base text-sm">
                      Batal
                    </Button>
                  </Link>
                  <div>
                    {role === "worker" ? (
                      <Button
                        {...form.register("status")}
                        type="submit"
                        name="negotiation_to_client"
                        onClick={() =>
                          form.setValue("status", "negotiation_to_client")
                        }
                        className="bg-green-600 hover:bg-green-500 lg:text-base md:text-base text-sm"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="h-4 mr-2 animate-spin w-4" />
                            Loading
                          </>
                        ) : (
                          "Tawar"
                        )}
                      </Button>
                    ) : (
                      <Button
                        {...form.register("status")}
                        type="submit"
                        name="negotiation_to_worker"
                        onClick={() =>
                          form.setValue("status", "negotiation_to_worker")
                        }
                        className="bg-green-600 text-white hover:bg-green-500 lg:text-base md:text-base text-sm"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="h-4 mr-2 animate-spin w-4" />
                            Loading
                          </>
                        ) : (
                          "Tawar"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Negotiation;
