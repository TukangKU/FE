import { useToken } from "@/utils/contexts/token";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import CustomFormField from "./custom-formfield";
import { Input } from "./ui/input";
import { UpdateJobSchema } from "@/utils/apis/worker/types";
import updateJob from "./update-job";
import { toast } from "./ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";

const Negotiation = () => {
  const { role } = useToken();
  const params = useParams()
  const navigate = useNavigate()

  const handleUpdateJob = async (data: UpdateJobSchema) => {
    try {
      const result = await updateJob(data, params.id as string);
      toast({
        description: result.message,
      });
      form.reset({}, { keepValues: true });
      setShowNego(false);
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
    <Form>
      <form>
      <div className="flex flex-col gap-3">
                  <CustomFormField
                    control={form.control}
                    name="harga"
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
        {role === "client" && (
          <Button
            {...form.register("status")}
            type="submit"
            name="negotiation_to_worker"
            onClick={() => form.setValue("status", "negotiation_to_worker")}
          >
            Tawar
          </Button>
        )}
        {role === "worker" && (
          <Button
            {...form.register("status")}
            type="submit"
            name="negotiation_to_client"
            onClick={() => form.setValue("status", "negotiation_to_client")}
          >
            Tawar
          </Button>
        )}
      </form>
    </Form>
  );
};

export default Negotiation;
