/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "@/components/head";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/custom-formfield";
import { ClientPostJobType, clientPostJobSchema } from "@/utils/apis/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { JobDetailData } from "@/utils/mockdata/data";
import { useToast } from "@/components/ui/use-toast";
import { postJobDetail } from "@/utils/apis/client/api";

const JobDetail = () => {
  const { toast } = useToast();

  const form = useForm<ClientPostJobType>({
    resolver: zodResolver(clientPostJobSchema),
    defaultValues: {
      skill_id: JobDetailData.skill_id,
      worker_id: JobDetailData.worker_id,
      start_date: "",
      end_date: "",
      alamat: JobDetailData.alamat,
      description: "",
    },
  });

  async function onSubmit(data: ClientPostJobType) {
    try {
      const result = await postJobDetail(data);
      console.log("result", result);
      toast({
        description: result.message,
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Head>Job Detail</Head>
      <div className="flex flex-col justify-center items-center py-20">
        <img
          src={JobDetailData.foto}
          alt={JobDetailData.worker_name}
          className="lg:w-52 md:w-48 w-44 aspect-square rounded-full object-cover"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid justify-center mx-auto p-4">
              <div className="border p-4 rounded-md  my-5">
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold ">Category:</span>
                  <div>{JobDetailData.category}</div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold ">Name:</span>
                  <div>{JobDetailData.worker_name}</div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold ">Start Date:</span>
                  <CustomFormField control={form.control} name="start_date">
                    {(field) => (
                      <Input
                        type="date"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    )}
                  </CustomFormField>
                </div>

                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold">End Date:</span>
                  <CustomFormField control={form.control} name="end_date">
                    {(field) => (
                      <Input
                        type="date"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    )}
                  </CustomFormField>
                </div>
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold">Address:</span>
                  <CustomFormField control={form.control} name="alamat">
                    {(field) => (
                      <Input
                        type="text"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    )}
                  </CustomFormField>
                </div>

                <div className="grid grid-cols-1 justify-center items-center mb-2  ">
                  <span className="text-xl font-semibold text-center mb-4 flex gap-1">
                    Description
                    <HoverCard>
                      <HoverCardTrigger>
                        <HelpCircle size={23} />
                      </HoverCardTrigger>
                      <HoverCardContent align="start">
                        <div className="text-sm font-normal text-start">
                          <ul>
                            <li>
                              1. Tulis pekerjaan apa saja yang akan dilakukan
                              oleh pekerja
                            </li>
                            <li>
                              2. Klik request dan tunggu jawaban dari pekerja
                            </li>
                            <li>
                              3. Setelah request diterima Anda dapat menawar
                              harga layanan dengan pekerja
                            </li>
                          </ul>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </span>
                  <CustomFormField control={form.control} name="description">
                    {(field) => (
                      <Textarea
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    )}
                  </CustomFormField>
                </div>
              </div>
              <div className="flex justify-center items-center  gap-3">
                <Button type="submit" className="text-lg w-full">
                  Request
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default JobDetail;
