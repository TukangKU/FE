import React from "react";
import Layout from "@/components/layout";
import { Textarea } from "@/components/ui/textarea";

const DetailHistory = () => {
  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div className="bg-tukangku w-full h-32 absolute bottom-[50rem]"></div>
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
          <div className="bg-slate-200 p-2 rounded-lg flex items-center">
            <p className="">Total pembayaran : Rp. 100.000</p>
          </div>
          <div className="bg-slate-200 p-2 rounded-lg">
            <p className="">Deskripsi :</p>
            <Textarea
              className="w-[35rem] h-64"
              value="Ditunggu ya mas"
              readOnly
            />
          </div>
          <div className="bg-tukangku py-2 rounded-lg">
            <p className="text-center text-4xl font-bold">SELESAI</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailHistory;