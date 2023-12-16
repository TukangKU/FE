import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Client } from "@/utils/apis/client";
import { getClientProfile } from "@/utils/apis/client/api";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [Client, setClient] = useState<Client>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getClientProfile();
      setClient(result.data);
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
        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Username</Label>
            <Input className="border border-slate-300 w-96" value={Client?.username}/>
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Nama</Label>
            <Input className="border border-slate-300 w-96" value={Client?.name}/>
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Email</Label>
            <Input className="border border-slate-300 w-96" value={Client?.email}/>
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">No HP</Label>
            <Input className="border border-slate-300 w-96" value={Client?.phone}/>
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Alamat</Label>
            <Input className="border border-slate-300 w-96" value={Client?.address}/>
          </div>
          <Button className="w-20">Edit</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
