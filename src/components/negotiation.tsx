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
import { Separator } from "./ui/separator";

interface Props {
  id: string | number;
  note: string;
  worker: string;
  client: string;
  price: number;
  status: string;
}

const Negotiation = (props: Props) => {
  const { id, note, worker, client, price, status } = props;
  const { role } = useToken();
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
        <Button variant={"outline"} className="bg-tukangku hover:bg-yellow-300">
          Tawar Harga
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {status !== "pending" && (
          <>
            <div>
              <p className="text-sm md:text-base lg:text-base mb-2">
                Pesan dari :{" "}
                <span className="font-semibold">
                  {role === "worker" ? `${client}` : `${worker}`}
                </span>
              </p>
              <Textarea readOnly value={note} className="cursor-default" />
              <p className="text-sm md:text-base lg:text-base mt-2">
                Tawaran harga :{" "}
                <span className="font-semibold">
                  {price?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>{" "}
              </p>
            </div>
            <Separator />
          </>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdateJob)}>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="harga"
                label="Tawar harga"
              >
                {(field) => (
                  <Input
                    {...field}
                    className="border border-slate-300"
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
              <AlertDialogCancel onClick={resetNego}>Batal</AlertDialogCancel>
              {role === "client" && (
                <Button
                  {...form.register("status")}
                  type="submit"
                  name="negotiation_to_worker"
                  onClick={() =>
                    form.setValue("status", "negotiation_to_worker")
                  }
                >
                  Tawar
                </Button>
              )}
              {role === "worker" && (
                <Button
                  {...form.register("status")}
                  type="submit"
                  name="negotiation_to_client"
                  onClick={() =>
                    form.setValue("status", "negotiation_to_client")
                  }
                >
                  Tawar
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
