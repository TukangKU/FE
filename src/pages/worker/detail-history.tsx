import Layout from "@/components/layout";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { getDetailHistory } from "@/utils/apis/worker/api";
import { JobWorker } from "@/utils/apis/worker/types";
import { useEffect, useState } from "react";

const DetailHistory = () => {
  const [job, setJob] = useState<JobWorker>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getDetailHistory();
      setJob(result.payload);
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
        <div className="bg-tukangku w-full h-32 absolute lg:bottom-[47rem] md:bottom-[45.5rem] bottom-[42.5rem]"></div>
        <div className="z-10 relative flex flex-col justify-center items-center">
          <img
            src="/src/assets/worker/default-avatar.jpg"
            alt=""
            className="lg:w-52 md:w-48 w-44 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-4 mt-10 border border-slate-500 p-4 rounded-lg">
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Nama pemesan :</p>
            <p className="lg:ms-0 md:ms-0 ms-10 lg:text-base md:text-base text-sm">
              {job?.client_name}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Mulai tanggal :</p>
            <p className="lg:ms-0 md:ms-0 ms-10 lg:text-base md:text-base text-sm">
              12/10/2023
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">
              Selesai tanggal :
            </p>
            <p className="lg:ms-0 md:ms-0 ms-10 lg:text-base md:text-base text-sm">
              12/11/2023
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Alamat :</p>
            <p className="lg:ms-0 md:ms-0 ms-10 lg:text-base md:text-base text-sm">
              Jl. setia budi
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm w-full">
              Total pembayaran :
            </p>
            <p className="lg:ms-0 md:ms-0 ms-10 lg:text-base md:text-base text-sm">
              Rp. 150.000
            </p>
          </div>
          <div className="rounded-lg flex flex-col gap-3">
            <p className="lg:text-base md:text-base text-sm">Deskripsi :</p>
            <Textarea
              className="lg:w-[35rem] md:w-[30rem] h-64 lg:text-base md:text-base text-sm"
              value="Ditunggu ya mas"
              readOnly
            />
          </div>
          <div className="bg-tukangku py-2 rounded-lg">
            <p className="text-center lg:text-4xl md:text-3xl text-2xl font-bold">
              SELESAI
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailHistory;
