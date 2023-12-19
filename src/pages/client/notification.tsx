import Layout from "@/components/layout";
import NotificationCard from "@/components/notification-card";
import { NotificationData } from "@/utils/mockdata/data";

const Notification = () => {
  return (
    <Layout>
      <div className="container p-6 flex flex-col gap-3 min-h-screen">
        {NotificationData.map((item) => {
          return (<NotificationCard description={item.description} />)
        })}
        
      </div>
    </Layout>
  );
};

export default Notification;
