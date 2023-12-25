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
import UpdateJob from "@/components/update-job";
import StatusJob from "@/components/status-job";
import { useParams } from "react-router-dom";
import { useToken } from "@/utils/contexts/token";

const DetailJob = () => {
  const [job, setJob] = useState<JobWorker>();
  const { toast } = useToast();
  const params = useParams();
  const { role } = useToken();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getDetailJob(params.id as string);
      setJob(result);
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
          <div className="bg-tukangku h-[6.5rem] w-full md:h-28 lg:h-32"></div>
          <div className="flex z-10 justify-center items-center">
            <img
              src={job?.foto}
              alt=""
              className="rounded-full object-cover top-5 aspect-square absolute lg:w-48 md:w-44 w-40"
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
              {job?.harga.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
          </div>
          <div>
            <p className="text-sm md:text-base lg:text-base mb-2">
              Deskripsi pesanan :
            </p>
            <Textarea
              className="h-64 text-sm md:text-base md:w-[30rem] lg:text-base lg:w-[35rem] cursor-default"
              readOnly
              value={job?.deskripsi}
            />
          </div>
          {role === "client" && (
            <>
              {job?.status === "negotiation_to_client" ? (
                <UpdateJob />
              ) : (
                <StatusJob />
              )}
            </>
          )}
          {role === "worker" && (
            <>
              {["pending", "negotiation_to_worker"].includes(job?.status!) ? (
                <UpdateJob />
              ) : (
                <StatusJob />
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DetailJob;
