import { Skeleton } from "./ui/skeleton";

const SkeletonPostJob = () => {
  return (
    <div className="grid justify-center mx-auto p-4">
      <div className="border p-4 rounded-md shadow-md my-5 bg-white">
        <div>
          <div>
            <Skeleton className="bg-slate-400 lg:w-52 md:w-48 w-44 aspect-square rounded-full object-cover mx-auto" />
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 mt-6 gap-32">
            <Skeleton className="bg-slate-400 w-28 h-5" />
            <Skeleton className="bg-slate-400 w-28 h-5" />
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 mt-6 gap-32">
            <Skeleton className="bg-slate-400 w-28 h-5" />
            <Skeleton className="bg-slate-400 w-28 h-5" />
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 mt-6 gap-32">
            <Skeleton className="bg-slate-400 w-28 h-5" />
            <Skeleton className="bg-slate-400 w-36 h-10" />
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 mt-6 gap-32">
            <Skeleton className="bg-slate-400 w-28 h-5" />
            <Skeleton className="bg-slate-400 w-36 h-10" />
          </div>
          <div className="grid grid-cols-2 justify-center items-center mb-2 rounded-md p-1 mt-6 gap-32">
            <Skeleton className="bg-slate-400 w-28 h-5" />
            <Skeleton className="bg-slate-400 w-36 h-10" />
          </div>
          <div className="grid grid-cols-1 justify-center items-center mb-2 gap-3">
            <Skeleton className="bg-slate-400 w-28 h-5"/>
            <Skeleton className="bg-slate-400 w-full h-24"/>
          </div>
        </div>
      </div>
      <Skeleton className="bg-slate-400 w-full h-10"/>
    </div>
  );
};

export default SkeletonPostJob;
