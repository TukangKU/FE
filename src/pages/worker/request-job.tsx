/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/layout";
import { useToast } from "@/components/ui/use-toast";
import { getJobWorker } from "@/utils/apis/worker/api";
import { JobWorker } from "@/utils/apis/worker/types";
import { useEffect, useState } from "react";

const RequestJob = () => {
  const [jobs, setJobs] = useState<JobWorker[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getJobWorker();
      setJobs(result.payload);
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
      <div className="lg:flex md:flex lg:justify-between md:justify-between mx-auto bg-slate-100 p-4 lg:w-[50rem] md:w-[40rem] justify-between rounded-lg hover:bg-slate-200 items-center">
        <div className="lg:flex md:flex items-center gap-3">
          <img
            src="/src/assets/worker/user (3).png"
            alt=""
            className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto"
          />
          <div className="flex flex-col lg:gap-0 md:gap-0 gap-2 lg:mt-0 md:mt-0 mt-3 lg:items-start md:items-start items-center">
            <p className="font-semibold lg:text-lg md:text-base text-sm">
              Sri wulandari
            </p>
            <p className="lg:text-lg md:text-base text-sm">
              9/12/23 - 12/12/23
            </p>
          </div>
        </div>
        <div className="lg:mt-0 md:mt-0 mt-4 lg:ms-auto md:ms-auto">
          <img
            src="/src/assets/worker/right-arrow (2).png"
            alt=""
            className="w-10 mx-auto"
          />
        </div>
      </div>
    </Layout>
  );
};

export default RequestJob;
