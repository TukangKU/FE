import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEvent, useState } from "react";
import { UpdateClient } from "@/utils/apis/client/types";
import { editClientProfile } from "@/utils/apis/client/api";

const EditProfile = () => {
  const [profile, setProfile] = useState<Partial<UpdateClient>>({
    username: "",
    name: "",
    email: "",
    phone: "",
  });


  const handleEditProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      username: profile.username,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    };

    try {
      const result = await editClientProfile(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div className="bg-tukangku w-full h-32 absolute bottom-[45.5rem]"></div>
        <div className="z-10 relative">
          <img
            src="/src/assets/worker/default-avatar.jpg"
            alt=""
            className="w-52 rounded-full"
          />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleEditProfile}>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Username</Label>
            <Input
              className="border border-slate-300 w-96"
              onChange={(e) =>
                setProfile((prevState) => {
                  return { ...prevState, username: e.target.value };
                })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Nama</Label>
            <Input
              className="border border-slate-300 w-96"
              onChange={(e) =>
                setProfile((prevState) => {
                  return { ...prevState, full_name: e.target.value };
                })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Email</Label>
            <Input
              className="border border-slate-300 w-96"
              onChange={(e) =>
                setProfile((prevState) => {
                  return { ...prevState, email: e.target.value };
                })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">No HP</Label>
            <Input
              className="border border-slate-300 w-96"
              onChange={(e) =>
                setProfile((prevState) => {
                  return { ...prevState, phone: e.target.value };
                })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Alamat</Label>
            <Input className="border border-slate-300 w-96" />
          </div>
          <div className="flex items-center gap-3">
            <Button className="w-20">Batal</Button>
            <Button className="w-20">Simpan</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
