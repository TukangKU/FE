import { Skeleton } from "./ui/skeleton";

const SkeletonAvailableWorker = () => {
  return (
    <div className="grid grid-cols-1 gap-3 p-8 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
      {"1234567890".split("").map((i) => (
        <div
          className="bg-white border rounded-lg p-4 w-80 flex flex-col gap-3 shadow-md"
          key={i}
        >
          <Skeleton className="aspect-square object-cover mx-auto rounded-lg w-full bg-slate-400 h-72" />
          <div className="mt-4 flex flex-col gap-3">
            <div className="h-[130px] flex flex-col gap-4">
              <Skeleton className="mx-auto w-28 h-6 bg-slate-400" />
              <Skeleton className="mx-auto w-36 h-4 bg-slate-400" />
              <div className="grid grid-cols-3 mx-auto gap-4">
                <Skeleton className="bg-slate-400 w-16 h-6" />
                <Skeleton className="bg-slate-400 w-16 h-6" />
                <Skeleton className="bg-slate-400 w-16 h-6" />
              </div>
              <div className="grid grid-cols-2 mx-auto gap-4">
                <Skeleton className="bg-slate-400 w-16 h-6" />
                <Skeleton className="bg-slate-400 w-16 h-6" />
              </div>
            </div>
          </div>
          <Skeleton className="mx-auto w-40 h-10 bg-slate-400 mt-4"/>
        </div>
      ))}
    </div>
  );
};

export default SkeletonAvailableWorker;
