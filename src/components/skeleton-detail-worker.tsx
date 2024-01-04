import { Skeleton } from "./ui/skeleton";

const SkeletonDetailWorker = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 p-8">
        <div className="grid justify-center items-center">
          <Skeleton className="sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 object-cover rounded-lg bg-slate-400" />
        </div>
        <div className="grid justify-center gap-4">
          <Skeleton className="bg-slate-400 w-52 h-9 mx-auto" />
          <div className="mx-auto flex flex-col gap-4">
            <Skeleton className="bg-slate-400 w-44 h-7" />
            <Skeleton className="bg-slate-400 w-44 h-7" />
            <Skeleton className="bg-slate-400 w-44 h-7" />
            <Skeleton className="bg-slate-400 w-44 h-7" />
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <Skeleton className="bg-slate-400 w-44 h-9 mx-auto" />
            <div className="flex flex-wrap justify-center items-center gap-3">
              <Skeleton className="bg-slate-400 w-28 h-8" />
              <Skeleton className="bg-slate-400 w-28 h-8" />
              <Skeleton className="bg-slate-400 w-28 h-8" />
              <Skeleton className="bg-slate-400 w-28 h-8" />
              <Skeleton className="bg-slate-400 w-28 h-8" />
            </div>
          </div>
          <div className="mt-4 mx-auto">
            <Skeleton className="bg-slate-400 w-36 h-7" />
          </div>
          <div className="flex flex-cols-2 justify-center items-center gap-4">
            <Skeleton className="bg-slate-400 w-24 h-11" />
            <Skeleton className="bg-slate-400 w-24 h-11" />
          </div>
        </div>
      </div>
      <Skeleton className="w-4/5 bg-slate-400 h-14 mx-auto" />
      <Skeleton className="w-4/5 bg-slate-400 h-14 mx-auto" />
      <Skeleton className="w-4/5 bg-slate-400 h-14 mx-auto" />
      <Skeleton className="w-4/5 bg-slate-400 h-14 mx-auto" />
      <Skeleton className="w-4/5 bg-slate-400 h-14 mx-auto" />
      <Skeleton className="w-4/5 bg-slate-400 h-14 mx-auto" />
    </div>
  );
};

export default SkeletonDetailWorker;
