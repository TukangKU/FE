import { Skeleton } from "./ui/skeleton";

interface Props {
  status: string;
}

const SkeletonNegotiationJob = (props: Props) => {
  const { status } = props;
  return (
    <div className="p-4 bg-backgroundColor">
      <div className="cursor-default lg:w-[40rem] md:w-[40rem] mx-auto p-4 bg-white shadow-md rounded-md flex flex-col gap-4">
        <Skeleton className="bg-slate-400 w-full h-11" />
        {status !== "pending" && (
          <div className="shadow-md bg-backgroundColor p-3 cursor-default">
            <div className="lg:flex md:flex gap-4">
              <div>
                <Skeleton className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto aspect-square object-cover rounded-full bg-slate-400" />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="bg-slate-400 w-20 h-5" />
                <Skeleton className="lg:w-[30rem] md:w-[30rem] w-full bg-slate-400 h-20" />
                <Skeleton className="lg:w-[30rem] md:w-[30rem] w-full bg-slate-400 h-14" />
              </div>
            </div>
          </div>
        )}
        <div className="gap-3 shadow-md p-3 rounded-md bg-backgroundColor">
          <div className="lg:flex md:flex gap-4">
            <div>
              <Skeleton className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto aspect-square object-cover rounded-full bg-slate-400" />
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="bg-slate-400 w-20 h-5" />
              <Skeleton className="lg:w-[30rem] md:w-[30rem] w-full bg-slate-400 h-20" />
              <Skeleton className="lg:w-[30rem] md:w-[30rem] w-full bg-slate-400 h-14" />
            </div>
          </div>
        </div>
        <div className="flex mt-4 gap-3 items-center">
          <Skeleton className="bg-slate-400 w-20 h-10" />
          <Skeleton className="bg-slate-400 w-20 h-10" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonNegotiationJob;
