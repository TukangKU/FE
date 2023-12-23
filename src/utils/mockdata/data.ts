import AC from "@/assets/ac.svg";
import Plumber from "@/assets/plumber.svg";
import Cleaning from "@/assets/cleaning.svg";
import Paint from "@/assets/paint.svg";
import Cctv from "@/assets/cctv.svg";

export const Service = [
  {
    image: AC,
    name: "Service AC",
    description:
      "Perbaikan masalah ac tidak dingin, ac berisik, ac berbau tidak sedap, ac bocor, perbaikan exhaust ac yang berkaitan dengan freon, saluran, sensor, termostat, drainase, modul elektronik, remote ac dan lain-lain",
    path: "",
  },
  {
    image: Cleaning,
    name: "Cleaning",
    description:
      "Jasa Cleaning Service, General Cleaning, Jasa bersih-bersih Kost, Apartemen, Kantor dan Lembaga lainnya. Kami juga melayani Cuci Tandon, Deepcleaning dan juga Fogging Desinfektan",
    path: "",
  },
  {
    image: Plumber,
    name: "Plumber",
    description:
      "Mengatasi berbagai masalah pipa, saluran air, dan instalasi sanitasi di rumah atau tempat usaha Anda seperti kebocoran pipa, saluran air yang tersumbat, kerusakan keran, atau instalasi toilet yang baru",
    path: "",
  },
  {
    image: Paint,
    name: "Paint",
    description:
      "Melayani renovasi rumah, dari desain interior hingga eksterior, pengecatan tembok, renovasi dapur, pasang lantai atau keramik, pasang jendela dan pintu, dan pemasangan atau renovasi plafon",
    path: "",
  },
  {
    image: Cctv,
    name: "CCTV",
    description:
      "Melayani Pemasangan CCTV Area Jabodebek, Semua Kota di Pulau Jawa, Semua Kota Pulau Bali, Makassar Sekitarnya, Banjarmasin Sekitarnya, Padang Sekitarnya, Aceh Sekitarnya, Pekanbaru Sekitarnya, dan Palembang Sekitarnya",
    path: "",
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
