import CardWorker from '@/components/card-worker';
import Head from '@/components/head';
import { useLocation, useNavigate } from 'react-router-dom';
import { WorkerAvailables } from '@/utils/apis/client/types';
import { getWorkerByID } from "@/utils/apis/client/api";

const AvailableData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceData: WorkerAvailables[] | undefined = location.state?.serviceData?.data;
  const handleSeeWorkerDetail = async (id: number) => {
    try {
      const WorkerDetail = await getWorkerByID(id);
      console.log(`response data by ID = ${id}`,WorkerDetail)
     navigate('/client/detail-worker', { state: { WorkerDetail } });
    } catch (error: any) {
      console.error(
        `Error fetching data for service ${id}:`,
        error.response.data.message
      );
    }
  };
  return (
    <div className="">
    <Head>  
        Available Worker
    </Head>
    <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 xl:grid-cols-3  justify-items-center ">
      {serviceData &&
        serviceData.map((item, index) => (
          <CardWorker key={index} data={item} onClick={() => handleSeeWorkerDetail(item.id)} />
        ))}
        </div>
    </div>
  );
};

export default AvailableData;
