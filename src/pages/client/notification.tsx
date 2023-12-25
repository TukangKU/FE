/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/layout";
import NotificationCard from "@/components/notification-card";
import { getNotification } from "@/utils/apis/client";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Notification = () => {
  // const [notif, setNotif] = useState("");

  // useEffect(() => {
  //   fetchNotif();
  // }, []);

  // async function fetchNotif() {
  //   try {
  //     const result = await getNotification();
  //     setNotif(result.message);
  //   } catch (error: any) {
  //     toast({
  //       title: "Oops! Something went wrong.",
  //       description: error.toString(),
  //       variant: "destructive",
  //     });
  //   }

    return (
      <Layout>
        <div className="container p-6 flex flex-col gap-3 min-h-screen">
         <NotificationCard description='tesss' />;
        </div>
      </Layout>
    );
  }


export default Notification;
