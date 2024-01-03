import { Skeleton } from "./ui/skeleton";

const SkeletonRequestJobs = () => {
  return (
    <div className="lg:block md:block grid grid-cols-2 gap-4 lg:p-0 md:p-0 p-4">
      {"1234567890".split("").map((i) => (
        <div
          className="lg:flex md:flex lg:justify-between md:justify-between w-fit mx-auto mb-4 p-4 lg:w-[50rem] md:w-[40rem] rounded-lg shadow-md bg-white"
          key={i}
        >
          <div className="lg:flex md:flex items-center gap-3">
            <Skeleton className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto aspect-square object-cover rounded-full bg-slate-400" />
            <div className="flex flex-col lg:gap-2 md:gap-0 gap-5 lg:mt-0 md:mt-0 mt-3 lg:items-start md:items-start items-center">
              <Skeleton className="h-6 w-36 bg-slate-400" />
              <Skeleton className="h-5 w-28 bg-slate-400" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 md:ms-0 mx-auto lg:mt-0 md:mt-0 mt-3 bg-slate-400 w-44" />
            <div className="lg:mt-0 md:mt-0 mt-4 lg:ms-auto md:ms-auto lg:flex md:flex items-center gap-2">
              <Skeleton className="h-10 md:ms-0 mx-auto bg-slate-400 w-20" />
              <Skeleton className="w-9 mx-auto h-10 lg:block md:block hidden bg-slate-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonRequestJobs;
