import CardWorker, { WorkerAvailables } from '@/components/card-worker';
import Head from '@/components/head';
import { useLocation } from 'react-router-dom';

const AvailableData = () => {
  const handleSeeDetail = () => {
    // Fungsi untuk menangani tindakan lihat detail, sesuaikan dengan kebutuhan Anda
    // ...
  };

  const location = useLocation();
  const serviceData: WorkerAvailables[] | undefined = location.state?.serviceData?.data;

  return (
    <div className="">
    <Head>  
        Available Worker
    </Head>
    <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 xl:grid-cols-3  justify-items-center ">
      {serviceData &&
        serviceData.map((item, index) => (
          <CardWorker key={index} data={item} handleSeeDetail={handleSeeDetail} />
        ))}
        </div>
    </div>
  );
};

export default AvailableData;
