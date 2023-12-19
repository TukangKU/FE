import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const head = (props: Readonly<Props>) => {
  const { children } = props;
  return (
    <div className="flex flex-col grow bg-tukangku h-16 my-2 mx-2 rounded-sm justify-center items-center">
      {children}
    </div>
  );
};

export default head;
