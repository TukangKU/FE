import CardWorker from "@/components/card-worker";
import Head from "@/components/head";
import { useLocation, useNavigate } from "react-router-dom";
import { WorkerAvailables } from "@/utils/apis/client/types";
import { getWorkerByID } from "@/utils/apis/client/api";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/footer";

const AvailableData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const serviceData: WorkerAvailables[] | undefined =
    location.state?.serviceData?.data;

  const serviceId = location.state.serviceId;

  const handleSeeWorkerDetail = async (id: number) => {
    try {
      const WorkerDetail = await getWorkerByID(id);
      toast({
        description: WorkerDetail.message,
      });
      console.log(`response data by ID = ${id}`, WorkerDetail);
      navigate("/client/detail-worker", { state: { WorkerDetail, serviceId } });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>Available Worker</Head>
      <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 xl:grid-cols-3  justify-items-center ">
        {serviceData &&
          serviceData.map((item, index) => (
            <CardWorker
              key={index}
              data={item}
              onClick={() => handleSeeWorkerDetail(item.id)}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default AvailableData;
