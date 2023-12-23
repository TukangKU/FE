import { useState } from "react";
import Head from "@/components/head";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const JobDetail = () => {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      jobTitle: "AC Repair",
      workerName: "Worker 1",
      startDate: "2023-12-01",
      endDate: "2023-12-15",
      price: 1000,
      address: "Worker 1 Address",
      description: "Description for Worker 1",
    },
  ]);
  //Note data dummy buat cek responsive nya ya guys

  return (
    <div>
      <Head>Job Detail</Head>

      <div className="grid justify-center mx-auto p-4  ">
        <form className="flex ">
          {workers.map((worker) => (
            <div key={worker.id} className="border p-4 rounded-md  my-5">
              <h2 className="text-xl text-center font-semibold mb-5">
                {worker.jobTitle}
              </h2>
              <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-3 ">
                <p className="col-span-1">
                  <span className="font-semibold">Name:</span>
                </p>
                <p className="col-span-1">{worker.workerName}</p>
              </div>

              <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-1 ">
                <span className="font-semibold ">Start Date:</span>

                <Input type="date" value={worker.startDate} />
              </div>

              <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-1 ">
                <span className="font-semibold">End Date:</span>
                <Input type="date" value={worker.endDate} />
              </div>

              <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-1 ">
                <span className="font-semibold">Price:</span>
                <Input type="number" value={worker.price} />
              </div>

              <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-1 ">
                <span className="font-semibold">Address:</span>
                <Input type="text" value={worker.address} />
              </div>

              <div className="grid grid-cols-1 justify-center items-center mb-2  ">
                <span className="text-xl font-semibold text-center mb-4">
                  Description:
                </span>
                <Textarea
                  value={worker.description}
                  className="border rounded-md p-1 "
                />
              </div>
            </div>
          ))}
        </form>
        <div className="flex justify-center items-center  gap-3">
          <Button className="text-lg w-full">Add Worker</Button>
          <Button className="text-lg w-full">Request</Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
