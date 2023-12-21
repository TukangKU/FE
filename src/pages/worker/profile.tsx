/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Worker } from "@/utils/apis/worker";
import { getWorkerProfile } from "@/utils/apis/worker/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const [worker, setWorker] = useState<Worker>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getWorkerProfile();
      setWorker(result.payload);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };
  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div className="bg-tukangku w-full h-32 absolute lg:bottom-[45.5rem] md:bottom-[44.5rem] bottom-[40.5rem]"></div>
        <div className="z-10 relative">
          <img
            src="/src/assets/worker/default-avatar.jpg"
            alt=""
            className="lg:w-52 md:w-48 w-44 rounded-full"
          />
        </div>
        <div className="relative flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Username</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={worker?.username}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Nama</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={worker?.name}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Skill</Label>
            <Input className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60" value={worker?.skills}/>
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Email</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={worker?.email}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">No HP</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={worker?.phone}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="lg:text-lg md:text-base text-sm">Alamat</Label>
            <Input
              className="border border-slate-300 lg:w-[35rem] md:w-[33rem] w-60"
              value={worker?.address}
            />
          </div>
          <Link to="/profile/worker/edit">
            <Button className="">Edit</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
