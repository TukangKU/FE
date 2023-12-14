import Layout from "@/components/layout";

const History = () => {
  return (
    <Layout>
      <div className="flex mx-auto bg-slate-100 p-4 w-[50rem] justify-between rounded-lg hover:bg-slate-200">
        <div className="flex items-center gap-3">
          <img src="/src/assets/worker/user (3).png" alt="" className="w-20" />
          <div>
            <p className="font-semibold text-lg">Sri wulandari</p>
            <p>Jl. setia budi</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">9/12/23 - 12/12/23</p>
          <div className="flex items-center ms-auto">
            <img src="/src/assets/worker/check.png" alt="" className="w-16" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;
