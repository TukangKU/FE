/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomFormField from "@/components/custom-formfield";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { updateJob } from "@/utils/apis/worker/api";
import { UpdateJobSchema, updateJobSchema } from "@/utils/apis/worker/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const DetailJob = () => {
  const [showNego, setShowNego] = useState(false);
  const { toast } = useToast();
  const [status, setStatus] = useState("");
  console.log(status);

  const handleUpdateJob = async (data: UpdateJobSchema) => {
    try {
      const result = await updateJob(data);
      console.log(JSON.stringify(result, null, 2));
      console.log(JSON.stringify(data, null, 2));
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

  const form = useForm<UpdateJobSchema>({
    resolver: zodResolver(updateJobSchema),
    defaultValues: {
      role: "worker",
      description: "",
      price: "",
      status: "",
    },
  });

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div
          className={` bg-tukangku w-full h-32 absolute ${
            showNego
              ? "lg:bottom-[50rem] md:bottom-[47rem] bottom-[44rem]"
              : "lg:bottom-[45rem] md:bottom-[43rem] bottom-[42rem]"
          }`}
        ></div>
        <div className="z-10 relative flex flex-col justify-center items-center">
          <img
            src="/src/assets/worker/default-avatar.jpg"
            alt=""
            className="lg:w-52 md:w-48 w-40 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-4 mt-10 border border-slate-500 p-4 rounded-lg">
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Nama pemesan :</p>
            <p className="lg:text-base md:text-base text-sm lg:ms-0 md:ms-0 ms-10">
              Sri wulandari
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Mulai tanggal :</p>
            <p className="lg:text-base md:text-base text-sm lg:ms-0 md:ms-0 ms-10">
              12/10/2023
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">
              Selesai tanggal :
            </p>
            <p className="lg:text-base md:text-base text-sm lg:ms-0 md:ms-0 ms-10">
              12/10/2023
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Alamat :</p>
            <p className="lg:text-base md:text-base text-sm lg:ms-0 md:ms-0 ms-10">
              Jl. Setia budi
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateJob)}>
              <div className="flex flex-col gap-2">
                <CustomFormField
                  control={form.control}
                  name="description"
                  label="Deskripsi"
                >
                  {(field) => (
                    <Textarea
                      className="lg:w-[35rem] md:w-[30rem] h-64 lg:text-base md:text-base text-sm"
                      placeholder="Isi deskripsi jika dibutuhkan"
                      {...field}
                    />
                  )}
                </CustomFormField>
              </div>
              <div className="lg:flex md:flex items-center justify-between mt-4">
                {showNego ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                      <CustomFormField
                        control={form.control}
                        name="price"
                        label="Tawar harga"
                      >
                        {(field) => (
                          <Input
                            {...field}
                            className="lg:w-[35rem] md:w-[30rem] border border-slate-300"
                            type="text"
                          />
                        )}
                      </CustomFormField>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button className="" onClick={() => setShowNego(false)}>
                        Batal
                      </Button>
                      <CustomFormField control={form.control} name="status">
                        {(field) => (
                          <Button
                            {...field}
                            type="submit"
                            onClick={() => setStatus("pending")}
                          >
                            Tawar
                          </Button>
                        )}
                      </CustomFormField>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Button
                        type="submit"
                        onClick={() => setStatus("rejected")}
                      >
                        Tolak
                      </Button>
                      <Button
                        type="submit"
                        onClick={() => setStatus("accepted")}
                        className=""
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading
                          </>
                        ) : (
                          "Terima"
                        )}
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() => setShowNego(true)}
                        className="bg-tukangku text-black hover:bg-yellow-300 lg:mt-0 md:mt-0 mt-4"
                      >
                        Tawar harga
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default DetailJob;
