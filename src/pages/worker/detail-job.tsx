import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const DetailJob = () => {
  const [showNego, setShowNego] = useState(false);
  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div
          className={` bg-tukangku w-full h-32 absolute ${showNego ? "bottom-[54rem]" : "bottom-[48.5rem]"}`}
        ></div>
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
            <p className="">Harga : Rp. 150.000</p>
          </div>
          <div className="bg-slate-200 p-2 rounded-lg">
            <p className="">Deskripsi :</p>
            <Textarea
              className="w-[35rem] h-64"
              value="Ditunggu ya mas"
              readOnly
            />
          </div>
          <div className="flex items-center justify-between">
            {showNego ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <Label>Tawar harga : </Label>
                  <Input className="w-[35rem] border border-slate-300" />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    className="text-lg"
                    onClick={() => setShowNego(false)}
                  >
                    Batal
                  </Button>
                  <Button className="text-lg">Tawar</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Button className="text-lg">Tolak</Button>
                  <Button className="text-lg">Terima</Button>
                </div>
                <div>
                  <Button onClick={() => setShowNego(true)}>Tawar harga</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailJob;
