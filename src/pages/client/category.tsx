/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryCard } from "@/components/category-card";
import Layout from "@/components/layout";
import { Service } from "@/utils/mockdata/data";
import { getDataByService } from "@/utils/apis/client/api";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const handleServiceClick = async (serviceId: number) => {
    try {
      const serviceData = await getDataByService(serviceId);
      navigate("/client/available-worker", {
        state: { serviceData, serviceId },
      });
    } catch (error: any) {
      console.error(
        `Error fetching data for service ${serviceId}:`,
        error.response.data.message
      );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex flex-col justify-center items-center p-6">
        <h1 className="font-bold text-xl md:text-2xl text-center">Pilih kategori dan dapatkan pekerja profesianal untuk membantu Anda!</h1>
        <p>Jaminan 100% pekerja kami terpercaya</p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 container w-full gap-4">
          {Service.map((item, index) => (
            <CategoryCard
              image={item.image}
              title={item.name}
              detail={item.description}
              onClick={() => handleServiceClick(index + 1)}
            />
          ))}
          <div className="hidden md:block md:w-[49%] lg:w-[32%]"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
