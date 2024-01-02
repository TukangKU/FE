/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "@/components/head";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { WorkerDetails } from "@/utils/apis/client/types";
import { getDataByService } from "@/utils/apis/client/api";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { WorkerAvailableCard } from "@/components/category-card";
import { Pagination } from "@/utils/types/api";
import PaginationButton from "@/components/pagination";

const AvailableData = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pagination, setPagination] = useState<Pagination>();

  const [worker, setWorker] = useState<WorkerDetails[]>([]);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    try {
      const result = await getDataByService(params.skill_id!);
      setWorker(result.data.data);
      setPagination(result.data.pagination);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  const handlePrevNextPage = (page: string | number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="bg-backgroundColor min-h-screen flex flex-col gap-5">
        <Head>Available Worker</Head>
        <div className="grid grid-cols-1 gap-3 p-8 md:grid-cols-2 xl:grid-cols-3  justify-items-center ">
          {worker.map((item, index) => (
            <WorkerAvailableCard
              key={index}
              image={item.foto}
              name={item.nama}
              address={item.alamat}
              skill={item.skill}
              onClick={() => {
                navigate(`/client/detail-worker/${item.id}`);
              }}
            />
          ))}
        </div>
        <div className="my-3">
          {worker !== null && (
            <PaginationButton
              meta={pagination}
              onClickPrevious={() => handlePrevNextPage(pagination!.page - 1)}
              onClickNext={() => handlePrevNextPage(pagination!.page + 1)}
              onClickPage={(page) => handlePrevNextPage(page)}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AvailableData;
