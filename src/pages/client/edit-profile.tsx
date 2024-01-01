/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Loader2 } from "lucide-react";

const EditProfile = () => {
  const { client, id, reFetch } = useToken();
  const { toast } = useToast();
  const [value, setValue] = useState("");
  const navigate = useNavigate();

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

  return (
    <Layout>
      <div className="flex flex-col gap-5 container p-10 lg:w-[1000px]">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-3xl">Edit Profile</h1>
          <img
            src={client.foto}
            alt={client.nama}
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
    </Layout>
  );
};

export default EditProfile;
