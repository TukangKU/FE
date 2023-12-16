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
      setWorker(result.data);
    } catch (error:any) {
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
            <Input
              className="border border-slate-300 w-96"
              value={worker?.username}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Nama</Label>
            <Input
              className="border border-slate-300 w-96"
              value={worker?.name}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Skill</Label>
            <Input className="border border-slate-300 w-96" />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Email</Label>
            <Input
              className="border border-slate-300 w-96"
              value={worker?.email}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">No HP</Label>
            <Input
              className="border border-slate-300 w-96"
              value={worker?.phone}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-lg">Alamat</Label>
            <Input
              className="border border-slate-300 w-96"
              value={worker?.address}
            />
          </div>
          <Link to="/profile/worker/edit">
            <Button className="w-20">Edit</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
