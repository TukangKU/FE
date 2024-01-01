/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "@/components/head";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  CustomFormDatePicker,
} from "@/components/custom-formfield";
import { ClientPostJobType, clientPostJobSchema } from "@/utils/apis/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Service } from "@/utils/mockdata/data";
import { useToast } from "@/components/ui/use-toast";
import { postJobDetail } from "@/utils/apis/client/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "@/utils/contexts/token";
import { NewWorker } from "@/utils/apis/worker/types";
import Footer from "@/components/footer";

const JobDetail = () => {
  const { client } = useToken();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const dataWorker: NewWorker | undefined = location.state?.WorkerDetail;

  const serviceId = location.state.serviceId;

  const category = Service[serviceId - 1].name;

  const form = useForm<ClientPostJobType>({
    resolver: zodResolver(clientPostJobSchema),
    defaultValues: {
      skill_id: serviceId,
      worker_id: dataWorker?.id,
      start_date: new Date(),
      end_date: new Date(),
      alamat: client.alamat,
      deskripsi: "",
    },
  });

  async function onSubmit(data: ClientPostJobType) {
    try {
      const result = await postJobDetail(data);
      toast({
        description: result.message,
      });
      navigate("/job/request");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="bg-backgroundColor">
      <Head>Job Detail</Head>
      <div className="flex flex-col justify-center items-center py-20">
        <img
          src={dataWorker?.foto}
          alt={dataWorker?.nama}
          className="lg:w-52 md:w-48 w-44 aspect-square rounded-full object-cover"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid justify-center mx-auto p-4">
              <div className="border p-4 rounded-md shadow-md my-5  bg-white">
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold ">Kategori:</span>
                  <div>{category}</div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold ">Nama:</span>
                  <div>{dataWorker?.nama}</div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold ">No. HP:</span>
                  <div>{dataWorker?.nohp}</div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold ">Tanggal Mulai:</span>
                  <CustomFormDatePicker
                    control={form.control}
                    name="start_date"
                    placeholder="Pilih Tanggal..."
                  />
                </div>

                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold">Tanggal Berakhir:</span>
                  <CustomFormDatePicker
                    control={form.control}
                    name="end_date"
                    placeholder="Pilih Tanggal..."
                  />
                </div>
                <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 ">
                  <span className="font-semibold">Alamat Pengerjaan:</span>
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
                    Dekripsi
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
                  <CustomFormField control={form.control} name="deskripsi">
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
      <Footer />
    </div>
  );
};

export default JobDetail;
