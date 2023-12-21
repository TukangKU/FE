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

  const handleCloseNego = () => {
    setShowNego(false);
    {
      form.register("price");
    }
  };

  const handleUpdateJob = async (data: UpdateJobSchema) => {
    try {
      const result = await updateJob(data);
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
      deskripsi: "",
      price: 0,
      status: "",
    },
  });

  return (
    <Layout>
      <div className="flex flex-col py-4 justify-center items-center relative">
        <div
          className={` bg-tukangku w-full h-32 absolute ${
            showNego
              ? "lg:bottom-[50rem] md:bottom-[47rem] bottom-[44rem]"
              : "lg:bottom-[45rem] md:bottom-[43rem] bottom-[42rem]"
          }`}
        ></div>
        <div className="flex flex-col z-10 relative justify-center items-center">
          <img
            src="/src/assets/worker/default-avatar.jpg"
            alt=""
            className="rounded-full w-40 md:w-48 lg:w-52"
          />
        </div>
        <div className="border rounded-lg flex flex-col border-slate-500 mt-10 p-4 gap-4">
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">Nama pemesan :</p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              Sri wulandari
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">Mulai tanggal :</p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              12/10/2023
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">
              Selesai tanggal :
            </p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              12/10/2023
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">Alamat :</p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              Jl. Setia budi
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateJob)}>
              <div className="flex flex-col gap-2">
                <CustomFormField
                  control={form.control}
                  name="deskripsi"
                  label="Deskripsi"
                >
                  {(field) => (
                    <Textarea
                      className="h-64 text-sm md:text-base md:w-[30rem] lg:text-base lg:w-[35rem]"
                      placeholder="Isi deskripsi jika dibutuhkan"
                      {...field}
                    />
                  )}
                </CustomFormField>
              </div>
              <div className="mt-4 items-center justify-between md:flex lg:flex">
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
                            className="border border-slate-300 md:w-[30rem] lg:w-[35rem]"
                            type="number"
                          />
                        )}
                      </CustomFormField>
                    </div>
                    <div className="flex gap-3 items-center">
                      <Button
                        {...form.register("price")}
                        onClick={handleCloseNego}
                        name="price"
                      >
                        Batal
                      </Button>
                      <Button
                        {...form.register("status")}
                        type="submit"
                        name="pending"
                        onClick={() => form.setValue("status", "pending")}
                      >
                        Tawar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-3 items-center">
                      <Button
                        {...form.register("status")}
                        type="submit"
                        name="rejected"
                        onClick={() => form.setValue("status", "rejected")}
                      >
                        Tolak
                      </Button>
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
                    </div>
                    <div>
                      <Button
                        onClick={() => setShowNego(true)}
                        className="bg-tukangku mt-4 text-black md:mt-0 lg:mt-0 hover:bg-yellow-300"
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
