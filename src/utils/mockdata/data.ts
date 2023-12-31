import AC from "@/assets/ac.svg";
import Plumber from "@/assets/plumber.svg";
import Cleaning from "@/assets/cleaning.svg";
import Paint from "@/assets/paint.svg";
import Cctv from "@/assets/cctv.svg";
import Step_1 from "@/assets/langkah1.svg";
import Step_2 from "@/assets/langkah2.svg";
import Step_3 from "@/assets/langkah3.svg";
import Man from "@/assets/man.svg";
import ConfidetWoman from "@/assets/confident-woman.svg";
import SmilingGirl from "@/assets/smiling-girl.svg";
import Man2 from "@/assets/man2.svg";
import Man3 from "@/assets/man3.svg";
import Woman2 from "@/assets/woman2.svg";

export const Service = [
  {
    image: AC,
    name: "Service AC",
    description:
      "Perbaikan masalah ac tidak dingin, ac berisik, ac berbau tidak sedap, ac bocor, perbaikan exhaust ac yang berkaitan dengan freon, saluran, sensor, termostat, drainase, modul elektronik, remote ac dan lain-lain",
    id: 1,
  },
  {
    image: Cleaning,
    name: "Cleaning",
    description:
      "Jasa Cleaning Service, General Cleaning, Jasa bersih-bersih Kost, Apartemen, Kantor dan Lembaga lainnya. Kami juga melayani Cuci Tandon, Deepcleaning dan juga Fogging Desinfektan",
    id: 2,
  },
  {
    image: Plumber,
    name: "Plumber",
    description:
      "Mengatasi berbagai masalah pipa, saluran air, dan instalasi sanitasi di rumah atau tempat usaha Anda seperti kebocoran pipa, saluran air yang tersumbat, kerusakan keran, atau instalasi toilet yang baru",
    id: 3,
  },
  {
    image: Paint,
    name: "Decoration",
    description:
      "Melayani renovasi rumah, dari desain interior hingga eksterior, pengecatan tembok, renovasi dapur, pasang lantai atau keramik, pasang jendela dan pintu, dan pemasangan atau renovasi plafon",
    id: 4,
  },
  {
    image: Cctv,
    name: "CCTV",
    description:
      "Melayani Pemasangan CCTV Area Jabodebek, Semua Kota di Pulau Jawa, Semua Kota Pulau Bali, Makassar Sekitarnya, Banjarmasin Sekitarnya, Padang Sekitarnya, Aceh Sekitarnya, Pekanbaru Sekitarnya, dan Palembang Sekitarnya",
    id: 5,
  },
];

export const NotificationData = [
  {
    description: "Job Request Accepted",
  },
  {
    description: "Job Request Canceled",
  },
  {
    description: "Your request is in the negotiation stage",
  },
];

export interface SkillOption {
  readonly value: number;
  readonly label: string;
  readonly isFixed?: boolean;
}

export const skillOptions: readonly SkillOption[] = [
  { value: 1, label: "Service AC", isFixed: true },
  { value: 2, label: "Cleaning" },
  { value: 3, label: "Plumber" },
  { value: 4, label: "Decoration" },
  { value: 5, label: "CCTV" },
];

export const JobDetailData = {
  foto: "/src/assets/worker/user (3).png",
  worker_id: 2,
  skill_id: 3,
  category: "Plumber",
  worker_name: "Bedul",
  alamat: "Jl. Orang Ganteng No.1001",
};

export const StepCardData = [
  {
    image: Step_1,
    title: "Lakukan Pemesanan Online",
    description:
      "Pilih kategori layanan yang sesuai dengan masalah Anda, kemudian cari pekerja dan nikmati pengalaman pemesanan yang lancar dengan sistem pemesanan online yang mudah lewat tukangKu.",
  },
  {
    image: Step_2,
    title: "Masukkan Informasi Pemesanan Anda",
    description:
      "Masukkan tanggal atau lama pemesanan yang diinginkan. Isi deskripsi pekerjaan apa saja yang akan dilakukan pekerja, kemudian klik request dan tunggu jawaban dari pekerja. Apabila pekerja menerima deskripsi pekerjaan tersebut Anda bisa melakukan penawaran harga dengan pekerja.",
  },
  {
    image: Step_3,
    title: "Lakukan Pembayaran",
    description:
      "Pilih metode pembayaran yang diinginkan dan lakukan pembayaran. Kemudian Pekerja akan datang ke rumah Anda sesuai dengan waktu yang diberikan.",
  },
];

export const TestimoniData = [
  {
    image: SmilingGirl,
    title: "Ibu Christine",
    description: "“Baik Pengerjaannya, ramah, dan cepat. Overall OK!”",
  },
  {
    image: ConfidetWoman,
    title: "Ibu Lussiana",
    description:
      "“Lebih baik lagi & berharap dapat selalu dikerjakan oleh staff favorit”",
  },
  {
    image: Man,
    title: "Bapak Tommy",
    description:
      "“Overall sudah baik, pengerjaan sangat bagus, teliti, dan sopan”",
  },
  {
    image: Man2,
    title: "Bapak Rizal",
    description: "“Pekerjanya ramah, bersih, cepet lagi, josss”",
  },
  {
    image: Woman2,
    title: "Ibu Sarah",
    description: "“Jasa cleaning servicenya top, langsung kinclong deh rumah”",
  },
  {
    image: Man3,
    title: "Bapak Budi",
    description: "“Pipa udah gak mampet lagi, servicenya good!”",
  },
];

export const JobWorkerID = {
  job_id: 1,
  category: "Service AC",
  worker_name: "bedul",
  client_name: "Peter Jordanson",
  foto: "/src/assets/worker/default-avatar.jpg",
  start_date: "2023-12-15",
  end_date: "2023-12-16",
  alamat: "Jl. Setiabudi",
  harga: 0,
  deskripsi: "Mau pasang AC 2 mas",
  note_negosiasi: "",
  status: "pending",
};
