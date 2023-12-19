import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle, CheckCircle } from "lucide-react";
import TwoWorker from "@/assets/two-worker.svg";
import Sign from "@/assets/tanda-tangan.svg";
import {
  BenefitCard,
  CategoryCard,
  StepCard,
  TestimoniCard,
} from "@/components/category-card";
import Step_1 from "@/assets/langkah1.svg";
import Step_2 from "@/assets/langkah2.svg";
import Step_3 from "@/assets/langkah3.svg";
import Man from "@/assets/man.svg";
import ConfidetWoman from "@/assets/confident-woman.svg";
import SmilingGirl from "@/assets/smiling-girl.svg";
import Finance from "@/assets/finance.svg";
import Network from "@/assets/network.svg";
import { Service } from "@/utils/mockdata/data";

function App() {
  return (
    <Layout>
      <div className="relative">
        <div className="absolute hidden lg:block w-[42%] h-[180px] xl:h-[200px] bg-tukangku rounded-xl xl:ms-[850px] lg:ms-[580px] lg:mt-[500px] xl:mt-[625px] p-6 md:p-20 xl:p-8 z-40">
          <div className="flex flex-col gap-3 text-md xl:text-lg">
            <div className="flex flex-row text-white gap-3">
              <CheckCircle />
              <p>Pekerja profesional dan berpengalaman</p>
            </div>
            <div className="flex flex-row text-white gap-3">
              <CheckCircle />
              <p>Kualitas hasil 100% terjamin</p>
            </div>
            <div className="flex flex-row text-white gap-3">
              <CheckCircle />
              <p>Skill pekerja yang tak tertandingi dan terpercaya</p>
            </div>
          </div>
        </div>
        <div className="relative bg-landing-page bg-cover bg-center w-full lg:min-h-screen">
          <div className="flex flex-col gap-5 xl:gap-8 container p-6 md:py-20 lg:py-0 lg:pt-[100px] xl:pt-[200px]">
            <h1 className="text-2xl lg:text-5xl xl:text-6xl font-semibold ">
              Perbaikan Mudah <br /> Hanya di{" "}
              <span className="text-tukangku">TukangKU</span>
            </h1>
            <p className="w-[80%] lg:w-[40%] text-sm xl:text-lg">
              Kami menyediakan berbagai layanan mulai dari cleaning hingga
              pemasangan CCTV, untuk memudahkan perbaikan rumah Anda
            </p>
            <div className="flex flex-row text-sm lg:text-lg gap-3">
              <Button className="bg-tukangku flex flex-row gap-1">
                Layanan Kami <ArrowRightCircle size={20} />
              </Button>
              <Button>Cara Pemesanan</Button>
            </div>
          </div>
        </div>

        <div className="container lg:h-[528px] xl:h-[615px] ">
          <div className="hidden lg:block">
            <div className="flex flex-row gap-2 pt-5">
              <div className="flex flex-row gap-1">
                <h1 className="text-4xl text-tukangku font-semibold">10+</h1>
                <p className="text-sm font-medium">
                  Tahun <br />
                  Pengalaman
                </p>
              </div>
              <div className="flex flex-row gap-1">
                <h1 className="text-4xl text-tukangku font-semibold">378+</h1>
                <p className="text-sm font-medium">
                  Job Request <br />
                  Selesai
                </p>
              </div>
              <div className="flex flex-row gap-1">
                <h1 className="text-4xl text-tukangku font-semibold">69+</h1>
                <p className="text-sm font-medium">
                  Memenangkan <br />
                  Global Award
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3 lg:gap-20 pt-10 bottom-0">
            <img
              src={TwoWorker}
              alt="two worker"
              className="w-50 md:w-[250px] lg:w-80 xl:w-96 order-last md:order-first"
            />
            <div className="flex flex-col gap-3 xl:gap-8">
              <h1 className="text-2xl xl:text-6xl lg:text-5xl font-semibold">
                <span className="text-tukangku">10 Tahun</span> <br />
                Pengalaman
              </h1>
              <p className="text-xs lg:text-md xl:text-lg">
                Kami memiliki pekerja berpengalaman yang telah berkecimpung di
                pekerjaan ini ini selama lebih dari 10 tahun. Pekerja kami
                memiliki segudang pengetahuan dan keterampilan yang mereka
                peroleh selama bertahun-tahun, menjadikan mereka ahli di
                bidangnya. Dengan pengalaman 10 tahun, pekerja kami memiliki
                pemahaman mendalam tentang standar kualitas dan peraturan dalam
                pekerjaan ini. Kami memastikan bahwa hasil akhir pengerjaan akan
                memenuhi atau melampaui harapan klien kami.
              </p>
              <img src={Sign} alt="Tanda Tangan" className="w-20 lg:w-40" />
              <p className="text-sm font-semibold">
                M. Hafidz Hidayat - Founder
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-tukangku w-full min-h-screen pt-6">
        <div className="container flex flex-col gap-5 lg:gap-10 justify-center">
          <h1 className="text-2xl lg:text-5xl xl:text-6xl font-semibold">
            Layanan Kami
          </h1>
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-3">
            {Service.slice(0, -1).map((item) => {
              return (
                <CategoryCard
                  image={item.image}
                  title={item.name}
                  detail={item.description}
                />
              );
            })}
          </div>
          <div className="flex gap-2 pb-3 justify-end items-end font-semibold cursor-pointer hover:text-white">
            <p>Layanan Lainnya</p>
            <ArrowRightCircle />
          </div>
        </div>
      </div>
      <div className="min-h-screen container flex flex-col gap-10 p-6 justify-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl lg:text-5xl xl:text-6xl text-tukangku font-medium">
            Cara Pemesanan
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <StepCard
            image={Step_1}
            title={"Lakukan Pemesanan Online"}
            detail={
              "Pilih kategori layanan yang sesuai dengan masalah Anda, kemudian cari pekerja dan nikmati pengalaman pemesanan yang lancar dengan sistem pemesanan online yang mudah lewat tukangKu."
            }></StepCard>
          <StepCard
            image={Step_2}
            title={"Masukkan Informasi Pemesanan Anda"}
            detail={
              "Masukkan tanggal atau lama pemesanan yang diinginkan. Kami akan memilihkan pekerja yang terlatih dan sesuai dengan kualifikasi di wilayah terdekat Anda."
            }></StepCard>
          <StepCard
            image={Step_3}
            title={"Lakukan Pembayaran"}
            detail={
              "Pilih metode pembayaran yang diinginkan dan lakukan pembayaran. Kemudian Pekerja akan datang ke rumah Anda sesuai dengan waktu yang diberikan."
            }></StepCard>
        </div>
      </div>
      <div className="container p-6 flex flex-col gap-10 justify-center h-auto">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-2xl lg:text-5xl xl:text-6xl text-tukangku font-medium">
            Testimoni
          </h1>
          <p className="text-lg lg:text-xl font-medium">
            Apa yang dikatakan Client kami
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <TestimoniCard
            image={SmilingGirl}
            title={"Ibu Christine"}
            detail={"“Baik Pengerjaannya. Overall OK!”"}></TestimoniCard>
          <TestimoniCard
            image={ConfidetWoman}
            title={"Ibu Lussiana"}
            detail={
              "“Lebih baik lagi & berharap dapat selalu dikerjakan oleh staff favorit”"
            }></TestimoniCard>
          <TestimoniCard
            image={Man}
            title={"Bapak Tommy"}
            detail={
              "“Overall sudah baik, pengerjaan sangat bagus, teliti, dan sopan”"
            }></TestimoniCard>
        </div>
      </div>
      <div className="bg-landing-page-2 bg-cover h-[1000px] md:h-[700px] lg:h-[1000px]">
        <div className="flex flex-col md:gap-20 justify-center container p-6">
          <div className="flex flex-col items-center gap-3 pt-5 md:pt-20">
            <h1 className="text-2xl lg:text-5xl xl:text-6xl font-medium">
              Benefit Menjadi Pekerja Kami
            </h1>
            <p className="lg:text-lg text-md">
              Bergabung sekarang dan dapatkan benefitnya
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-3">
            <BenefitCard
              image={Finance}
              title={"Keuntungan Finansial"}
              detail={
                "Bergabunglah dengan kami sebagai mitra dan nikmati keuntungan finansial yang menarik. Kami menawarkan komisi yang kompetitif dan fleksibel, sehingga Anda dapat menghasilkan pendapatan yang lebih besar."
              }></BenefitCard>
            <BenefitCard
              image={Network}
              title={"Jaringan pelanggan yang luas"}
              detail={
                "Kami memiliki basis pelanggan yang besar dan terus berkembang, yang akan membantu Anda menjangkau lebih banyak pelanggan dan meningkatkan pendapatan Anda."
              }></BenefitCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
