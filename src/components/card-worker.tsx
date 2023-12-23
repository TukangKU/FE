import React from "react";
import { Button } from "./ui/button";
import { WorkerAvailables } from "@/utils/apis/client/types";


const CardWorker: React.FC<{ data: WorkerAvailables; onClick: () => void }> = ({ data, onClick }) => {
  return (
    <div className="border rounded-lg p-4 w-80">
      <img
        className="w-200 h-300 object-cover mx-auto rounded-lg"
        src={data.foto}
        alt={data.username}
      />
      <div className="mt-4">
        <p className="font-bold text-lg tracking-wide text-center">
          {data.username}
        </p>
        <p className="text-muted-foreground text-sm text-center">
          {data.alamat}
        </p>
        <div className="text-muted-foreground text-sm text-center mt-2">
        {data.skill && Array.isArray(data.skill) && data.skill.length > 0 ? ( 
            data.skill.map((singleSkill, index) => (
              <span
                key={index}
                className="inline-block bg-tukangku rounded-full px-2 py-1 m-1"
              >
                {singleSkill.skill}
              </span>
            ))
          ) : (
            <span>No skills available</span>
          )}
        </div>
        <div className="flex justify-center items-center my-3 ">
          <Button className="w-40 rounded-md" onClick={onClick}>
            See Detail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardWorker;
