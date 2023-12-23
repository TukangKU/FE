/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/components/layout";
import PaginationButton from "@/components/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { getJobWorker } from "@/utils/apis/worker/api";
import { JobWorker } from "@/utils/apis/worker/types";
import { Pagination } from "@/utils/types/api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const RequestJob = () => {
  const [jobs, setJobs] = useState<JobWorker[]>([]);
  const [meta, setMeta] = useState<Pagination>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const fetchData = async () => {
    let query: { [key: string]: string } = {};
    for (const entry of searchParams.entries()) {
      query[entry[0]] = entry[1];
    }
    try {
      const result = await getJobWorker({ ...query });
      const { ...rest } = result;
      setJobs(result);
      setMeta(rest);
      console.log("result", result);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const handlePrevNextPage = (page: string | number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  const handleChangeSort = (value: string) => {
    searchParams.set("status", value);
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <div className="ps-32 me-auto mt-10 mb-5">
        <Select onValueChange={(value) => handleChangeSort(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="negotiation">Negosiasi</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {jobs.map((job) => (
        <Link to={`/job/detail/${job.job_id}`}>
          <div
            className="lg:flex md:flex lg:justify-between md:justify-between mx-auto mb-4 p-4 lg:w-[50rem] md:w-[40rem] justify-between rounded-lg hover:bg-slate-100 items-center border-slate-500 border"
            key={job.job_id}
          >
            <div className="lg:flex md:flex items-center gap-3">
              <img
                src="/src/assets/worker/user (3).png"
                alt=""
                className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto"
              />
              <div className="flex flex-col lg:gap-0 md:gap-0 gap-2 lg:mt-0 md:mt-0 mt-3 lg:items-start md:items-start items-center">
                <p className="font-semibold lg:text-lg md:text-base text-sm text-slate-400">
                  {job.client_name} - {job.category}
                </p>
                <p className="text-sm">
                  {job.start_date} / {job.end_date}
                </p>
              </div>
            </div>
            <div className="lg:mt-0 md:mt-0 mt-4 lg:ms-auto md:ms-auto lg:flex items-center gap-5">
              <div className="bg-sky-200 rounded-full px-4 py-3">
                <p>{job.status}</p>
              </div>
              <img
                src="/src/assets/worker/right-arrow (2).png"
                alt=""
                className="w-9 mx-auto"
              />
            </div>
          </div>
        </Link>
      ))}
      <PaginationButton
        meta={meta}
        onClickPrevious={() => handlePrevNextPage(meta?.page! - 1)}
        onClickNext={() => handlePrevNextPage(meta?.page! + 1)}
        onClickPage={(page) => handlePrevNextPage(page)}
      />
    </Layout>
  );
};

export default RequestJob;
