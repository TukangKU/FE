import Checklist from "@/assets/checklist.svg";
import { Button } from "./ui/button";

interface CardProps {
  image: string;
  title: string;
  detail: string;
  onClick?: () => void;
}

interface Props {
  title: string;
}

export const CategoryCard = (props: CardProps) => {
  const { image, title, detail, onClick } = props;
  return (
    <div
      className="scale-90 border hover:scale-100 ease-in duration-500 rounded-xl shadow-lg bg-white hover:text-white hover:bg-tukangku container w-full md:w-[250px] lg:w-[340px] p-6 cursor-pointer"
      onClick={onClick}>
      <div className=" grid grid-cols-1 lg:gap-3 xl:gap-5">
        <div className="relative h-[100px] xl:h-[150px]">
          <div className="absolute bg-white lg:w-28 xl:w-40 aspect-square rounded-full flex justify-center items-center">
            <img src={image} alt={title} className="lg:w-20 xl:w-32" />
          </div>
        </div>
        <div className="flex flex-col gap-3 h-[230px]">
          <h1 className="font-bold text-xl lg:text-2xl xl:text-4xl">{title}</h1>
          <p className="text-sm">{detail}</p>
        </div>
      </div>
      <div className="flex justify-end items-end text-slate-500 font-semibold">
        Lihat Pekerja
      </div>
    </div>
  );
};

export const StepCard = (props: CardProps) => {
  const { image, title, detail } = props;
  return (
    <div className="rounded-xl container w-full lg:w-[35%] p-6 flex flex-col items-center justify-center text-center gap-5">
      <img src={image} alt={title} className="w-56 h-56" />

      <h1 className="font-semibold text-2xl">{title}</h1>
      <p>{detail}</p>
    </div>
  );
};

export const TestimoniCard = (props: CardProps) => {
  const { image, title, detail } = props;
  return (
    <div className="rounded-xl container w-full md:w-[350px] lg:w-[400px] h-[300px] bg-tukangku text-white p-6 flex flex-col items-center justify-center text-center gap-5">
      <img src={image} alt={title} className="w-28" />
      <h1 className="font-semibold text-xl">{title}</h1>
      <p className="text-lg">{detail}</p>
    </div>
  );
};

export const BenefitCard = (props: CardProps) => {
  const { image, title, detail } = props;
  return (
    <div className="rounded-xl container w-full md:w-[45%] bg-tukangku text-white p-3 lg:p-6 flex flex-col items-center justify-center text-center gap-5">
      <img src={image} alt={title} className="w-44 lg:w-80" />
      <h1 className="font-semibold text-lg lg:text-xl">{title}</h1>
      <p className="text-sm lg:text-lg">{detail}</p>
    </div>
  );
};

export const SkillCard = (props: Props) => {
  const { title } = props;
  return (
    <div className="rounded-lg w-full flex flex-row gap-5 justify-between border border-slate-300 p-3">
      <h1 className="mt-2">{title}</h1>
      <img src={Checklist} alt="Checklist" className="w-10" />
    </div>
  );
};

interface WorkerProps {
  image: string
  name: string
  address: string
  skill: {
    skill_id: number;
    skill: string;
  }[];
  onClick: () => void;
}

export const WorkerAvailableCard = (props: WorkerProps) => {
  const { image, name, address, skill, onClick } = props;
  return (
    <div className="bg-white border rounded-lg p-4 w-80 flex flex-col gap-3 shadow-md">
      <img
        className="aspect-square object-cover mx-auto rounded-lg"
        src={image}
        alt={name}
      />
      <div className="mt-4 flex flex-col gap-3">
        <div className="h-[130px]">
          <p className="font-bold text-lg tracking-wide text-center">
            {name}
          </p>
          <p className=" text-sm text-center">
            {address}
          </p>
          <div className=" text-sm text-center">
            {skill &&
            Array.isArray(skill) &&
            skill.length > 0 ? (
             skill.map((singleSkill, index) => (
                <span
                  key={index}
                  className="inline-block bg-tukangku rounded-full px-2 py-1 m-1">
                  {singleSkill.skill}
                </span>
              ))
            ) : (
              <span>Belum Mempunyai skill</span>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button className="w-40 rounded-md" onClick={onClick}>
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
};
