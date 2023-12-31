/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToken } from "@/utils/contexts/token";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import CustomFormField from "./custom-formfield";
import { Input } from "./ui/input";
import { UpdateJobSchema, updateJobSchema } from "@/utils/apis/worker/types";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { updateJob } from "@/utils/apis/worker/api";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";

interface Props {
  id: string | number;
  note: string;
  workerName: string;
  clientName: string;
  price: number;
  status: string;
  foto: string;
}

const Negotiation = (props: Props) => {
  const { id, note, workerName, clientName, price, status, foto } = props;
  const { role, worker, client } = useToken();

  const navigate = useNavigate();

  const resetNego = () => {
    form.register("note_negosiasi");
    form.register("harga");
    form.setValue("note_negosiasi", "");
    form.setValue("harga", 0);
  };

  const handleUpdateJob = async (data: UpdateJobSchema) => {
    try {
      const result = await updateJob(data, id as string);
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Tawar Harga</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {status !== "pending" && (
          <div className="cursor-default">
            <div className="bg-tukangku p-2 rounded-md mb-3">
              <p className="text-center lg:text-lg md:text-lg text-base font-bold">
                NEGOSIASI
              </p>
            </div>
            <div className="shadow-md bg-backgroundColor p-3 cursor-default">
              <div className="flex gap-4">
                <div>
                  <img
                    src={foto}
                    alt=""
                    className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto aspect-square object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">
                    {role === "worker" ? `${clientName}` : `${workerName}`}
                  </p>
                  <Textarea
                    value={note}
                    readOnly
                    className="w-[22rem] cursor-default"
                  />
                  <div className="bg-tukangku p-2 shadow-md rounded-md flex justify-between">
                    <p>Tawaran Harga :</p>
                    <p className="font-semibold">
                      {price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateJob)}>
            <div className="gap-3 shadow-md p-3 rounded-md bg-backgroundColor">
              <div className="flex gap-3">
                <div>
                  <img
                    src={worker.foto || client.foto}
                    alt=""
                    className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto aspect-square object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">{worker.nama || client.nama}</p>
                  <CustomFormField control={form.control} name="note_negosiasi">
                    {(field) => (
                      <Textarea
                        {...field}
                        placeholder="Masukan pesan negosiasi"
                        className="w-[22rem]"
                      />
                    )}
                  </CustomFormField>
                  <div className="bg-tukangku p-2 shadow-md rounded-md flex justify-between items-center">
                    <p>Tawaran Harga :</p>
                    <CustomFormField control={form.control} name="harga">
                      {(field) => (
                        <Input
                          {...field}
                          className="border border-slate-300 h-8"
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
              <AlertDialogCancel
                onClick={resetNego}
                className="bg-red-600 hover:bg-red-500 hover:text-white text-white"
              >
                Batal
              </AlertDialogCancel>
              {role === "worker" ? (
                <Button
                  {...form.register("status")}
                  type="submit"
                  name="negotiation_to_client"
                  onClick={() =>
                    form.setValue("status", "negotiation_to_client")
                  }
                  className="bg-tukangku text-black hover:bg-yellow-300"
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
                  className="bg-green-600 text-white hover:bg-green-500"
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
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Negotiation;
