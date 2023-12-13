import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  return (
    <div className="w-full h-screen bg-white overflow-auto flex flex-col">
      <Navbar />
      <div className="container grow mx-auto py-4 px-8 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
