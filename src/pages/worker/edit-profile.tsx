/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { editWorkerProfile } from "@/utils/apis/worker/api";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  WorkerUpdateType,
  workerProfileUpdateSchema,
} from "@/utils/apis/worker/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/custom-formfield";
import { useToken } from "@/utils/contexts/token";

const EditProfile = () => {
  const { worker, id } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState([]);

  const form = useForm<WorkerUpdateType>({
    resolver: zodResolver(workerProfileUpdateSchema),
    defaultValues: {
      username: "",
      nama: "",
      email: "",
      alamat: "",
      nohp: "",
    },
  });

  useEffect(() => {
    form.setValue("username", worker.username!);
    form.setValue("nama", worker.nama!);
    form.setValue("email", worker.email!);
    form.setValue("alamat", worker.alamat!);
    form.setValue("nohp", worker.nohp!);
  }, [worker]);

  async function onSubmit(data: WorkerUpdateType) {
    try {
      const result = await editWorkerProfile(id, data);
      console.log("result", result);
      toast({
        description: result.message,
      });
      navigate("/profile/client");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  const options = [
    {
      label: "Plumber",
      value: {
        skill_id: 1,
        skill_name: "Service AC",
      },
    },
    {
      label: "Cleaning",
      value: {
        skill_id: 2,
        skill_name: "Cleaning",
      },
    },
    {
      label: "Plumber",
      value: {
        skill_id: 3,
        skill_name: "Plumber",
      },
    },
    {
      label: "Decoration",
      value: {
        skill_id: 4,
        skill_name: "Decoration",
      },
    },
    {
      label: "CCTV",
      value: {
        skill_id: 5,
        skill_name: "CCTV",
      },
    },
  ];

  const fileRef = form.register("foto", { required: true });

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div className="bg-tukangku w-full h-32 absolute lg:bottom-[50.5rem] md:bottom-[48rem] bottom-[50rem]"></div>
        <div className="z-10 relative">
          <img
            src="/src/assets/worker/default-avatar.jpg"
            alt=""
            className="lg:w-52 md:w-48 w-44 rounded-full"
          />
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 lg:w-[35rem] md:w-[33rem] w-60"
            onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="foto"
                label="Foto profil">
                {() => (
                  <Input
                    type="file"
                    {...fileRef}
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="username"
                label="Username">
                {(field) => (
                  <Input type="text" {...field} placeholder="Username" />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField control={form.control} name="nama" label="Nama">
                {(field) => <Input type="text" {...field} placeholder="Nama" />}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="skills"
                label="Skills">
                {() => (
                  <MultiSelect
                    value={selectedSkills}
                    options={options}
                    onChange={setSelectedSkills}
                    labelledBy={""}
                    disableSearch
                  />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="email"
                label="Email">
                {(field) => (
                  <Input type="text" {...field} placeholder="Email" />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3"></div>
            <div className="flex flex-col gap-3">
              <CustomFormField control={form.control} name="nohp" label="No HP">
                {(field) => (
                  <Input type="text" {...field} placeholder="No HP" />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="alamat"
                label="Alamat">
                {(field) => (
                  <Input type="text" {...field} placeholder="Alamat" />
                )}
              </CustomFormField>
            </div>
            <div className="lg:flex md:flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link to="/profile/worker">
                  <Button className="w-20" type="button">
                    Batal
                  </Button>
                </Link>
                <Button className="w-20" type="submit">
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditProfile;
