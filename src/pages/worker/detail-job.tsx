import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const DetailJob = () => {
  const [showNego, setShowNego] = useState(false);
  return (
    <Layout>
      <div className="flex justify-center flex-col items-center relative py-4">
        <div
          className={` bg-tukangku w-full h-32 absolute ${
            showNego
              ? "lg:bottom-[48rem] md:bottom-[47rem] bottom-[44rem]"
              : "lg:bottom-[43rem] md:bottom-[42rem] bottom-[42rem]"
          }`}
        ></div>
        <div className="z-10 relative flex flex-col justify-center items-center">
          <img
            src="/src/assets/worker/default-avatar.jpg"
            alt=""
            className="lg:w-52 md:w-48 w-40 rounded-full"
          />
        </div>
        <div className="flex flex-col gap-4 mt-10 border border-slate-500 p-4 rounded-lg">
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Nama pemesan :</p>
            <p className="lg:text-base md:text-base text-sm lg:ms-0 md:ms-0 ms-10">
              Sri wulandari
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Mulai tanggal :</p>
            <p className="lg:text-base md:text-base text-sm lg:ms-0 md:ms-0 ms-10">
              12/10/2023
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">
              Selesai tanggal :
            </p>
            <p className="lg:text-base md:text-base text-sm lg:ms-0 md:ms-0 ms-10">
              12/10/2023
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p className="lg:text-base md:text-base text-sm">Alamat :</p>
            <p className="lg:text-base md:text-base text-sm lg:ms-0 md:ms-0 ms-10">
              Jl. Setia budi
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="lg:text-base md:text-base text-sm">Deskripsi :</p>
            <Textarea
              className="lg:w-[35rem] md:w-[30rem] h-64 lg:text-base md:text-base text-sm"
              value="Ditunggu ya mas"
              readOnly
            />
          </div>
          <div className="lg:flex  md:flex items-center justify-between">
            {showNego ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <Label>Tawar harga : </Label>
                  <Input className="lg:w-[35rem] md:w-[30rem] border border-slate-300" />
                </div>
                <div className="flex items-center gap-3">
                  <Button className="" onClick={() => setShowNego(false)}>
                    Batal
                  </Button>
                  <Button className="">Tawar</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <Button className="">Tolak</Button>
                  <Button className="">Terima</Button>
                </div>
                <div>
                  <Button
                    onClick={() => setShowNego(true)}
                    className="bg-tukangku text-black hover:bg-yellow-300 lg:mt-0 md:mt-0 mt-4"
                  >
                    Tawar harga
                  </Button>
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
