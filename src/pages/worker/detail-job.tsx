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
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { toast } = useToast();
  const { role } = useToken();

  const date1 = new Date(job?.start_date!);
  const date2 = new Date(job?.end_date!);
  const startDate = date1.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const endDate = date2.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getDetailJob(params.id as string);
      setJob(result);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const workerCondition = () => {
    return (
      <>
        {role === "worker" && (
          <>
            {["pending", "negotiation_to_worker"].includes(job?.status!) ? (
              <UpdateJob data={job!} />
            ) : (
              <StatusJob data={job?.status!} />
            )}
          </>
        )}
      </>
    );
  };

  const clientCondition = () => {
    return (
      <>
        {role === "client" && (
          <>
            {job?.status === "negotiation_to_client" ? (
              <UpdateJob data={job!} />
            ) : (
              <StatusJob data={job?.status!} />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <Layout>
      {loading ? (
        <div className="custom-loader mx-auto mt-20"></div>
      ) : (
        <div className="p-5 bg-backgroundColor">
          <div className="flex flex-col p-4 gap-5 cursor-default mx-auto shadow-md border rounded-md bg-white lg:w-[37rem] w-fit">
            <div className="bg-tukangku p-3 rounded-md shadow-md">
              <p className="lg:text-lg md:text-lg text-base font-bold text-center">
                Informasi Pesanan
              </p>
            </div>
            <img
              src={job?.foto}
              alt=""
              className="rounded-full object-cover top-5 aspect-square lg:w-36 md:w-32 w-28 mx-auto border shadow-lg"
            />
            <div className="flex justify-around items-center border rounded-md shadow-md py-3 lg:w-[25rem] md:w-[25rem] w-full mx-auto bg-backgroundColor">
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="lg:text-base md:text-base text-sm">
                  {role === "worker" ? "Nama pelanggan" : "Nama pekerja"}
                </p>
                <p className="font-bold lg:text-base md:text-base text-sm">
                  {role === "worker"
                    ? `${job?.client_name}`
                    : `${job?.worker_name}`}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <p className="lg:text-base md:text-base text-sm">Kategori</p>
                <p className="font-bold lg:text-base md:text-base text-sm">
                  {job?.category}
                </p>
              </div>
            </div>
            <div className="border shadow-md p-3 rounded-md grid grid-cols-2 bg-backgroundColor">
              <p className="lg:text-base md:text-base text-sm">Alamat :</p>
              <p className="font-semibold lg:text-base md:text-base text-sm">
                {job?.alamat}
              </p>
            </div>
            <div className="border shadow-md p-3 rounded-md grid grid-cols-2 bg-backgroundColor">
              <p className="lg:text-base md:text-base text-sm">Tanggal :</p>
              <p className="font-semibold lg:text-base md:text-base text-sm">
                {startDate} - {endDate}
              </p>
            </div>
            <div className="border shadow-md p-3 rounded-md grid grid-cols-2 bg-backgroundColor">
              <p className="lg:text-base md:text-base text-sm">
                {role === "worker" ? "No HP Pelanggan :" : "No HP Pekerja :"}
              </p>
              <p className="font-semibold lg:text-base md:text-base text-sm">
                {job?.nohp}
              </p>
            </div>
            <div className="border shadow-md p-3 rounded-md bg-backgroundColor">
              <p className="text-sm md:text-base lg:text-base mb-2">
                Deskripsi pekerjaan :
              </p>
              <Textarea
                className="h-64 text-sm md:text-base lg:text-base cursor-default font-semibold"
                readOnly
                value={job?.deskripsi}
              />
            </div>
            <div className="flex justify-between bg-tukangku shadow-md p-3 rounded-md border">
              <p className="text-sm md:text-base lg:text-base">Harga :</p>
              <p className="text-sm ms-10 md:text-base md:ms-0 lg:text-base lg:ms-0 font-semibold">
                {job?.harga.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </div>
            {workerCondition()}
            {clientCondition()}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailJob;
