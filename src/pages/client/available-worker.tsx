import React from "react";
import Head from "@/components/head";
import Cardworker from "@/components/card-worker";
import { Button } from "@/components/ui/button";

const AvailableWorker = () => {
  const workers = [
    // Array yang berisi informasi pekerja
    {
      id: 1,
      cover_image: "https://via.placeholder.com/200",
      name: "John Doe",
      address: "123 Main St, City",
      total_projects: 5,
      skills: ["Skill 1", "Skill 2", "Skill 3"],
    },
    {
      id: 2,
      cover_image: "https://via.placeholder.com/200",
      name: "Jane Smith",
      address: "456 Park Ave, Town",
      total_projects: 8,
      skills: ["Skill 4", "Skill 5", "Skill 6"],
    },
    {
      id: 3,
      cover_image: "https://via.placeholder.com/200",
      name: "Alice Johnson",
      address: "789 Elm St, Village",
      total_projects: 3,
      skills: ["Skill 7", "Skill 8", "Skill 9"],
    },
    {
      id: 3,
      cover_image: "https://via.placeholder.com/200",
      name: "Alice Johnson",
      address: "789 Elm St, Village",
      total_projects: 3,
      skills: ["Skill 7", "Skill 8", "Skill 9"],
    },
    {
      id: 3,
      cover_image: "https://via.placeholder.com/200",
      name: "Alice Johnson",
      address: "789 Elm St, Village",
      total_projects: 3,
      skills: ["Skill 7", "Skill 8", "Skill 9"],
    },
    {
      id: 3,
      cover_image: "https://via.placeholder.com/200",
      name: "Alice Johnson",
      address: "789 Elm St, Village",
      total_projects: 3,
      skills: ["Skill 7", "Skill 8", "Skill 9"],
    },
    {
      id: 3,
      cover_image: "https://via.placeholder.com/200",
      name: "Alice Johnson",
      address: "789 Elm St, Village",
      total_projects: 3,
      skills: ["Skill 7", "Skill 8", "Skill 9"],
    },
    {
      id: 3,
      cover_image: "https://via.placeholder.com/200",
      name: "Alice Johnson",
      address: "789 Elm St, Village",
      total_projects: 3,
      skills: ["Skill 7", "Skill 8", "Skill 9"],
    },
    {
      id: 3,
      cover_image: "https://via.placeholder.com/200",
      name: "Alice Johnson",
      address: "789 Elm St, Village",
      total_projects: 3,
      skills: ["Skill 7", "Skill 8", "Skill 9"],
    },


  ];
  return (
    <div className="">
      <Head>  
          Available Worker
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center p-8">
        {workers.map((worker) => (
          <Cardworker key={worker.id} data={worker} />
        ))}
      </div>
      <div className="flex justify-between my-3 mx-20">
        <Button className="w-20">Prev</Button>
        <Button className="w-20">Next</Button>
      </div>
    </div>
  );
};

export default AvailableWorker;
