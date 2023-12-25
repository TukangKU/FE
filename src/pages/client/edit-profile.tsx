/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/custom-formfield";
import { useToken } from "@/utils/contexts/token";
import {
  ClientUpdateType,
  clientProfileUpdateSchema,
} from "@/utils/apis/client/types";
import { updateProfile } from "@/utils/apis/client/api";

const EditProfile = () => {
  const { client, id, reFetch } = useToken();
  const { toast } = useToast();
  const [value, setValue] = useState("");

  const form = useForm<ClientUpdateType>({
    resolver: zodResolver(clientProfileUpdateSchema),
    defaultValues: {
      username: "",
      nama: "",
      email: "",
      alamat: "",
      nohp: "",
    },
  });

  useEffect(() => {
    form.setValue("username", client.username!);
    form.setValue("nama", client.nama!);
    form.setValue("email", client.email!);
    form.setValue("alamat", client.alamat!);
    form.setValue("nohp", client.nohp!);
  }, [client]);

  async function onSubmit(data: ClientUpdateType) {
    try {
      const result = await updateProfile(id, data);
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

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div className="bg-tukangku w-full h-32 absolute lg:bottom-[50.5rem] md:bottom-[48rem] bottom-[50rem]"></div>
        <div className="z-10 relative">
          <img
            src={client.foto}
            alt={client.nama}
            className="l4g:w-52 md:w-48 w-4 aspect-square rounded-full object-cover"
          />
        </div>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 lg:w-[35rem] md:w-[33rem] w-60 mt-[100px]"
            onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="foto"
                label="Foto profil">
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
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-3">
              <CustomFormField control={form.control} name="nama" label="Nama">
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
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-3">
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
            <div className="flex flex-col gap-3">
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
            <div className="lg:flex md:flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link to="/profile/worker">
                  <Button className="w-20" type="button">
                    Batal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}>
                  Submit
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
