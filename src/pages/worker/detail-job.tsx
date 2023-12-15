import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const DetailJob = () => {
  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div className="bg-tukangku w-full h-32 absolute bottom-[45.5rem]"></div>
        <div className="z-10 relative flex flex-col justify-center items-center">
          <img
            src="/src/assets/worker/default-avatar.jpg"
            alt=""
            className="w-52 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <div className="bg-slate-200 p-2 rounded-lg flex items-center">
            <p className="">Nama pemesan : Sri wulandari</p>
          </div>
          <div className="bg-slate-200 p-2 rounded-lg flex items-center">
            <p className="">Mulai tanggal : 12/10/2023</p>
          </div>
          <div className="bg-slate-200 p-2 rounded-lg flex items-center">
            <p className="">Selesai tanggal : 12/11/2023</p>
          </div>
          <div className="bg-slate-200 p-2 rounded-lg flex items-center">
            <p className="">Alamat : Jl. setia budi</p>
          </div>
          <div className="bg-slate-200 p-2 rounded-lg">
            <p className="">Deskripsi :</p>
            <Textarea
              className="w-[35rem] h-64"
              value="Ditunggu ya mas"
              readOnly
            />
          </div>
          <div className="flex items-center gap-3">
            <Button className="text-lg">Tolak</Button>
            <Button className="text-lg">Terima</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailJob;
