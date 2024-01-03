import { JobWorker } from "@/utils/apis/worker";
import { Link } from "react-router-dom";
import rightArrow from '@/assets/worker/right-arrow (2).png'

interface Props {
  data: JobWorker;
  role: string;
}

const JobsCard = (props: Props) => {
  const { data, role } = props;

  const date1 = new Date(data.start_date);
  const date2 = new Date(data.end_date);
  const startDate = date1.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const endDate = date2.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link to={`/job/detail/${data.job_id}`}>
      <div
        className="lg:flex md:flex lg:justify-between md:justify-between w-fit  mx-auto mb-4 p-4 lg:w-[50rem] md:w-[40rem] rounded-lg shadow-md bg-white hover:bg-slate-200"
        key={data.job_id}
      >
        <div className="lg:flex md:flex items-center gap-3">
          <img
            src={data.foto}
            alt=""
            className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto aspect-square object-cover rounded-full"
          />
          <div className="flex flex-col lg:gap-0 md:gap-0 gap-2 lg:mt-0 md:mt-0 mt-3 lg:items-start md:items-start items-center">
            <p className="font-semibold lg:text-lg md:text-base text-sm lg:text-start md:text-start text-center">
              {role === "worker"
                ? `${data.client_name}`
                : `${data.worker_name}`}
            </p>
            <p className="lg:text-lg md:text-base text-sm">
              {data.category}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm italic lg:text-start md:text-start text-center lg:mt-0 md:mt-0 mt-3">
            {startDate} - {endDate}
          </p>
          <div className="lg:mt-0 md:mt-0 mt-4 lg:ms-auto md:ms-auto lg:flex md:flex items-center gap-2">
            <div
              className={`${data.status === "pending" && "bg-tukangku"} ${
                data.status === "accepted" && "bg-green-600"
              } ${data.status === "rejected" && "bg-red-600"} ${
                data.status === "finished" && "bg-blue-600"
              } ${data.status === "negotiation_to_client" && "bg-slate-500"} ${
                data.status === "negotiation_to_worker" && "bg-slate-500"
              } rounded-lg p-2`}
            >
              <p className="text-white font-bold lg:text-start md:text-start text-center">
                {["negotiation_to_client", "negotiation_to_worker"].includes(
                  data.status
                ) ? (
                  "NEGOSIASI"
                ) : (
                  <>
                    {data.status === "accepted"
                      ? "DITERIMA"
                      : data.status === "rejected"
                      ? "DITOLAK"
                      : data.status === "finished"
                      ? "SELESAI"
                      : data.status}
                  </>
                )}
              </p>
            </div>
            <img
              src={rightArrow}
              alt=""
              className="w-9 mx-auto lg:block md:block hidden"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobsCard;
