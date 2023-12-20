/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileClientType } from "@/utils/apis/client";
import { getClientProfile } from "@/utils/apis/client/api";
import { useEffect, useState } from "react";
import { useToken } from "@/utils/contexts/token";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { role, id } = useToken();
  const [client, setClient] = useState<ProfileClientType>();
  const { toast } = useToast();

  useEffect(() => {
    role === "client" && fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getClientProfile(id);
      setClient(result);
      console.log("result", result);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
      console.log("error");
    }
  };

  console.log("foto", client);

  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div className="bg-tukangku w-full h-32 absolute lg:bottom-[45.5rem] md:bottom-[44.5rem] bottom-[40.5rem]"></div>
        <div className="z-10 relative">
          <img
            src={client?.foto}
            alt={client?.nama}
            className="lg:w-52 md:w-48 w-44 aspect-square rounded-full object-cover"
          />
        </div>
        <div className="relative flex flex-col gap-4 mt-[100px]">
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Username</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={client?.username}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Nama</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={client?.nama}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Email</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={client?.email}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">No HP</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={client?.nohp}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Alamat</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={client?.alamat}
            />
          </div>

          <Button
            onClick={() => {
              navigate("/profile/client/edit");
            }}
            className="w-20">
            Edit
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
