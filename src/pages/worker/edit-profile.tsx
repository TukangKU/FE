/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  editWorkerProfile,
} from "@/utils/apis/worker/api";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  WorkerUpdateType,
  workerProfileUpdateSchema,
} from "@/utils/apis/worker/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import CustomFormField from "@/components/custom-formfield";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { useToken } from "@/utils/contexts/token";

const EditProfile = () => {
  const { worker, id } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState([]);


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
  };

  const form = useForm<WorkerUpdateType>({
    resolver: zodResolver(workerProfileUpdateSchema),
    defaultValues: {
      user_id: worker?.user_id,
      image: worker?.image ?? "",
      username: worker?.username ?? "",
      name: worker?.name ?? "",
      email: worker?.email ?? "",
      address: worker?.address ?? "",
      phone: worker?.phone ?? "",
      skills: worker?.skills ?? [],
    },
    values: {
      user_id: worker?.user_id!,
      username: worker?.username!,
      name: worker?.name!,
      email: worker?.name!,
      address: worker?.name!,
      phone: worker?.phone!,
      skills: worker?.skills!,
      image: worker?.image!,
    },
  });

  const fileRef = form.register("image", { required: true });

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div className="bg-tukangku w-full lg:h-32 md:h-32 h-28 absolute lg:bottom-[50rem] md:bottom-[47.5rem] bottom-[47rem]"></div>
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
                    {...fileRef}
                    type="file"
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
              <CustomFormField control={form.control} name="name" label="Nama">
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
                name="skills"
                label="Skills"
              >
                {(field) => (
                  <DropdownMenu>
                    <br />
                    <DropdownMenuTrigger>
                      <div className="border p-3 rounded-sm lg:w-[35rem] md:w-[33rem] w-[15rem]">
                        <p className="text-start text-muted-foreground text-sm">
                          Pilih keahlian
                        </p>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="px-2 pb-2 relative lg:right-[13.5rem] md:right-[13.5rem] right-[3.5rem]">
                      <FormItem>
                        {options.map((skill) => (
                          <FormItem
                            key={skill.skill_id}
                            className="flex items-center"
                          >
                            <Checkbox
                              checked={field.value?.includes(skill.skill_name)}
                              disabled={form.formState.isSubmitting}
                              aria-disabled={form.formState.isSubmitting}
                              className="relative top-1 my-1"
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      skill.skill_name,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) =>
                                          value !== skill.skill_name
                                      )
                                    );
                              }}
                            />
                            <FormLabel className="font-normal relative left-2">
                              {skill.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </FormItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                name="phone"
                label="No HP"
              >
                {(field) => (
                  <Input
                    type="text"
                    placeholder="No HP"
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
                  aria-disabled={form.formState.isSubmitting}
                >
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
