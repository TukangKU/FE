/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Loader2 } from "lucide-react";
import { useToken } from "@/utils/contexts/token";
import Select from "react-select";
import { skillOptions } from "@/utils/mockdata/data";

const EditProfile = () => {
  const { worker, id, reFetch } = useToken();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (
      worker.nama === "" &&
      worker.alamat === "" &&
      worker.nohp === "" &&
      worker.skill === null
    ) {
      toast({
        title: "Data profile belum lengkap!",
        description:
          "Harap melengkapi data profile terlebih dahulu untuk melanjutkan",
        variant: "destructive",
      });
    }

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
  }, [worker]);

  async function onSubmit(data: WorkerUpdateType) {
    try {
      const result = await editWorkerProfile(id, data);
      toast({
        description: result.message,
      });
      if (result.message === "posting update successfully") {
        reFetch();
        navigate("/profile");
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
      <div className="bg-backgroundColor">
        <div className="flex flex-col gap-5 container p-10 lg:w-[1000px] border bg-white my-5 rounded-md">
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-3xl">Edit Profile</h1>
            <img
              src={worker.foto}
              alt={worker.nama}
              className="w-36 aspect-square rounded-full object-cover"
            />
          </div>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-row gap-3 justify-between">
                <div className="w-[49%]">
                  <CustomFormField
                    control={form.control}
                    name="nama"
                    label="Nama">
                    {(field) => (
                      <Input
                        type="text"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                        placeholder="Nama"
                      />
                    )}
                  </CustomFormField>
                </div>
                <div className="w-[49%]">
                  <CustomFormField
                    control={form.control}
                    name="username"
                    label="Username">
                    {(field) => (
                      <Input
                        type="text"
                        disabled={form.formState.isSubmitting}
                        aria-disabled={form.formState.isSubmitting}
                        {...field}
                        placeholder="Username"
                      />
                    )}
                  </CustomFormField>
                </div>
              </div>
              <div className="w-full">
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
              <div className="w-full">
                <CustomFormField
                  control={form.control}
                  name="email"
                  label="Email">
                  {(field) => (
                    <Input
                      type="text"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="Email"
                    />
                  )}
                </CustomFormField>
              </div>
              <div className="w-full">
                <CustomFormField
                  control={form.control}
                  name="alamat"
                  label="Alamat">
                  {(field) => (
                    <Input
                      type="text"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="Alamat"
                    />
                  )}
                </CustomFormField>
              </div>
              <div className="w-full">
                <CustomFormField
                  control={form.control}
                  name="nohp"
                  label="No. HP">
                  {(field) => (
                    <Input
                      type="text"
                      disabled={form.formState.isSubmitting}
                      aria-disabled={form.formState.isSubmitting}
                      {...field}
                      placeholder="No. HP"
                    />
                  )}
                </CustomFormField>
              </div>
              <div className="w-full">
                <CustomFormField
                  control={form.control}
                  name="foto"
                  label="Foto Profile">
                  {(field) => (
                    <Input
                      type="file"
                      accept="image/*"
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
              <div className="flex flex-row gap-2">
                <Link to="/profile">
                  <Button className="w-20" type="button">
                    Batal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-tukangku"
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
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default EditProfile;
