import Layout from "@/components/layout";

const History = () => {
  return (
    <Layout>
      <div className="lg:flex md:flex lg:justify-between md:justify-between items-center mx-auto bg-slate-100 p-4 lg:w-[50rem] md:w-[40rem] rounded-lg hover:bg-slate-200">
        <div className="lg:flex md:flex justify-center items-center gap-3">
          <img
            src="/src/assets/worker/user (3).png"
            alt=""
            className="lg:w-20 md:w-16 w-14 lg:mx-0 md:mx-0 mx-auto"
          />
          <div className="flex flex-col lg:gap-0 md:gap-0 gap-1 lg:mt-0 md:mt-0 mt-3">
            <p className="font-semibold lg:text-lg md:text-base text-sm lg:text-start md:text-start text-center">
              Sri wulandari
            </p>
            <p className="lg:text-lg md:text-base text-sm lg:text-start md:text-start text-center">
              Jl. setia budi
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:mt-0 md:mt-0 mt-3">
          <p className="font-semibold lg:text-lg md:text-base text-sm lg:text-start md:text-start text-center">
            9/12/23 - 12/12/23
          </p>
          <div className="flex items-center lg:ms-auto md:ms-auto lg:mt-0 md:mt-0 mt-3">
            <img src="/src/assets/worker/check.png" alt="" className="w-16 mx-auto" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
