/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { editWorkerProfile } from "@/utils/apis/worker/api";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  WorkerUpdateType,
  workerProfileUpdateSchema,
} from "@/utils/apis/worker/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/custom-formfield";
import { Loader2 } from "lucide-react";
import { useToken } from "@/utils/contexts/token";
import Select from "react-select";
import { skillOptions } from "@/utils/mockdata/data";

const EditProfile = () => {
  const { worker, id, reFetch } = useToken();
  const { toast } = useToast();
  const [value, setValue] = useState("");

  useEffect(() => {
    const newSkill: any = [];
    worker.skill?.map((item) => {
      const obj = {
        value: item.skill_id,
        label: item.skill,
      };
      newSkill.push(obj);
    });

    form.setValue("username", worker.username!);
    form.setValue("nama", worker.nama!);
    form.setValue("email", worker.email!);
    form.setValue("alamat", worker.alamat!);
    form.setValue("nohp", worker.nohp!);
    form.setValue("skill", newSkill);
    console.log();
  }, [worker]);

  async function onSubmit(data: WorkerUpdateType) {
    try {
      const result = await editWorkerProfile(id, data);
      toast({
        description: result.message,
      });
      if (result.message === "posting updated successfully") {
        reFetch();
      }
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }

  const form = useForm<WorkerUpdateType>({
    resolver: zodResolver(workerProfileUpdateSchema),
    defaultValues: {
      username: "",
      nama: "",
      email: "",
      alamat: "",
      nohp: "",
      skill: [],
    },
  });

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4 h-full">
        <div className="bg-tukangku w-full lg:h-32 md:h-32 h-28 absolute lg:bottom-[50rem] md:bottom-[47.5rem] bottom-[47rem]"></div>
        <div className="z-10 relative">
          <img
            src={worker.foto}
            alt={worker.nama}
            className="lg:w-52 md:w-48 w-44 aspect-square rounded-full object-cover"
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
                {(field) => (
                  <Input
                    accept="image/*"
                    type="file"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      if (e.target.files !== null) {
                        field.onChange(e.target.files[0]);
                      } else {
                        field.onChange("");
                      }
                    }}
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
                  <Input
                    type="text"
                    placeholder="Username"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField control={form.control} name="nama" label="Nama">
                {(field) => (
                  <Input
                    type="text"
                    placeholder="Nama"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="skill"
                label="Skills">
                {(field) => (
                  <Select
                    isMulti
                    options={skillOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    {...field}
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
                  <Input
                    type="text"
                    placeholder="Email"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
            </div>

            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="nohp"
                label="No. HP">
                {(field) => (
                  <Input
                    type="text"
                    placeholder="No. HP"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="alamat"
                label="Alamat">
                {(field) => (
                  <Input
                    type="text"
                    placeholder="Alamat"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                    {...field}
                  />
                )}
              </CustomFormField>
            </div>
            <div className="lg:flex md:flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link to="/profile/worker">
                  <Button className="" type="button">
                    Batal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className=""
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </>
                  ) : (
                    "Simpan"
                  )}
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
