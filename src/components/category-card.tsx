interface CardProps {
  image: string;
  title: string;
  detail: string;
}

export const CategoryCard = (props: CardProps) => {
  const { image, title, detail } = props;
  return (
    <div className="scale-90 hover:scale-100 ease-in duration-500 rounded-xl shadow-lg bg-white container w-full md:w-[45%] lg:w-[25%] p-6 cursor-pointer">
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
    <div className="rounded-xl container w-full md:w-[80%] lg:w-[35%] bg-tukangku text-white p-6 flex flex-col items-center justify-center text-center gap-5">
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
