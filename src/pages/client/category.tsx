import { CategoryCard } from "@/components/category-card";
import Layout from "@/components/layout";
import { Service } from "@/utils/mockdata/data";

const Category = () => {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="container p-6 flex flex-row flex-wrap w-full gap-10 ">
          {Service.map((item) => {
            return (
              <CategoryCard
                image={item.image}
                title={item.name}
                detail={item.description}
              />
            );
          })}
          <div className="hidden md:block md:w-[49%] lg:w-[32%]"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
