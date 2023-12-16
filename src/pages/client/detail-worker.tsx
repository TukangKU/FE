import React from "react";
import Head from "@/components/head";
import { Button } from "@/components/ui/button";

interface Worker {
  name: string;
  email: string;
  address: string;
  skills: string[];
  projectHistory: string[];
  profileImage: string;
}

const workerData: Worker = {
  name: "John Doe",
  email: "john@example.com",
  address: "123 Street, City",
  skills: ["Skill A", "Skill B", "Skill C"],
  projectHistory: ["Project 1", "Project 2", "Project 3"],
  profileImage: "https://via.placeholder.com/300",
};

const DetailWorker = () => {
  const { name, email, address, skills, projectHistory, profileImage } =
    workerData;

  return (
    <div>
      <Head>
        <div className="flex justify-center item center text-gray-600 ">
          Detail Worker
        </div>
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 p-8">
        {/* Bagian Kiri: Gambar Worker */}
        <div className="grid justify-center items-end">
          <img
            src={profileImage}
            alt={name}
            className="w-300 h-full rounded-lg"
          />
        </div>

        {/* Bagian Kanan: Data Worker */}
        <div className="grid justify-center  ">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Informasi Worker
          </h1>
          <div className="text-center">
            <h2 className="text-lg ">{name}</h2>
          </div>
          <div className="mt-2 text-center">
            <h2 className="text-lg ">{email}</h2>
          </div>
          <div className="mt-2 text-center">
            <h2 className="text-lg ">{address}</h2>
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Skill Worker</h2>
            <div className="flex flex-wrap">
              {skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-tukangku rounded-full px-3 py-1 mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Project History</h2>
            <ul>
              {projectHistory.map((project, index) => (
                <li key={index} className="mb-2">
                  {project}
                </li>
              ))}
            </ul>
            <div className="flex flex-cols-2 justify-center items-center gap-4">
            <Button className="w-24">Cancel</Button>
            <Button className="w-24">Take Worker</Button>
          </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default DetailWorker;
