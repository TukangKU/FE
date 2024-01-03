/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import JobsCard from "@/components/jobs-card";
import Layout from "@/components/layout";
import PaginationButton from "@/components/pagination";
import SkeletonRequestJobs from "@/components/skeleton-request-jobs";
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
import { useToken } from "@/utils/contexts/token";
import { Pagination } from "@/utils/types/api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const RequestJob = () => {
  const [jobs, setJobs] = useState<JobWorker[]>([]);
  const [meta, setMeta] = useState<Pagination>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { role } = useToken();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const fetchData = async () => {
    let query: { [key: string]: string } = {};
    for (const entry of searchParams.entries()) {
      query[entry[0]] = entry[1];
    }
    setLoading(true);
    try {
      const result = await getJobWorker({ ...query });
      const { ...rest } = result.pagination;
      setJobs(result.data);
      setMeta(rest);
      setError(false);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: "Tidak ada pesanan",
        variant: "destructive",
      });
      setError(true);
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
      <div className="pb-4 bg-backgroundColor min-h-screen">
        <div className="lg:ps-32 md:ps-20 ps-5 me-auto mt-10 mb-5 w-fit">
          <Select onValueChange={(value) => handleChangeSort(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="flex items-center hover:bg-accent hover:text-accent-foreground py-1.5 pl-8 pr-2 text-sm rounded-md">
                  <Link to="/job/request">Semua</Link>
                </div>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="negotiation_to_client&negotiation_to_worker">
                  Negosiasi
                </SelectItem>
                <SelectItem value="accepted">Diterima</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
                <SelectItem value="Finished">Selesai</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          <SkeletonRequestJobs/>
        ) : (
          <div>
            {jobs === null || error ? (
              <div className="shadow-md rounded-md bg-white w-fit mx-auto p-4 my-4 cursor-default">
                <p className="font-bold">Tidak ada pesanan</p>
              </div>
            ) : (
              <div className="lg:block md:block grid grid-cols-2 gap-4 lg:p-0 md:p-0 p-4">
                {jobs.map((job, index) => (
                  <JobsCard key={index} data={job!} role={role!} />
                ))}
              </div>
            )}
          </div>
        )}
        {jobs !== null && (
          <div className="lg:mt-10 md:mt-10 mt-5 lg:p-0 md:p-0 px-4">
            <PaginationButton
              meta={meta}
              onClickPrevious={() => handlePrevNextPage(meta?.page! - 1)}
              onClickNext={() => handlePrevNextPage(meta?.page! + 1)}
              onClickPage={(page) => handlePrevNextPage(page)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RequestJob;
