import { Skeleton } from "./ui/skeleton";

const SkeletonDetailJob = () => {
  return (
    <div className="p-4 bg-backgroundColor">
      <div className="flex flex-col p-4 gap-5 cursor-default mx-auto shadow-md border rounded-md bg-white lg:w-[37rem] w-fit">
        <Skeleton className="bg-slate-400 rounded-md shadow-md mx-auto w-full h-12" />
        <Skeleton className="rounded-full object-cover top-5 aspect-square lg:w-36 md:w-32 w-28 mx-auto border shadow-lg bg-slate-400" />
        <Skeleton className="flex justify-around items-center border rounded-md shadow-md py-3 lg:w-[25rem] md:w-[25rem] w-full mx-auto bg-slate-400 h-24" />
        <Skeleton className="w-full h-11 bg-slate-400" />
        <Skeleton className="w-full h-11 bg-slate-400" />
        <Skeleton className="w-full h-11 bg-slate-400" />
        <Skeleton className="w-full h-64 bg-slate-400" />
        <Skeleton className="w-full h-11 bg-slate-400" />
        <Skeleton className="w-full h-16 bg-slate-400" />
      </div>
    </div>
  );
};

export default SkeletonDetailJob;
