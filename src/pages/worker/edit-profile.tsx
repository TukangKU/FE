/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import {
  deleteProfile,
  editWorkerProfile,
  getWorkerProfile,
} from "@/utils/apis/worker/api";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Worker,
  WorkerUpdateType,
  workerProfileUpdateSchema,
} from "@/utils/apis/worker/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/custom-formfield";
import Alert from "@/components/alert";

const EditProfile = () => {
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [worker, setWorker] = useState<Worker>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getWorkerProfile();
      setWorker(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const handleEditProfile = async (data: WorkerUpdateType) => {
    data.image = data.image[0].name;
    try {
      const result = await editWorkerProfile(data);
      toast({
        description: result.message,
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const form = useForm<WorkerUpdateType>({
    resolver: zodResolver(workerProfileUpdateSchema),
    defaultValues: {
      user_id: 1,
      username: "",
      name: "",
      email: "",
      // password: "",
      address: "",
      phone: "",
      skills: [],
      image: "",
    },
  });

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

  const handleDeleteProfile = async (id: string) => {
    try {
      const result = await deleteProfile(id);
      toast({
        description: result?.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fileRef = form.register("image", { required: true });

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
            onSubmit={form.handleSubmit(handleEditProfile)}
          >
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="image"
                label="Foto profil"
              >
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
                label="Username"
              >
                {(field) => (
                  <Input type="text" {...field} placeholder="Username" />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField control={form.control} name="name" label="Nama">
                {(field) => <Input type="text" {...field} placeholder="Nama" />}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="skills"
                label="Skills"
              >
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
                label="Email"
              >
                {(field) => (
                  <Input type="text" {...field} placeholder="Email" />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              {/* <CustomFormField
                control={form.control}
                name="password"
                label="Password"
              >
                {(field) => (
                  <Input type="text" {...field} placeholder="Password" />
                )}
              </CustomFormField> */}
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="phone"
                label="No HP"
              >
                {(field) => (
                  <Input type="text" {...field} placeholder="No HP" />
                )}
              </CustomFormField>
            </div>
            <div className="flex flex-col gap-3">
              <CustomFormField
                control={form.control}
                name="address"
                label="Alamat"
              >
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
              <Alert
                title="Apakah anda yakin ?"
                description="Tindakan ini tidak dapat dibatalkan dan semua data yang terkait dengan akun ini akan dihapus secara permanen."
                onAction={() => handleDeleteProfile(`${worker?.user_id}`)}
              >
                <Button variant={"destructive"} type="button" className="lg:mt-0 md:mt-0 mt-4">
                  Hapus akun
                </Button>
              </Alert>
            </div>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditProfile;
