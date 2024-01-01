/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Head from "@/components/head";
import Footer from "@/components/footer";
import { WorkerDetails } from "@/utils/apis/client/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { getWorkerByID } from "@/utils/apis/client/api";
import { useToast } from "@/components/ui/use-toast";
import useWorkerStore from "@/utils/state";

const DetailWorker = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addWorker } = useWorkerStore();

  const [worker, setWorker] = useState<WorkerDetails>();

  const [showTable, setShowTable] = useState(false);

  const tableRef = useRef<HTMLDivElement>(null);
  const scrollToShowTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getWorkerByID(params.worker_id!);
      setWorker(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  function onClickTakeWorker() {
    toast({
      description: "Worker telah dipilih",
    });
    addWorker(worker!);
    navigate("/client/job-detail");
  }

  return (
    <div className="bg-backgroundColor min-h-screen">
      <Head>
        <div className="flex justify-center item center text-gray-600 ">
          Detail Worker
        </div>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 p-8">
        <div className="grid justify-center items-center">
          <img
            src={worker?.foto}
            alt={worker?.nama}
            className="sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-cover rounded-lg"
          />
        </div>
        <div className="grid justify-center">
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Informasi Worker
            </h1>
            <div className="text-center">
              <h2 className="text-lg ">{worker?.nama}</h2>
            </div>
            <div className="mt-2 text-center">
              <h2 className="text-lg ">{worker?.email}</h2>
            </div>
            <div className="mt-2 text-center">
              <h2 className="text-lg ">{worker?.nohp}</h2>
            </div>
            <div className="mt-2 text-center">
              <h2 className="text-lg ">{worker?.alamat}</h2>
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Skill Worker</h2>
              <div className="flex flex-wrap justify-center items-center text-muted-foreground">
                {worker?.skill.slice(0, 3).map((singleSkill, index) => (
                  <span
                    key={index}
                    className="bg-tukangku rounded-full px-3 py-1 mr-2 mb-2">
                    {singleSkill.skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center" ref={tableRef}>
              <h2
                className="font-bold mb-4 cursor-pointer"
                onClick={() => {
                  setShowTable(!showTable);
                  scrollToShowTable();
                }}>
                Total Project {1}
              </h2>
              <div className="flex flex-cols-2 justify-center items-center gap-4">
                <Button
                  className="w-24"
                  onClick={() => {
                    goBack();
                  }}>
                  Batal
                </Button>
                <Button
                  className="w-24"
                  onClick={() => {
                    onClickTakeWorker();
                  }}>
                  Pilih
                </Button>
              </div>
            </div>
          </>
        </div>
      </div>
      <div className="flex justify-center items-center my-8">
        <div className="w-4/5">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell style={{ fontWeight: "bold" }}>No</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Nama Project
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Harga</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {worker?.job !== null ? (
                  worker?.job.slice(0, 10).map((item, index) => (
                    <TableRow
                      key={item.job_id}
                      style={{ backgroundColor: "#ffffff" }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <div className="p-3">Belum ada pesanan</div>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailWorker;
