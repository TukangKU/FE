import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import React from "react";

const LandingPage = () => {
  return (
    <Layout>
      <div className="lp-worker w-full h-screen font-poppins">
        <div className="flex flex-col gap-7 px-14 py-20">
          <p className="font-semibold text-5xl">Selamat Datang</p>
          <p className="font-semibold text-5xl">
            di Dashboard pekerja <span className="text-tukangku">TukangKU</span>
          </p>
          <p>
            Kami berharap Anda dapat membantu pelanggan kami <br />
            dengan cepat dan efisien.
          </p>
          <div className="flex items-center gap-5 mt-6">
            <Button className="bg-tukangku text-black hover:bg-yellow-400 flex items-center gap-1 text-lg">
              History{" "}
              <img
                src="/src/assets/worker/arrow-right-circle.png"
                alt=""
                className="w-4"
              />
            </Button>
            <Button className="text-lg">Job request</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-10">
        <p className="font-semibold text-2xl text-center">
          Mengapa harus bergabung <br />
          dengan kami
        </p>
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <img src="/src/assets/worker/growth.png" alt="" className="w-56" />
          </div>
          <p className="font-semibold text-xl">Jaringan pelanggan yang luas</p>
          <p className="text-center w-96">
            Kami memiliki basis pelanggan yang besar dan terus berkembang, yang
            akan membantu Anda menjangkau lebih banyak pelanggan dan
            meningkatkan pendapatan Anda.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <div>
            <img
              src="/src/assets/worker/financial-profit (1).png"
              alt=""
              className="w-52"
            />
          </div>
          <p className="font-semibold text-xl">Keuntungan finansial</p>
          <p className="text-center w-96">
            Bergabunglah dengan kami sebagai mitra dan nikmati keuntungan
            finansial yang menarik. Kami menawarkan komisi yang kompetitif dan
            fleksibel, sehingga Anda dapat menghasilkan pendapatan yang lebih
            besar.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
