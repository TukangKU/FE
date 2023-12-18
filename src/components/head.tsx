import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const head = (props: Readonly<Props>) => {
  const { children } = props;
  return (
    <div className="flex items-center bg-tukangku h-16 my-2 mx-2 rounded-sm">
      <div className="flex items-center pl-2">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className="flex-grow text-center">{children}</div>
    </div>
    )
}
export default head;
