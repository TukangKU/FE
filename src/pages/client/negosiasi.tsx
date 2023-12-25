import Head from "@/components/head";

import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Negosiasi = () => {
  return (
    <div>
      <Head>Job Detail</Head>
      <div className="flex flex-col justify-center items-center py-20">
        <img
          src="/src/assets/worker/user (3).png"
          alt="{worker.nama}"
          className="lg:w-52 md:w-48 w-44 aspect-square rounded-full object-cover"
        />

        <div className="border p-4 rounded-md  my-5 w-[50%]">
          <div className="grid grid-cols-2 justify-center items-center mb-2  ">
            <span className="font-semibold ">Category:</span>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 ">
            <span className="font-semibold ">Name:</span>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2  ">
            <span className="font-semibold ">Start Date:</span>
          </div>

          <div className="grid grid-cols-2 justify-center items-center mb-2  ">
            <span className="font-semibold">End Date:</span>
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 ">
            <span className="font-semibold">Address:</span>
          </div>

          <div className="grid grid-cols-1 justify-center items-center mb-2  ">
            <span className="text-xl font-semibold text-center mb-4 flex gap-1">
              Description
            </span>
          </div>
          <div className="grid grid-cols-1 justify-center items-center mb-2  ">
            <span className="text-xl font-semibold text-center mb-4 flex gap-1">
              Note Negosiasi
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center  gap-3">
          <Button type="submit" className="text-lg w-full">
            Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Negosiasi;
