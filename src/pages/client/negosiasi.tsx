import React, { useState } from "react";
import Head from "@/components/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const Negosiasi = () => {
  const [showNego, setShowNego] = useState(false);
  return (
    <div>
      <Head>  
          Negotiation Page
      </Head>
      <div className="grid justify-center mx-auto p-4 ">
        <h2 className="text-xl text-center font-semibold mb-4">AC Repair</h2>
        <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-3 w-full md:w-80 xl:w-96  ">
          <p className="col-span-1 font-semibold">Worker Name :</p>
          <p className="col-span-1 "> Arman123</p>
        </div>
        <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-3 ">
          <p className="col-span-1 font-semibold">Start Date :</p>
          <p className="col-span-1 ">12/11/2023</p>
        </div>
        <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-3 ">
          <p className="col-span-1 font-semibold">End Date :</p>
          <p className="col-span-1 ">12/11/2023</p>
        </div>
        <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-3 ">
          <p className="col-span-1 font-semibold">Address :</p>
          <p className="col-span-1">Jl. setia budi</p>
        </div>
        <div className="grid grid-cols-2 justify-center items-center mb-2 border rounded-md p-3 ">
          <p className="col-span-1 font-semibold">Price :</p>
          <p className="col-span-1">Rp. 150.000</p>
        </div>

        <div className="grid grid-cols-1 justify-center items-center mb-2">
          <p className="font-semibold text-center mb-4">Deskripsi :</p>
          <Textarea
            className="border rounded-md p-1  "
            value="Ditunggu ya mas"
            readOnly
          />
        </div>
        <div className="flex items-center justify-between ">
          {showNego ? (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-3">
                <Label>Tawar harga : </Label>
                <Input className=" border border-slate-300 " />
              </div>
              <div className="flex justify-between items-center gap-3">
                <Button className="text-lg" onClick={() => setShowNego(false)}>
                  Batal
                </Button>
                <Button className="text-lg">Tawar</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center gap-4 ">
                <div className="flex gap-2">
                  <Button className="text-lg w-full">Tolak</Button>
                  <Button className="text-lg w-full">Terima</Button>
                </div>
                
              </div>
              <div className="flex justify-between items-end ml-2">
                  <Button className="text-lg w-full" onClick={() => setShowNego(true)}>
                    Tawar harga
                  </Button>
                </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Negosiasi;
