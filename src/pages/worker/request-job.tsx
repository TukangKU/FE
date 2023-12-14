import Layout from "@/components/layout";
import React from "react";

const RequestJob = () => {
  return (
    <Layout>
      <div className="flex mx-auto bg-slate-100 p-4 w-[50rem] justify-between rounded-lg hover:bg-slate-200 items-center">
        <div className="flex items-center gap-3">
          <img src="/src/assets/worker/user (3).png" alt="" className="w-20" />
          <div>
            <p className="font-semibold text-lg">Sri wulandari</p>
            <p>9/12/23 - 12/12/23</p>
          </div>
        </div>
        <div>
          <img src="/src/assets/worker/right-arrow (2).png" alt="" className="w-16" />
        </div>
      </div>
    </Layout>
  );
};

export default RequestJob;
