import { useRef, useState } from "react";
import Head from "@/components/head";
import Footer from "@/components/footer";
import { Worker } from "@/utils/apis/client/types";
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
import { useLocation, useNavigate } from "react-router-dom";

const DetailWorker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const WorkerDetail: Worker | undefined = location.state?.WorkerDetail?.data;

  const [showTable, setShowTable] = useState(false);
  const rows = [
    { id: 1, name: "Project A", price: "$100" },
    { id: 2, name: "Project B", price: "$150" },
    { id: 3, name: "Project C", price: "$120" },
    { id: 4, name: "Project D", price: "$120" },
    { id: 5, name: "Project E", price: "$120" },
  ];
  const tableRef = useRef<HTMLDivElement>(null);
  const scrollToShowTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <div className="flex justify-center item center text-gray-600 ">
          Detail Worker
        </div>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 p-8">
        <div className="grid justify-center items-center">
          {WorkerDetail && (
            <img
              src={WorkerDetail.foto}
              alt={WorkerDetail.username}
              className="sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-cover rounded-lg"
            />
          )}
        </div>
        <div className="grid justify-center">
          {WorkerDetail && (
            <>
              <h1 className="text-2xl font-bold mb-4 text-center">
                Informasi Worker
              </h1>
              <div className="text-center">
                <h2 className="text-lg ">{WorkerDetail.username}</h2>
              </div>
              <div className="mt-2 text-center">
                <h2 className="text-lg ">{WorkerDetail.email}</h2>
              </div>
              <div className="mt-2 text-center">
                <h2 className="text-lg ">{WorkerDetail.nohp}</h2>
              </div>
              <div className="mt-2 text-center">
                <h2 className="text-lg ">{WorkerDetail.alamat}</h2>
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Skill Worker</h2>
                <div className="flex flex-wrap justify-center items-center text-muted-foreground">
                  {WorkerDetail.skill.slice(0, 3).map((singleSkill, index) => (
                    <span
                      key={index}
                      className="bg-tukangku rounded-full px-3 py-1 mr-2 mb-2"
                    >
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
                  }}
                >
                  Total Project {1}
                </h2>
                <div className="flex flex-cols-2 justify-center items-center gap-4">
                  <Button className="w-24" onClick={goBack}>
                    Cancel
                  </Button>
                  <Button className="w-24">Take Worker</Button>
                </div>
              </div>
            </>
          )}
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
                {rows.map((row) => (
                  <TableRow key={row.id} style={{ backgroundColor: "#ffffff" }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.price}</TableCell>
                  </TableRow>
                ))}
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
