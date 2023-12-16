import React from 'react';
import { Button } from './ui/button';

interface Props {
  data: {
    cover_image: string;
    name: string;
    address: string;
    total_projects: number;
    skills: string[]; // Menambahkan properti skills
  };
}

const CardWorker = (props: Props) => {
  const { data } = props;
  const { cover_image, name, address, total_projects, skills } = data;

  return (
    <div className="border rounded-lg p-4  w-80 ">
      <img
        className="w-200 h-300 object-cover mx-auto rounded-lg"
        src={cover_image}
        alt={name}
      />
      <div className="mt-4">
        <p className="font-bold text-lg tracking-wide text-center">{name}</p>
        <p className="text-muted-foreground text-sm text-center">{address}</p>
        <p className="text-muted-foreground text-sm text-center">
          Total Projects: {total_projects}
        </p>
        <div className="text-muted-foreground text-sm text-center mt-2">
          {/* Menampilkan daftar skill */}
          {skills.map((skill, index) => (
            <span key={index} className="inline-block bg-tukangku rounded-full px-2 py-1 m-1">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex justify-center items-center my-3 ">
        <Button className="w-40 rounded-md"> See Detail</Button>
      </div>
      </div>
    </div>
  );
};

export default CardWorker;
