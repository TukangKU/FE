import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useToken } from "@/utils/contexts/token";
import Email from "@/assets/email.svg";
import Phone from "@/assets/phone.svg";
import Location from "@/assets/location.svg";
import { SkillCard } from "@/components/category-card";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { worker, client, role } = useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col gap-5 container p-6">
        <div className="shadow-md relative h-[380px] md:h-[400px] w-full rounded-lg bg-white">
          <img
            src={role === "worker" ? worker.foto : client.foto}
            alt={role === "worker" ? worker.nama : client.nama}
            className="absolute border-8 md:border-4 border-white mt-[100px] ms-[85px] md:mt-[190px] md:ms-[30px] w-40 md:w-40 aspect-square rounded-full object-cover"
          />
          <div className="bg-profile bg-cover w-full h-[180px] md:h-[280px] md:rounded-lg"></div>

          <div className="flex flex-col md:flex-row gap-2 md:justify-between p-3 md:p-6">
            <div className="md:flex md:flex-row">
              <div className="h-[70px] md:w-[170px] md:h-0"></div>
              <div className="flex flex-col items-center md:items-start">
                <h1 className="font-semibold text-lg">
                  {role === "worker" ? worker.nama : client.nama}
                </h1>
                <p>@{role === "worker" ? worker.username : client.username}</p>
              </div>
            </div>
            <Button
              onClick={() => {
                {
                  role === "worker"
                    ? navigate("/profile/worker/edit")
                    : navigate("/profile/client/edit");
                }
              }}>
              Edit Profile
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 w-full">
          {role === "worker" ? (
            <div className="w-full md:w-[30%] h-auto shadow-md rounded-lg flex flex-col gap-5 p-6 bg-white">
              <h1 className="font-semibold">Skill</h1>
              {worker.skill === null ? (
                <>
                  <p>Anda Belum memilih skill</p>
                </>
              ) : (
                worker.skill?.map((item) => {
                  return <SkillCard key={item.skill_id} title={item.skill} />;
                })
              )}
            </div>
          ) : (
            <></>
          )}
          <div
            className={
              role === worker
                ? "w-full border md:w-[70%] shadow-md rounded-lg flex flex-col gap-5 p-6 bg-white"
                : "w-full border shadow-md rounded-lg flex flex-col gap-5 p-6 bg-white"
            }>
            <h1 className="font-semibold">Informasi Detail</h1>
            <div className="flex gap-5">
              <img src={Email} alt="Email" className="w-12" />
              <div>
                <p className="text-slate-500">Email</p>
                <h1>{role === "worker" ? worker.email : client.email}</h1>
              </div>
            </div>
            <div className="flex gap-5">
              <img src={Phone} alt="Phone" className="w-12" />
              <div>
                <p className="text-slate-500">Nomer Handphone</p>
                <h1>{role === "worker" ? worker.nohp : client.nohp}</h1>
              </div>
            </div>
            <div className="flex gap-5">
              <img src={Location} alt="Lokasi" className="w-12" />
              <div>
                <p className="text-slate-500">Alamat</p>
                <h1>{role === "worker" ? worker.alamat : client.alamat}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
