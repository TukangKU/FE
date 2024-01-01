/* eslint-disable react-hooks/rules-of-hooks */
import  { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  children: ReactNode;
}
const head = (props: Readonly<Props>) => {
  const { children } = props;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex items-center bg-tukangku h-16  mx-2 rounded-sm">
      <div className="flex items-center pl-2" onClick={goBack}>
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div className="flex-grow text-center">{children}</div>
    </div>
  );
};
export default head;
