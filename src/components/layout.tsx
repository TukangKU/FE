import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Props {
  children: ReactNode;
}

const Layout = (props: Readonly<Props>) => {
  const { children } = props;

  return (
    <div className="w-full h-screen bg-white font-poppins flex flex-col overflow-auto">
      <Navbar />
      <div className="flex flex-col grow">
        {children}
      </div>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Layout;
