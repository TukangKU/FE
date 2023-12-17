import Logo from "@/assets/tukangku.svg";
import Linkedin from "@/assets/linkedin.svg";
import Medium from "@/assets/medium.svg";
import Instagram from "@/assets/instagram.svg";
import Twitter from "@/assets/twitter.svg";
import Facebook from "@/assets/facebook.svg";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="w-full md:min-h-[20vh] bg-white">
      <div className="container p-3 hidden md:block">
        <img src={Logo} alt="Logo TukangKU" className="w-24" />
      </div>
      <div className="hidden md:block">
        <div className="container flex flex-row gap-5 justify-between p-5 ">
          <div className="flex flex-col basis-[450px] gap-5">
            <h1 className="font-semibold text-xl">About Us</h1>
            <p>
              TukangKU adalah platform e-commerce yang mengkhususkan diri dalam
              pemesanan pekerja untuk berbagai keperluan. Dengan tim
              profesional, kami berkomitmen untuk memberikan layanan terbaik
              kepada pelanggan .
            </p>
            <div className="flex gap-2 w-14">
              <img src={Linkedin} alt="Linkedin" />
              <img src={Medium} alt="Medium" />
              <img src={Instagram} alt="Instagram" />
              <img src={Twitter} alt="Twitter" />
              <img src={Facebook} alt="Facebook" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex flex-col gap-5 ">
              <h1 className="font-semibold text-xl">Office</h1>
              <p>
                18 Office Park Building 21th Floor Unit C. <br /> Jl. TB
                Simatupang Kav. 18, Jakarta Selatan ,12520
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex flex-col gap-5 ">
              <h1 className="font-semibold text-xl">Contact</h1>
              <p>
                Email : contact@tukangku.co <br /> Phone : (+62) 877-2469-7246
              </p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="text-slate-500 text-sm text-center container p-6 md:p-3">
        <p>
          Copyright &copy;{new Date().getFullYear()} TukangKU. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
