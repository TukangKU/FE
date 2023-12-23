/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getDetailJob } from "@/utils/apis/worker/api";
import { JobWorker } from "@/utils/apis/worker/types";
import { useEffect, useState } from "react";
import { JobWorkerID } from "@/utils/mockdata/data";
import UpdateJob from "@/components/update-job";
import StatusJob from "@/components/status-job";

const DetailJob = () => {
  const [job, setJob] = useState<JobWorker>();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getDetailJob();
      setJob(JobWorkerID);
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
      <div className="flex flex-col py-4 justify-center items-center relative">
        <div className="w-full relative">
          <div className="bg-tukangku w-full lg:h-32 md:h-28 h-[6.5rem]"></div>
          <div className="flex z-10 justify-center items-center">
            <img
              src={job?.foto}
              alt=""
              className="l4g:w-52 md:w-48 w-4 aspect-square rounded-full object-cover absolute top-5"
            />
          </div>
        </div>
        <div className="border rounded-lg flex flex-col border-slate-500 mt-28 p-4 gap-4">
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">Nama pemesan :</p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              {job?.client_name}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">Kategori :</p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              {job?.category}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">Mulai tanggal :</p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              {job?.start_date}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">
              Selesai tanggal :
            </p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              {job?.end_date}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">Alamat :</p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              {job?.alamat}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-sm md:text-base lg:text-base">Harga :</p>
            <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0">
              Rp. {job?.harga}
            </p>
          </div>
          <div>
            <p className="text-sm md:text-base lg:text-base">Deskripsi :</p>
            <Textarea
              className="h-64 text-sm md:text-base md:w-[30rem] lg:text-base lg:w-[35rem]"
              readOnly
              value={job?.deskripsi}
            />
          </div>
          {job?.status === "pending" ? (
            <UpdateJob />
          ) : job?.status === "negotiation" ? (
            <UpdateJob />
          ) : (
            <StatusJob data={job!}/>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DetailJob;
